import { useState, useMemo } from "react";

const CATEGORIES = ["Base", "Produce", "Protein", "Toppings", "Dressing"];

const INGREDIENTS = [
  // Base
  { id:"base_rice", name:"Rice", category:"Base", serving:"1 cup cooked", unit:"cup", image:"/img/rice.png", p:4, f:0.4, c:45, fiber:0.6 },
  { id:"base_noodles", name:"Noodles", category:"Base", serving:"1 cup cooked", unit:"cup", image:"/img/noodles.png", p:7, f:2, c:40, fiber:2 },
  { id:"base_potatoes", name:"Potatoes", category:"Base", serving:"1 medium (150g)", image:"/img/potato.png", p:3, f:0.2, c:26, fiber:2.2 },
  { id:"base_couscous", name:"Couscous", category:"Base", serving:"1 cup cooked", image:"/img/couscous.png", p:6, f:0.3, c:36, fiber:2.2 },
  { id:"base_lentils", name:"Lentils", category:"Base", serving:"1/2 cup cooked", image:"/img/lentils.png", p:9, f:0.4, c:20, fiber:8 },
  { id:"base_beans", name:"Beans", category:"Base", serving:"1/2 cup cooked", image:"/img/beans.png", p:7, f:0.5, c:20, fiber:7 },
  { id:"base_vermicelli", name:"Vermicelli", category:"Base", serving:"1 cup cooked", image:"/img/vermicelli.png", p:4, f:1, c:42, fiber:1.5 },
  { id:"base_pasta", name:"Pasta", category:"Base", serving:"1 cup cooked", image:"/img/pasta.png", p:6, f:1.3, c:31, fiber:1.8 },
  { id:"base_bulgur", name:"Bulgur Wheat", category:"Base", serving:"1 cup cooked", image:"/img/bulgur.png", p:6, f:0.4, c:33, fiber:8.2 },
  { id:"base_chickpeas", name:"Chickpeas", category:"Base", serving:"1/2 cup cooked", image:"/img/chickpeas.png", p:7, f:2, c:20, fiber:6 },
  { id:"base_barley", name:"Pearl Barley", category:"Base", serving:"1 cup cooked", image:"/img/barley.png", p:4, f:0.4, c:44, fiber:6 },
  { id:"base_quinoa", name:"Quinoa", category:"Base", serving:"1 cup cooked", image:"/img/quinoa.png", p:8, f:3.5, c:39, fiber:5 },

  // Produce
  { id:"prod_broccoli", name:"Broccoli", category:"Produce", serving:"1 cup cooked", image:"/img/broccoli.png", p:3.7, f:0.6, c:11, fiber:5.1 },
  { id:"prod_spinach", name:"Spinach", category:"Produce", serving:"1 cup cooked", image:"/img/spinach.png", p:5, f:0.5, c:7, fiber:4.3 },
  { id:"prod_corn", name:"Corn", category:"Produce", serving:"1 cup", image:"/img/corn.png", p:5, f:2, c:41, fiber:4.6 },
  { id:"prod_apple", name:"Apple", category:"Produce", serving:"1 medium", image:"/img/apple.png", p:0.5, f:0.3, c:25, fiber:4.4 },

  // Protein
  { id:"pro_chicken", name:"Chicken Breast", category:"Protein", serving:"100g cooked", image:"/img/chicken.png", p:31, f:3.6, c:0, fiber:0 },
  { id:"pro_salmon", name:"Salmon", category:"Protein", serving:"100g cooked", image:"/img/salmon.png", p:20, f:13, c:0, fiber:0 },
  { id:"pro_tofu", name:"Tofu (firm)", category:"Protein", serving:"100g", image:"/img/tofu.png", p:8, f:5, c:2, fiber:1 },
  { id:"pro_egg", name:"Egg", category:"Protein", serving:"1 large", image:"/img/egg.png", p:6, f:5, c:0.6, fiber:0 },
  { id:"pro_tuna", name:"Tuna (water)", category:"Protein", serving:"100g", image:"/img/tuna.png", p:24, f:1, c:0, fiber:0 },
  { id:"pro_tempeh", name:"Tempeh", category:"Protein", serving:"100g", image:"/img/tempeh.png", p:19, f:11, c:9, fiber:5 },

  // Toppings
  { id:"top_avocado", name:"Avocado", category:"Toppings", serving:"1/2 medium", image:"/img/avocado.png", p:2, f:15, c:9, fiber:7 },
  { id:"top_almonds", name:"Almonds", category:"Toppings", serving:"28g", image:"/img/almonds.png", p:6, f:14, c:6, fiber:3.5 },
  { id:"top_cherry", name:"Cherry Tomato", category:"Toppings", serving:"100g", image:"/img/tomato.png", p:0.9, f:0.2, c:3.9, fiber:1.2 },
  { id:"top_peas", name:"Green Peas", category:"Toppings", serving:"1/2 cup", image:"/img/peas.png", p:4, f:0.3, c:10, fiber:3.5 },

  // Dressing
  { id:"dress_olive", name:"Olive Oil", category:"Dressing", serving:"1 Tbsp", image:"/img/oliveoil.png", p:0, f:14, c:0, fiber:0 },
  { id:"dress_tahini", name:"Tahini", category:"Dressing", serving:"1 Tbsp", image:"/img/tahini.png", p:3, f:8, c:3, fiber:1.4 },
  { id:"dress_pb", name:"Peanut Butter", category:"Dressing", serving:"1 Tbsp", image:"/img/pb.png", p:4, f:8, c:3, fiber:1 },
];

