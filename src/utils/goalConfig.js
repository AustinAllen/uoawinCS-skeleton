// Simplified goal weights for ingredient scoring
export const GOAL_WEIGHTS = {
  'Quick': {
    prep_time_priority: 0.7,    // 偏好准备时间短的
    convenience_score: 0.3      // 偏好方便的
  },
  'Budget': {
    cost_efficiency: 0.6,       // 偏好性价比高的
    protein_per_dollar: 0.4     // 偏好蛋白质含量高但价格低的
  },
  'Hydrating': {
    water_content: 0.8,         // 偏好水分含量高的
    freshness: 0.2             // 偏好新鲜蔬果
  },
  'Recovery': {
    protein_focus: 0.5,         // 偏好蛋白质
    carb_balance: 0.3,          // 需要一些碳水
    nutrient_density: 0.2       // 营养密度
  },
  'Balanced': {
    macro_balance: 0.5,         // 宏量营养素平衡
    overall_nutrition: 0.5      // 整体营养价值
  }
};
