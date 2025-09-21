// Enhanced ingredients data with additional properties for smart sorting
// This replaces the original INGREDIENTS array in Builder.jsx

export const ENHANCED_INGREDIENTS = [
  // --- Carbs (10) ---
  { 
    id:"carb_rice", name:"Rice", category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_rice.png",
    p:4, f:0.4, c:45, fiber:0.6,
    // Enhanced properties
    calories_kcal: 205, water_pct: 68, prep_time_min: 18, cost_nzd: 0.50, gi: 73,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"carb_pasta", name:"Pasta", category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_pasta.png",
    p:6, f:1.3, c:31, fiber:1.8,
    calories_kcal: 158, water_pct: 62, prep_time_min: 12, cost_nzd: 0.60, gi: 55,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"carb_bread", name:"Whole Wheat Bread", category:"Carb", serving:"2 slices", image: "/src/img/carb_bread.png",
    p:8, f:2, c:28, fiber:4,
    calories_kcal: 160, water_pct: 36, prep_time_min: 0, cost_nzd: 0.80, gi: 51,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"carb_Quinoa", name:"Quinoa", category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_Quinoa.png",
    p:8, f:3.5, c:39, fiber:5,
    calories_kcal: 222, water_pct: 72, prep_time_min: 15, cost_nzd: 1.20, gi: 53,
    omega3_score: 0.1, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"carb_potato", name:"Potato", category:"Carb", serving:"1 medium", image: "/src/img/carb_potato.png",
    p:3, f:0.2, c:26, fiber:2.2,
    calories_kcal: 118, water_pct: 77, prep_time_min: 25, cost_nzd: 0.40, gi: 78,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"carb_oats", name:"Oats", category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_oats.png",
    p:6, f:3, c:27, fiber:4,
    calories_kcal: 166, water_pct: 84, prep_time_min: 5, cost_nzd: 0.35, gi: 55,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"carb_corn", name:"Corn", category:"Carb", serving:"1 cup", image: "/src/img/carb_corn.png",
    p:5, f:2, c:41, fiber:4.6,
    calories_kcal: 177, water_pct: 76, prep_time_min: 8, cost_nzd: 0.70, gi: 60,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"carb_sweetpotato", name:"Sweet Potato", category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_SweetPotato.png",
    p:4, f:0.2, c:41, fiber:6,
    calories_kcal: 180, water_pct: 75, prep_time_min: 30, cost_nzd: 0.60, gi: 70,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"carb_couscous", name:"Couscous", category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_couscous.png",
    p:6, f:0.3, c:36, fiber:2.2,
    calories_kcal: 176, water_pct: 73, prep_time_min: 5, cost_nzd: 0.90, gi: 65,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"carb_barley", name:"Barley", category:"Carb", serving:"1 cup cooked", image: "/src/img/carb_barley.png",
    p:4, f:0.4, c:44, fiber:6,
    calories_kcal: 193, water_pct: 69, prep_time_min: 45, cost_nzd: 0.45, gi: 35,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },

  // --- Protein (10) ---
  { 
    id:"pro_chicken-breast", name:"Chicken Breast", category:"Protein", serving:"100g cooked", image:"/src/img/pro_chicken-breast.png",
    p:31, f:3.6, c:0, fiber:0,
    calories_kcal: 165, water_pct: 65, prep_time_min: 15, cost_nzd: 2.50, gi: 0,
    omega3_score: 0.1, animal_product: true, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"pro_beef", name:"Beef", category:"Protein", serving:"100g cooked", image:"/src/img/pro_beef.png",
    p:26, f:20, c:0, fiber:0,
    calories_kcal: 288, water_pct: 56, prep_time_min: 12, cost_nzd: 4.00, gi: 0,
    omega3_score: 0.1, animal_product: true, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"pro_salmon", name:"Salmon", category:"Protein", serving:"100g cooked", image:"/src/img/pro_salmon.png",
    p:20, f:13, c:0, fiber:0,
    calories_kcal: 206, water_pct: 59, prep_time_min: 10, cost_nzd: 5.50, gi: 0,
    omega3_score: 0.9, animal_product: true, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"pro_tuna", name:"Tuna (water)", category:"Protein", serving:"100g", image:"/src/img/pro_tuna.png",
    p:24, f:1, c:0, fiber:0,
    calories_kcal: 103, water_pct: 74, prep_time_min: 0, cost_nzd: 1.80, gi: 0,
    omega3_score: 0.6, animal_product: true, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"pro_egg", name:"Egg", category:"Protein", serving:"1 large", image:"/src/img/pro_egg.png",
    p:6, f:5, c:0.6, fiber:0,
    calories_kcal: 68, water_pct: 76, prep_time_min: 3, cost_nzd: 0.30, gi: 0,
    omega3_score: 0.2, animal_product: true, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"pro_tofu", name:"Tofu", category:"Protein", serving:"100g", image:"/src/img/pro_tofu.png",
    p:8, f:5, c:2, fiber:1,
    calories_kcal: 76, water_pct: 84, prep_time_min: 5, cost_nzd: 1.20, gi: 15,
    omega3_score: 0.1, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"pro_tempeh", name:"Tempeh", category:"Protein", serving:"100g", image:"/src/img/pro_tempeh.png",
    p:19, f:11, c:9, fiber:5,
    calories_kcal: 193, water_pct: 60, prep_time_min: 8, cost_nzd: 2.00, gi: 15,
    omega3_score: 0.1, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"pro_shrimp", name:"Shrimp", category:"Protein", serving:"100g", image:"/src/img/pro_shrimp.png",
    p:24, f:0.3, c:0, fiber:0,
    calories_kcal: 99, water_pct: 77, prep_time_min: 5, cost_nzd: 3.50, gi: 0,
    omega3_score: 0.3, animal_product: true, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"pro_greek-yogurt", name:"Greek Yogurt", category:"Protein", serving:"1 cup", image:"/src/img/pro_greek-yogurt.png",
    p:10, f:0.7, c:6, fiber:0,
    calories_kcal: 59, water_pct: 85, prep_time_min: 0, cost_nzd: 1.50, gi: 11,
    omega3_score: 0, animal_product: true, contains_nuts: false, contains_dairy: true
  },
  { 
    id:"pro_cottage-cheese", name:"Cottage Cheese", category:"Protein", serving:"1 cup", image:"/src/img/pro_cottage-cheese.png",
    p:25, f:2.3, c:6, fiber:0,
    calories_kcal: 163, water_pct: 79, prep_time_min: 0, cost_nzd: 1.80, gi: 10,
    omega3_score: 0, animal_product: true, contains_nuts: false, contains_dairy: true
  },

  // --- Fat (10) ---
  { 
    id:"fat_oliveoil", name:"Olive Oil", category:"Fat", serving:"1 Tbsp", image:"/src/img/fat_oliveoil.png",
    p:0, f:14, c:0, fiber:0,
    calories_kcal: 119, water_pct: 0, prep_time_min: 0, cost_nzd: 0.25, gi: 0,
    omega3_score: 0.1, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fat_avocado", name:"Avocado", category:"Fat", serving:"1/2 medium", image:"/src/img/fat_avocado.png",
    p:2, f:15, c:9, fiber:7,
    calories_kcal: 160, water_pct: 73, prep_time_min: 2, cost_nzd: 1.25, gi: 10,
    omega3_score: 0.1, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fat_almonds", name:"Almonds", category:"Fat", serving:"28g", image:"/src/img/fat_almonds.png",
    p:6, f:14, c:6, fiber:3.5,
    calories_kcal: 164, water_pct: 5, prep_time_min: 0, cost_nzd: 0.80, gi: 0,
    omega3_score: 0, animal_product: false, contains_nuts: true, contains_dairy: false
  },
  { 
    id:"fat_walnuts", name:"Walnuts", category:"Fat", serving:"28g", image:"/src/img/fat_walnuts.png",
    p:4, f:18, c:4, fiber:2,
    calories_kcal: 185, water_pct: 4, prep_time_min: 0, cost_nzd: 1.20, gi: 0,
    omega3_score: 0.9, animal_product: false, contains_nuts: true, contains_dairy: false
  },
  { 
    id:"fat_peanutbutter", name:"Peanut Butter", category:"Fat", serving:"1 Tbsp", image:"/src/img/fat_peanutbutter.png",
    p:4, f:8, c:3, fiber:1,
    calories_kcal: 95, water_pct: 1, prep_time_min: 0, cost_nzd: 0.15, gi: 14,
    omega3_score: 0, animal_product: false, contains_nuts: true, contains_dairy: false
  },
  { 
    id:"fat_cheese", name:"Cheddar Cheese", category:"Fat", serving:"28g", image:"/src/img/fat_cheese.png",
    p:7, f:9, c:1, fiber:0,
    calories_kcal: 113, water_pct: 37, prep_time_min: 0, cost_nzd: 0.60, gi: 0,
    omega3_score: 0, animal_product: true, contains_nuts: false, contains_dairy: true
  },
  { 
    id:"fat_butter", name:"Butter", category:"Fat", serving:"1 Tbsp", image:"/src/img/fat_butter.png",
    p:0, f:11, c:0, fiber:0,
    calories_kcal: 102, water_pct: 16, prep_time_min: 0, cost_nzd: 0.20, gi: 0,
    omega3_score: 0, animal_product: true, contains_nuts: false, contains_dairy: true
  },
  { 
    id:"fat_chocolate", name:"Dark Chocolate", category:"Fat", serving:"30g", image:"/src/img/fat_chocolate.png",
    p:2, f:12, c:13, fiber:3,
    calories_kcal: 155, water_pct: 1, prep_time_min: 0, cost_nzd: 1.50, gi: 23,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fat_coconut", name:"Coconut Meat", category:"Fat", serving:"1 cup", image:"/src/img/fat_coconut.png",
    p:3, f:27, c:12, fiber:7,
    calories_kcal: 283, water_pct: 47, prep_time_min: 10, cost_nzd: 2.00, gi: 35,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fat_flaxseed", name:"Flax Seeds", category:"Fat", serving:"2 Tbsp", image:"/src/img/fat_flaxseed.png",
    p:4, f:8, c:4, fiber:4,
    calories_kcal: 107, water_pct: 7, prep_time_min: 0, cost_nzd: 0.30, gi: 35,
    omega3_score: 1.0, animal_product: false, contains_nuts: false, contains_dairy: false
  },

  // --- Fiber (10) ---
  { 
    id:"fib_broccoli", name:"Broccoli", category:"Fiber", serving:"1 cup cooked", image:"/src/img/fib_broccoli.png",
    p:3.7, f:0.6, c:11, fiber:5.1,
    calories_kcal: 55, water_pct: 89, prep_time_min: 6, cost_nzd: 0.80, gi: 10,
    omega3_score: 0.1, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fib_spinach", name:"Spinach", category:"Fiber", serving:"1 cup cooked", image:"/src/img/fib_spinach.png",
    p:5, f:0.5, c:7, fiber:4.3,
    calories_kcal: 41, water_pct: 91, prep_time_min: 3, cost_nzd: 1.00, gi: 10,
    omega3_score: 0.2, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fib_lentils", name:"Lentils", category:"Fiber", serving:"1/2 cup cooked", image:"/src/img/fib_lentils.png",
    p:9, f:0.4, c:20, fiber:8,
    calories_kcal: 115, water_pct: 70, prep_time_min: 25, cost_nzd: 0.50, gi: 29,
    omega3_score: 0.1, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fib_chickpeas", name:"Chickpeas", category:"Fiber", serving:"1/2 cup cooked", image:"/src/img/fib_chickpeas.png",
    p:7, f:2, c:20, fiber:6,
    calories_kcal: 134, water_pct: 60, prep_time_min: 0, cost_nzd: 0.40, gi: 33,
    omega3_score: 0.1, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fib_blackbeans", name:"Black Beans", category:"Fiber", serving:"1/2 cup cooked", image:"/src/img/fib_blackbeans.png",
    p:7, f:0.5, c:20, fiber:8,
    calories_kcal: 114, water_pct: 66, prep_time_min: 0, cost_nzd: 0.35, gi: 30,
    omega3_score: 0.1, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fib_peas", name:"Green Peas", category:"Fiber", serving:"1/2 cup", image:"/src/img/fib_peas.png",
    p:4, f:0.3, c:10, fiber:3.5,
    calories_kcal: 59, water_pct: 78, prep_time_min: 4, cost_nzd: 0.70, gi: 51,
    omega3_score: 0.1, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fib_apple", name:"Apple", category:"Fiber", serving:"1 medium", image:"/src/img/fib_apple.png",
    p:0.5, f:0.3, c:25, fiber:4.4,
    calories_kcal: 95, water_pct: 86, prep_time_min: 0, cost_nzd: 0.60, gi: 36,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fib_pear", name:"Pear", category:"Fiber", serving:"1 medium", image:"/src/img/fib_pear.png",
    p:1, f:0.2, c:27, fiber:5.5,
    calories_kcal: 102, water_pct: 84, prep_time_min: 0, cost_nzd: 0.80, gi: 33,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fib_carrot", name:"Carrot", category:"Fiber", serving:"1 cup raw", image:"/src/img/fib_carrot.png",
    p:1, f:0.2, c:12, fiber:3.6,
    calories_kcal: 52, water_pct: 88, prep_time_min: 0, cost_nzd: 0.40, gi: 35,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
  { 
    id:"fib_cabbage", name:"Cabbage", category:"Fiber", serving:"1 cup cooked", image:"/src/img/fib_cabbage.png",
    p:2, f:0.1, c:8, fiber:4,
    calories_kcal: 34, water_pct: 93, prep_time_min: 8, cost_nzd: 0.50, gi: 10,
    omega3_score: 0, animal_product: false, contains_nuts: false, contains_dairy: false
  },
];
