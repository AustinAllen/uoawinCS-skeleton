import React, { useEffect, useMemo, useState } from "react";

// --- Provided constants ---
const MEAL_CATEGORIES = [
  { key: "focus", label: "Focus", color: "#60a5fa" }, // blue-400
  { key: "high-protein", label: "High‑protein", color: "#34d399" }, // emerald-400
  { key: "weight-friendly", label: "Weight‑friendly", color: "#94a3b8" }, // slate-400
];

function classNames() {
  return Array.from(arguments).filter(Boolean).join(" ");
}

// --- New: diet options and storage key ---
const DIET_OPTIONS = [
  { key: "", label: "None" },
  { key: "vegan", label: "Vegan" },
  { key: "dairy-free", label: "Dairy‑free" },
  { key: "nut-free", label: "Nut‑free" },
];

const STORAGE_KEY = "health_profile_v1";

// ---------------- DonutChart (unchanged) ----------------
function DonutChart({ data, size = 220, strokeWidth = 28 }) {
  const total = data.reduce((acc, d) => acc + d.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;

  let cumulative = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img">
      <g transform={`rotate(-90 ${cx} ${cy})`}>
        {data.map((d, i) => {
          const frac = d.value / total;
          const dash = frac * circumference;
          const gap = circumference - dash;
          const offset = -cumulative * circumference;
          cumulative += frac;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          );
        })}
      </g>
      <circle cx={cx} cy={cy} r={r - strokeWidth / 2} fill="white" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" className="fill-slate-700 text-sm">
        {total} days
      </text>
    </svg>
  );
}

