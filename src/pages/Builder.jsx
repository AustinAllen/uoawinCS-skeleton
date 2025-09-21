import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sortIngredientsByGoal, applyDietaryFilters } from "../utils/ingredientScoring.js";

const CATEGORIES = ["Carb", "Protein", "Fat", "Fiber"];

const INGREDIENTS = [
  // --- Carbs (10) ---
  { id:"carb_rice",        name:"Rice",              category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_rice.png",        vegan:true, dairyFree:true, nutFree:true, p:4, f:0.4, c:45, fiber:0.6 },
  { id:"carb_pasta",       name:"Pasta",             category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_pasta.png",       vegan:false, dairyFree:true, nutFree:true,p:6, f:1.3, c:31, fiber:1.8 },
  { id:"carb_bread",       name:"Whole Wheat Bread", category:"Carb", serving:"2 slices",     image: "/src/img/carb_bread.png",       vegan:true, dairyFree:false, nutFree:true,p:8, f:2,   c:28, fiber:4 },
  { id:"carb_Quinoa",      name:"Quinoa",            category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_Quinoa.png",      vegan:true, dairyFree:true, nutFree:true,p:8, f:3.5, c:39, fiber:5 },
  { id:"carb_potato",      name:"Potato",            category:"Carb", serving:"1 medium",     image: "/src/img/carb_potato.png",      vegan:true, dairyFree:true, nutFree:true,p:3, f:0.2, c:26, fiber:2.2 },
  { id:"carb_oats",        name:"Oats",              category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_oats.png",        vegan:true, dairyFree:true, nutFree:true,p:6, f:3,   c:27, fiber:4 },
  { id:"carb_corn",        name:"Corn",              category:"Carb", serving:"1 cup",        image: "/src/img/carb_corn.png",        vegan:true, dairyFree:true, nutFree:true,p:5, f:2,   c:41, fiber:4.6 },
  { id:"carb_sweetpotato", name:"Sweet Potato",      category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_SweetPotato.png", vegan:true, dairyFree:true, nutFree:true,p:4, f:0.2, c:41, fiber:6 },
  { id:"carb_couscous",    name:"Couscous",          category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_couscous.png",    vegan:true, dairyFree:true, nutFree:true,p:6, f:0.3, c:36, fiber:2.2 },
  { id:"carb_barley",      name:"Barley",            category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_barley.png",      vegan:true, dairyFree:true, nutFree:true,p:4, f:0.4, c:44, fiber:6 },
  // --- Protein (10) ---
  { id:"pro_chicken-breast", name:"Chicken Breast", category:"Protein", serving:"100g cooked", image:"/src/img/pro_chicken-breast.png", vegan:false, dairyFree:true, nutFree:true,p:31, f:3.6, c:0, fiber:0 },
  { id:"pro_beef", name:"Beef", category:"Protein", serving:"100g cooked", image:"/src/img/pro_beef.png", vegan:false, dairyFree:true, nutFree:true,p:26, f:20, c:0, fiber:0 },
  { id:"pro_salmon", name:"Salmon", category:"Protein", serving:"100g cooked", image:"/src//img/pro_salmon.png", vegan:false, dairyFree:true, nutFree:true,p:20, f:13, c:0, fiber:0 },
  { id:"pro_tuna", name:"Tuna (water)", category:"Protein", serving:"100g", image:"/src/img/pro_tuna.png", vegan:false, dairyFree:true, nutFree:true, p:24, f:1, c:0, fiber:0 },
  { id:"pro_egg", name:"Egg", category:"Protein", serving:"1 large", image:"/src/img/pro_egg.png", vegan:false, dairyFree:true, nutFree:true, p:6, f:5, c:0.6, fiber:0 },
  { id:"pro_tofu", name:"Tofu", category:"Protein", serving:"100g", image:"/src/img/pro_tofu.png", vegan:true, dairyFree:true, nutFree:true, p:8, f:5, c:2, fiber:1 },
  { id:"pro_tempeh", name:"Tempeh", category:"Protein", serving:"100g", image:"/src/img/pro_tempeh.png", vegan:true, dairyFree:true, nutFree:true, p:19, f:11, c:9, fiber:5 },
  { id:"pro_shrimp", name:"Shrimp", category:"Protein", serving:"100g", image:"/src/img/pro_shrimp.png", vegan:false, dairyFree:true, nutFree:true, p:24, f:0.3, c:0, fiber:0 },
  { id:"pro_greek-yogurt", name:"Greek Yogurt", category:"Protein", serving:"1 cup", image:"/src/img/pro_greek-yogurt.png", vegan:false, dairyFree:false, nutFree:true, p:10, f:0.7, c:6, fiber:0 },
  { id:"pro_cottage-cheese", name:"Cottage Cheese", category:"Protein", serving:"1 cup", image:"/src/img/pro_cottage-cheese.png", vegan:false, dairyFree:false, nutFree:true, p:25, f:2.3, c:6, fiber:0 },

  // --- Fat (10) ---
  { id:"fat_oliveoil", name:"Olive Oil", category:"Fat", serving:"1 Tbsp", image:"/src/img/fat_oliveoil.png", vegan:false, dairyFree:true, nutFree:true, p:0, f:14, c:0, fiber:0 },
  { id:"fat_avocado", name:"Avocado", category:"Fat", serving:"1/2 medium", image:"/src/img/fat_avocado.png", vegan:false, dairyFree:true, nutFree:true, p:2, f:15, c:9, fiber:7 },
  { id:"fat_almonds", name:"Almonds", category:"Fat", serving:"28g", image:"/src/img/fat_almonds.png", vegan:false, dairyFree:true, nutFree:false, p:6, f:14, c:6, fiber:3.5 },
  { id:"fat_walnuts", name:"Walnuts", category:"Fat", serving:"28g", image:"/src/img/fat_walnuts.png", vegan:false, dairyFree:true, nutFree:false, p:4, f:18, c:4, fiber:2 },
  { id:"fat_peanutbutter", name:"Peanut Butter", category:"Fat", serving:"1 Tbsp", image:"/src/img/fat_peanutbutter.png", vegan:true, dairyFree:false, nutFree:true, p:4, f:8, c:3, fiber:1 },
  { id:"fat_cheese", name:"Cheddar Cheese", category:"Fat", serving:"28g", image:"/src/img/fat_cheese.png", vegan:false, dairyFree:false, nutFree:true, p:7, f:9, c:1, fiber:0 },
  { id:"fat_butter", name:"Butter", category:"Fat", serving:"1 Tbsp", image:"/src/img/fat_butter.png", vegan:false, dairyFree:false, nutFree:true, p:0, f:11, c:0, fiber:0 },
  { id:"fat_chocolate", name:"Dark Chocolate", category:"Fat", serving:"30g", image:"/src/img/fat_chocolate.png", vegan:false, dairyFree:false, nutFree:true, p:2, f:12, c:13, fiber:3 },
  { id:"fat_coconut", name:"Coconut Meat", category:"Fat", serving:"1 cup", image:"/src/img/fat_coconut.png", vegan:true, dairyFree:true, nutFree:true, p:3, f:27, c:12, fiber:7 },
  { id:"fat_flaxseed", name:"Flax Seeds", category:"Fat", serving:"2 Tbsp", image:"/src/img/fat_flaxseed.png", vegan:true, dairyFree:true, nutFree:true, p:4, f:8, c:4, fiber:4 },

  // --- Fiber (10) ---
  { id:"fib_broccoli", name:"Broccoli", category:"Fiber", serving:"1 cup cooked", image:"/src/img/fib_broccoli.png", vegan:true, dairyFree:true, nutFree:true, p:3.7, f:0.6, c:11, fiber:5.1 },
  { id:"fib_spinach", name:"Spinach", category:"Fiber", serving:"1 cup cooked", image:"/src/img/fib_spinach.png", vegan:true, dairyFree:true, nutFree:true, p:5, f:0.5, c:7, fiber:4.3 },
  { id:"fib_lentils", name:"Lentils", category:"Fiber", serving:"1/2 cup cooked", image:"/src/img/fib_lentils.png", vegan:true, dairyFree:true, nutFree:true, p:9, f:0.4, c:20, fiber:8 },
  { id:"fib_chickpeas", name:"Chickpeas", category:"Fiber", serving:"1/2 cup cooked", image:"/src/img/fib_chickpeas.png", vegan:true, dairyFree:true, nutFree:true, p:7, f:2, c:20, fiber:6 },
  { id:"fib_blackbeans", name:"Black Beans", category:"Fiber", serving:"1/2 cup cooked", image:"/src/img/fib_blackbeans.png", vegan:true, dairyFree:true, nutFree:true, p:7, f:0.5, c:20, fiber:8 },
  { id:"fib_peas", name:"Green Peas", category:"Fiber", serving:"1/2 cup", image:"/src/img/fib_peas.png", vegan:true, dairyFree:true, nutFree:true, p:4, f:0.3, c:10, fiber:3.5 },
  { id:"fib_apple", name:"Apple", category:"Fiber", serving:"1 medium", image:"/src/img/fib_apple.png", vegan:true, dairyFree:true, nutFree:true, p:0.5, f:0.3, c:25, fiber:4.4 },
  { id:"fib_pear", name:"Pear", category:"Fiber", serving:"1 medium", image:"/src/img/fib_pear.png", vegan:true, dairyFree:true, nutFree:true, p:1, f:0.2, c:27, fiber:5.5 },
  { id:"fib_carrot", name:"Carrot", category:"Fiber", serving:"1 cup raw", image:"/src/img/fib_carrot.png", vegan:true, dairyFree:true, nutFree:true, p:1, f:0.2, c:12, fiber:3.6 },
  { id:"fib_cabbage", name:"Cabbage", category:"Fiber", serving:"1 cup cooked", image:"/src/img/fib_cabbage.png", vegan:true, dairyFree:true, nutFree:true, p:2, f:0.1, c:8, fiber:4 },
];





export default function Builder() {
  const location = useLocation();
  const [tab, setTab] = useState("Carb");
  
  // 개인 정보 불러오기
  const [heightCm, setHeightCm] = useState(null);
  const [weightKg, setWeightKg] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("health_profile_v1");
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.heightCm) setHeightCm(Number(saved.heightCm));
      if (saved.weightKg) setWeightKg(Number(saved.weightKg));
    } catch (e) {
      // ignore
    }
  }, []);

  // Get data from navigation (includes Profile data)
  const dailyGoal = location.state?.dailyGoal || 'Balanced';
  const longTermGoal = location.state?.longTermGoal || 'Focus/Energy';
  const dietaryFilters = location.state?.dietaryFilters || {};
  const userDiet = location.state?.userDiet || "";

  // 개인화된 목표 계산 함수
  function getPersonalTargets(heightCm, weightKg) {
    // 기본값
    let kcalMin = 450, kcalMax = 750, p = 30, f = 25, c = 70;
    if (heightCm && weightKg) {
      // 단순 비례식 (예시)
      const bmi = weightKg / Math.pow(heightCm / 100, 2);
      // 기초대사량 추정 (Mifflin-St Jeor 공식, 남성 기준)
      const bmr = 10 * weightKg + 6.25 * heightCm - 5 * 25 + 5; // 25세 기준
      kcalMin = Math.round(bmr * 1.1 * 0.7); // 활동량/목표에 따라 조정
      kcalMax = Math.round(bmr * 1.1 * 1.1);
      // 단백질, 탄수, 지방도 체중에 따라 증가
      p = Math.round(1.2 * weightKg); // 1.2g/kg
      f = Math.round(0.8 * weightKg); // 0.8g/kg
      c = Math.round((kcalMax * 0.5) / 4); // 50% 탄수화물
    }
    return { kcal: { min: kcalMin, max: kcalMax }, p, f, c };
  }

  // 개인화된 목표값 사용
  const TARGETS = useMemo(() => getPersonalTargets(heightCm, weightKg), [heightCm, weightKg]);
  
  const kcalOf = (p, f, c) => Math.round(p * 4 + c * 4 + f * 9);

  const [cart, setCart] = useState({});

  const baseCount = useMemo(
    () => Object.values(cart).filter(({ item }) => item.category === "Carb").length,
    [cart]
  );

  const filtered = useMemo(() => {
    // Apply dietary filters from Profile first
    let filteredIngredients = applyDietaryFilters(INGREDIENTS, dietaryFilters);
    
    // Then filter by category
    filteredIngredients = filteredIngredients.filter(i => i.category === tab);
    
    // Finally sort by daily goal
    return sortIngredientsByGoal(filteredIngredients, dailyGoal);
  }, [tab, dietaryFilters, dailyGoal]);

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
        {/* Goal and Preference Display */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-600">Daily Goal:</span>
              <div className="text-lg font-bold text-blue-600">{dailyGoal}</div>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Long-term Goal:</span>
              <div className="text-lg font-bold text-green-600">{longTermGoal}</div>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Dietary Preference:</span>
              <div className="text-lg font-bold text-purple-600">{userDiet || "None"}</div>
            </div>
          </div>
        </div>

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
            
            {/* Active Dietary Preferences from Profile */}
            {dietaryFilters && Object.values(dietaryFilters).some(Boolean) && (
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <span className="text-sm text-gray-600">Dietary preferences:</span>
                {dietaryFilters.vegan && <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Vegan</span>}
                {dietaryFilters.dairyFree && <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Dairy-free</span>}
                {dietaryFilters.nutFree && <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">Nut-free</span>}
              </div>
            )}
            {/* List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((it) => (
                <li 
                  key={it.id} 
                  className="group relative flex items-center justify-between gap-3 border rounded-xl px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 grid place-items-center">
                      <img src={it.image} alt={it.name} className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-xs text-gray-500">{it.serving}</div>
                    </div>
                  </div>
                  
                  {/* Hover details */}
                  <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none">
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      <div><strong>Calories:</strong> {it.calories || Math.round(it.p * 4 + it.c * 4 + it.f * 9)}</div>
                      <div><strong>Protein:</strong> {it.p}g</div>
                      <div><strong>Carbs:</strong> {it.c}g</div>
                      <div><strong>Fat:</strong> {it.f}g</div>
                      {it.fiber > 0 && <div><strong>Fiber:</strong> {it.fiber}g</div>}
                      {it.goalScore && it.goalScore > 0.01 && <div><strong>Goal Score:</strong> {Math.round(it.goalScore * 100)}%</div>}
                    </div>
                    {/* Tags */}
                    {it.tags && it.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {it.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Dietary info */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {it.vegan && <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Vegan</span>}
                      {it.dairyFree && <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Dairy-free</span>}
                      {it.nutFree && <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">Nut-free</span>}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => add(it)}
                    disabled={it.category === "Carb" && baseCount >= 1}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 relative z-20"
                  >
                    + Add
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-xs text-gray-500 mt-3">
              Carb ingredients added: {baseCount}/1 | Showing ingredients optimized for {dailyGoal}
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
                          <img src={item.image} alt={item.name} className="w-6 h-6" />
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
                <div>Calories: <b>{totals.kcal}</b> kcal (target {TARGETS.kcal.min}~{TARGETS.kcal.max})</div>
                <div>Protein: <b>{totals.p}</b> g (target {TARGETS.p}g)</div>
                <div>Carbs:   <b>{totals.c}</b> g (target {TARGETS.c}g)</div>
                <div>Fat:     <b>{totals.f}</b> g (target {TARGETS.f}g)</div>
                {(!heightCm || !weightKg) && (
                  <div className="text-xs text-red-500 mt-1">Enter your height and weight in Profile to get personalized targets.</div>
                )}
              </div>
            </div>

            {/* <p className="text-center text-xs text-gray-600 mt-2">
              Example message: "{totals.p >= 30 ? "Perfect for muscle growth!" : "Add more protein for muscle goals."}"
            </p> */}
          </section>
        </div>
      </div>
    </div>
  );
}