const TARGETS = { kcal: { min: 450, max: 750 }, p: 30, f: 25, c: 70 };
const kcalOf = (p, f, c) => Math.round(p * 4 + c * 4 + f * 9);

export default function Builder() {
  const [tab, setTab] = useState("Base");
  const [cart, setCart] = useState({});

  const baseCount = useMemo(
    () => Object.values(cart).filter(({ item }) => item.category === "Base").length,
    [cart]
  );

  const filtered = useMemo(
    () => INGREDIENTS.filter((i) => i.category === tab),
    [tab]
  );

  const totals = useMemo(() => {
    let p = 0, f = 0, c = 0, fiber = 0;
    Object.values(cart).forEach(({ item, qty }) => {
      p += item.p * qty;
      f += item.f * qty;
      c += item.c * qty;
      fiber += item.fiber * qty;
    });
    const kcal = kcalOf(p, f, c);
    return { p: Math.round(p), f: Math.round(f), c: Math.round(c), fiber: Math.round(fiber), kcal };
  }, [cart]);

  const add = (item) => {
    if (item.category === "Base" && baseCount >= 1) return;
    setCart((prev) => {
      const cur = prev[item.id];
      return { ...prev, [item.id]: { item, qty: (cur?.qty ?? 0) + 1 } };
    });
  };

  const sub = (id) => {
    setCart((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      if (cur.qty <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: { ...cur, qty: cur.qty - 1 } };
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const kcalPos = (() => {
    const { min, max } = TARGETS.kcal;
    const clamped = Math.max(min, Math.min(totals.kcal, max));
    return ((clamped - min) / (max - min)) * 100;
  })();

  return (
    <div className="min-h-screen bg-[#F8EED6] text-gray-900 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Base / Produce / Protein / Toppings / Dressing
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: MENU */}
          <section className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-center font-semibold mb-4">MENU</h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setTab(c)}
                  className={`px-3 py-1.5 rounded-full border ${tab === c ? "bg-black text-white" : "bg-gray-50"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((it) => (
                <li key={it.id} className="flex items-center justify-between gap-3 border rounded-xl px-3 py-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 grid place-items-center">
                      <span className="text-xl">🍚</span>
                    </div>
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-xs text-gray-500">{it.serving}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => add(it)}
                    disabled={it.category === "Base" && baseCount >= 1}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
                  >
                    + Add
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-xs text-gray-500 mt-3">
              Base ingredients added: {baseCount}/1
            </div>
          </section>

          {/* RIGHT: CART + GAUGE + STATS */}
          <section className="bg-[#FAF2DE] rounded-2xl p-4 border-2 border-black">
            <h2 className="text-center font-semibold mb-2">CART 🛒</h2>

            <div className="h-56 overflow-auto border-2 border-black rounded-2xl p-3 bg-white mb-3">
              {Object.values(cart).length === 0 ? (
                <div className="h-full grid place-items-center text-gray-400">Empty</div>
              ) : (
                <ul className="space-y-2">
                  {Object.values(cart).map(({ item, qty }) => (
                    <li key={item.id} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 grid place-items-center">
                          <span>🥕</span>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-[11px] text-gray-500">{item.serving}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="px-2 py-1 bg-gray-100 rounded" onClick={() => sub(item.id)}>-</button>
                        <span className="w-6 text-center">{qty}</span>
                        <button className="px-2 py-1 bg-gray-100 rounded" onClick={() => add(item)}>+</button>
                        <button className="ml-2 px-2 py-1 text-xs bg-red-100 rounded" onClick={() => removeItem(item.id)}>Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-2">
              <div className="w-full h-4 rounded-full overflow-hidden flex">
                <div className="flex-1 bg-red-400"></div>
                <div className="flex-1 bg-orange-300"></div>
                <div className="flex-1 bg-green-400"></div>
              </div>
              <div className="relative h-8">
                <div className="absolute -top-1" style={{ left: `calc(${kcalPos}% - 10px)` }}>
                  <span className="text-2xl">🥕</span>
                </div>
                <div className="absolute right-0 top-2 text-xs text-gray-600">Target Range</div>
              </div>
            </div>

            <div className="grid grid-cols-[60px_1fr] gap-x-3 mt-2">
              <div className="text-4xl">🧮</div>
              <div className="text-sm leading-7">
                <div>Calories: <b>{totals.kcal}</b> kcal</div>
                <div>Protein: <b>{totals.p}</b> g (target {TARGETS.p}g)</div>
                <div>Carbs:   <b>{totals.c}</b> g (target {TARGETS.c}g)</div>
                <div>Fat:     <b>{totals.f}</b> g (target {TARGETS.f}g)</div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-600 mt-2">
              Example message: "{totals.p >= 30 ? "Perfect for muscle growth!" : "Add more protein for muscle goals."}"
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