// ---------------- ProfilePage (enhanced) ----------------
export default function ProfilePage() {
  // Avatar
  const [avatarUrl, setAvatarUrl] = useState("");

  // Cooking preferences modal
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [goal, setGoal] = useState("focus");

  // NEW: diet preference ("", "vegan", "dairy-free", "nut-free")
  const [diet, setDiet] = useState("");

  // Calendar state
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [records, setRecords] = useState({}); // { 'YYYY-MM-DD': 'focus' | ... }

  // --- Load from localStorage on mount ---
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.avatarUrl) setAvatarUrl(saved.avatarUrl);
      if (saved.heightCm) setHeightCm(String(saved.heightCm));
      if (saved.weightKg) setWeightKg(String(saved.weightKg));
      if (saved.goal) setGoal(saved.goal);
      if (typeof saved.diet === "string") setDiet(saved.diet);
      if (saved.records && typeof saved.records === "object") setRecords(saved.records);
    } catch (e) {
      console.warn("Failed to load profile:", e);
    }
  }, []);

  // --- Save to localStorage ---
  function saveChoices() {
    try {
      const payload = {
        avatarUrl,
        heightCm: heightCm ? Number(heightCm) : undefined,
        weightKg: weightKg ? Number(weightKg) : undefined,
        goal,
        diet,
        records,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      alert("Saved your profile, diet, and calendar.");
    } catch (e) {
      alert("Couldn't save. Check storage permissions.");
    }
  }

  const bmi = useMemo(() => {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (!h || !w) return "—";
    const m = h / 100;
    return (w / (m * m)).toFixed(1);
  }, [heightCm, weightKg]);

  const bmiBand = useMemo(() => {
    const v = parseFloat(bmi);
    if (!isFinite(v)) return "";
    if (v < 18.5) return "Underweight";
    if (v < 25) return "Healthy";
    if (v < 30) return "Overweight";
    return "Obese";
  }, [bmi]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const monthGrid = useMemo(() => {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const startDay = start.getDay();
    const daysInMonth = end.getDate();
    const cells = [];
    for (let i = 0; i < startDay; i++) {
      const d = new Date(year, month, -i);
      cells.unshift({ date: d, isOther: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(year, month, d), isOther: false });
    }
    while (cells.length < 42) {
      const last = cells[cells.length - 1]?.date || new Date(year, month, 1);
      const d = new Date(last);
      d.setDate(d.getDate() + 1);
      cells.push({ date: d, isOther: d.getMonth() !== month });
    }
    return cells;
  }, [year, month]);

  const yyyymmdd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  // Cycle a day through: none -> focus -> high-protein -> ... -> none
  const cycleDay = (date) => {
    const key = yyyymmdd(date);
    const current = records[key] || "";
    const order = ["", ...MEAL_CATEGORIES.map((c) => c.key)];
    const idx = order.indexOf(current);
    const next = order[(idx + 1) % order.length];
    setRecords((prev) => ({ ...prev, [key]: next }));
  };

  const byCategory = useMemo(() => {
    const tally = {};
    MEAL_CATEGORIES.forEach((c) => (tally[c.key] = 0));
    Object.values(records).forEach((v) => {
      if (v) tally[v] += 1;
    });
    return tally;
  }, [records]);

  const pieData = useMemo(() => {
    return MEAL_CATEGORIES.map((c) => ({ name: c.label, value: byCategory[c.key], color: c.color })).filter((s) => s.value > 0);
  }, [byCategory]);

  const mostFrequent = useMemo(() => {
    let maxKey = null,
      maxVal = -1;
    MEAL_CATEGORIES.forEach((c) => {
      const v = byCategory[c.key];
      if (v > maxVal) {
        maxVal = v;
        maxKey = c.key;
      }
    });
    return maxVal <= 0 ? null : maxKey;
  }, [byCategory]);

  // Recommendation (now diet-aware)
  const [rec, setRec] = useState(null);
  const buildRecommendation = () => {
    // Determine dominant category and apply diet constraints
    const dominant = mostFrequent || goal;
    let title = "Personalised Green Bowl";
    let ingredients = ["Mixed greens", "Tomato", "Cucumber", "Olive oil", "Lemon"];
    let macros = "Balanced";

    if (diet === "vegan") {
      title = "Vegan Chickpea & Avocado Garden Bowl";
      ingredients = ["Chickpeas", "Avocado", "Kale", "Capsicum", "Red onion", "Tahini", "Lemon"];
      macros = "Plant‑based protein & fiber rich";
    } else if (diet === "nut-free") {
      title = "Nut‑Free Sweet‑Potato & Feta Salad";
      ingredients = ["Roasted kumara", "Feta", "Spinach", "Cucumber", "Sunflower seeds", "Yoghurt dressing"];
      macros = "Calcium & complex carbs";
    } else if (diet === "dairy-free") {
      title = "Dairy‑Free Chicken & Quinoa Salad";
      ingredients = ["Chicken breast", "Quinoa", "Rocket", "Cherry tomato", "Avocado", "Olive oil", "Lemon"];
      macros = "High protein, dairy‑free";
    } else if (dominant === "high-protein") {
      title = "High‑Protein Chicken & Quinoa Salad";
      ingredients = ["Chicken breast", "Quinoa", "Rocket", "Cherry tomato", "Pumpkin seeds", "Olive oil", "Lemon"];
      macros = "~40% protein • 35% carbs • 25% fat";
    } else if (dominant === "weight-friendly") {
      title = "Weight‑Friendly Citrus Tuna Salad";
      ingredients = ["Canned tuna (spring water)", "Cos lettuce", "Citrus segments", "Cucumber", "Herbs", "Vinaigrette"];
      macros = "High satiety • lower kcal";
    } else if (dominant === "focus") {
      title = diet === "nut-free" ? "Focus Fuel Salmon Salad" : "Focus Fuel Salmon & Walnut Salad";
      ingredients = diet === "nut-free"
        ? ["Salmon", "Baby spinach", "Beetroot", "Blueberries", "Balsamic"]
        : ["Salmon", "Walnuts", "Baby spinach", "Beetroot", "Blueberries", "Balsamic"];
      macros = "Omega‑3 & polyphenols";
    }

    // Post-filter for diet bans
    if (diet === "nut-free") {
      ingredients = ingredients.filter((i) => !/walnut|almond|pecan|cashew|nut/i.test(i));
      if (!ingredients.some((i) => /seed/i.test(i))) ingredients.push("Sunflower seeds");
    }
    if (diet === "dairy-free") {
      ingredients = ingredients.filter((i) => !/feta|parmesan|yoghurt|yogurt|cheese|caesar/i.test(i));
      if (!ingredients.some((i) => /avocado/i.test(i))) ingredients.push("Avocado");
    }

    const reasons = [
      `Goal: ${(MEAL_CATEGORIES.find((g) => g.key === goal) || {}).label || goal || "—"}`,
      `Diet: ${(DIET_OPTIONS.find((d) => d.key === diet) || {}).label || "None"}`,
    ];
    if (bmiBand) reasons.push(`BMI range: ${bmiBand}`);
    if (mostFrequent) reasons.push(`Reflects recent picks: ${(MEAL_CATEGORIES.find((g) => g.key === mostFrequent) || {}).label}`);

    setRec({ title, subtitle: "Recommendation preview (demo)", rationale: reasons, macros, ingredients });
  };

  const onAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarUrl(String((ev.target || {}).result || ""));
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold leading-tight">Personal Health Profile</h1>
          <p className="text-xs text-gray-500">Avatar, preferences, calendar tracking & salad recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          {/* NEW: Global Save Button */}
          <button onClick={saveChoices} className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700">Save Choices</button>
          <div className="text-xs text-gray-500">Preview UI</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <section className="space-y-6 lg:col-span-1">
          {/* Avatar & Cooking Prefs */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-28 w-28 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-sm text-gray-400">No avatar</div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex gap-2 flex-wrap">
                  <label className="inline-flex">
                    <input type="file" accept="image/*" onChange={onAvatarChange} className="hidden" />
                    <button className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm">Upload Avatar</button>
                  </label>
                  <button onClick={() => setPrefsOpen(true)} className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700">Personal Details</button>
                </div>
                <div className="mt-3 text-xs text-gray-500">Goal options: Focus / High‑protein / Weight‑friendly. Use diet to set Vegan, Dairy‑free, or Nut‑free.</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold mb-2">Recommendations</div>
            <p className="text-sm text-gray-600 mb-4">Generate a salad suggestion using your goal, diet, and most frequent calendar choice.</p>
            <div className="flex items-center gap-2 mb-3">
              {/* NEW: Diet quick select (outside modal too) */}
              <select className="rounded-xl border p-2 text-sm" value={diet} onChange={(e) => setDiet(e.target.value)}>
                {DIET_OPTIONS.map((d) => (
                  <option key={d.key} value={d.key}>{d.label}</option>
                ))}
              </select>
              <button onClick={buildRecommendation} className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700">Generate Recommendation</button>
            </div>

            {rec ? (
              <div className="mt-2 rounded-2xl border p-4">
                <div className="text-sm text-gray-500">{rec.subtitle}</div>
                <div className="text-base font-semibold leading-tight">{rec.title}</div>
                <div className="mt-2 text-xs text-gray-600">Macros: {rec.macros}</div>
                <div className="mt-2">
                  <div className="text-xs font-medium">Rationale</div>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {rec.rationale.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <div className="text-xs font-medium">Core ingredients</div>
                  <div className="text-sm text-gray-700">{rec.ingredients.join(", ")}</div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No recommendation yet. Click the button above.</div>
            )}
          </div>
        </section>

        {/* Right column */}
        <section className="space-y-6 lg:col-span-2">
          {/* Calendar */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">Meal Calendar</div>
              <div className="flex items-center gap-2 text-sm">
                <button className="px-3 py-1.5 rounded-xl border hover:bg-gray-50" onClick={() => setCursor(new Date(year, month - 1, 1))}>Prev</button>
                <div className="w-40 text-center text-sm text-gray-700">{cursor.toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
                <button className="px-3 py-1.5 rounded-xl border hover:bg-gray-50" onClick={() => setCursor(new Date(year, month + 1, 1))}>Next</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-xs font-medium text-gray-500 mb-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {monthGrid.map(({ date, isOther }, idx) => {
                const key = yyyymmdd(date);
                const val = records[key];
                const color = (MEAL_CATEGORIES.find((c) => c.key === val) || {}).color;
                return (
                  <button
                    key={key + idx}
                    onClick={() => cycleDay(date)}
                    className={classNames(
                      "h-20 border rounded-xl p-2 flex flex-col justify-between transition hover:shadow-sm text-left",
                      isOther && "opacity-30",
                      val && "ring-2 ring-offset-1",
                    )}
                    style={{ borderColor: color || "#e5e7eb", boxShadow: val ? `inset 0 0 0 9999px ${color}1a` : undefined }}
                    title="Click to cycle category"
                  >
                    <div className="text-xs text-gray-500">{date.getDate()}</div>
                    <div className="text-xs font-medium" style={{ color: color || "#111827" }}>
                      {val ? (MEAL_CATEGORIES.find((c) => c.key === val) || {}).label : "Set"}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {MEAL_CATEGORIES.map((c) => (
                <span key={c.key} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 bg-white shadow-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }}></span>
                  {c.label}
                </span>
              ))}
              <span className="text-gray-500">Tip: click a date to cycle through categories.</span>
            </div>
          </div>

          {/* Pie / summary */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold mb-3">Your Month at a Glance</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 flex justify-center">
                <DonutChart data={pieData} />
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="text-xs text-gray-500">Recorded days by category</div>
                {MEAL_CATEGORIES.map((c) => (
                  <div key={c.key} className="flex items-center justify-between border rounded-lg px-3 py-2 bg-white">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }}></span>
                      {c.label}
                    </span>
                    <span className="font-semibold">{byCategory[c.key]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold mb-2">Notes</div>
            <textarea className="w-full rounded-xl border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Add training days, travel weeks, or special dietary events…" rows={3}></textarea>
            <div className="mt-2 text-xs text-gray-500">Future: sync with WHOOP/Apple Health to auto‑suggest categories.</div>
          </div>
        </section>
      </main>

      {/* Personal Details Modal */}
      {prefsOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setPrefsOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b">
              <div className="text-base font-semibold">Personal Details & Preferences</div>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="text-sm">
                <div className="text-gray-700 mb-1">Height (cm)</div>
                <input className="w-full rounded-xl border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., 170" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
              </label>
              <label className="text-sm">
                <div className="text-gray-700 mb-1">Weight (kg)</div>
                <input className="w-full rounded-xl border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., 65" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
              </label>
              <label className="text-sm md:col-span-2">
                <div className="text-gray-700 mb-1">Goal</div>
                <select className="w-full rounded-xl border p-2 text-sm" value={goal} onChange={(e) => setGoal(e.target.value)}>
                  {MEAL_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              {/* NEW: Diet select inside modal */}
              <label className="text-sm md:col-span-2">
                <div className="text-gray-700 mb-1">Diet preference</div>
                <select className="w-full rounded-xl border p-2 text-sm" value={diet} onChange={(e) => setDiet(e.target.value)}>
                  {DIET_OPTIONS.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.label}
                    </option>
                  ))}
                </select>
                <div className="mt-1 text-xs text-gray-500">Vegan removes animal products; Dairy‑free bans cheese/yoghurt; Nut‑free bans all nuts (we substitute seeds).</div>
              </label>
              <div className="md:col-span-2 p-3 rounded-xl bg-gray-50 border text-sm">
                BMI: <span className="font-semibold">{bmi}</span> {bmiBand && <span className="text-gray-500">({bmiBand})</span>}
              </div>
              <div className="md:col-span-2 text-xs text-gray-500">Your selections guide recommendations and the calendar pie chart.</div>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button onClick={() => setPrefsOpen(false)} className="px-3 py-2 rounded-xl border hover:bg-gray-50 text-sm">Close</button>
              {/* NEW: Save button in modal */}
              <button onClick={() => { saveChoices(); setPrefsOpen(false); }} className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700">Save Choices</button>
            </div>
          </div>
        </div>
      )}

      <footer className="max-w-6xl mx-auto p-6 text-xs text-gray-500">
        <div className="flex flex-wrap items-center gap-2">
          <span>© 2025 Health WinSC Project</span>
          <span>•</span>
          <a href="#" className="underline">Privacy</a>
          <span>•</span>
          <a href="#" className="underline">Terms</a>
        </div>
      </footer>
    </div>
  );
}
