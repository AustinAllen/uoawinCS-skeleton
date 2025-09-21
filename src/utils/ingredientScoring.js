// Simplified ingredient scoring for different goals
import { GOAL_WEIGHTS } from './goalConfig.js';

/**
 * Calculate basic scores for ingredients based on simple heuristics
 */
function calculateIngredientScores(ingredient, dailyGoal) {
  const { p, f, c, fiber, category } = ingredient;
  const calories = Math.round(p * 4 + c * 4 + f * 9);
  
  let score = 0;
  let tags = [];
  
  switch (dailyGoal) {
    case 'Quick':
      // Favor ready-to-eat items, canned goods, and simple prep
      if (['pro_tuna', 'pro_greek-yogurt', 'pro_cottage-cheese', 'fib_apple', 'fib_carrot', 'fat_almonds', 'fat_avocado'].includes(ingredient.id)) {
        score += 0.8;
        tags.push('Ready-to-eat');
      }
      if (ingredient.id.includes('carb_oats') || ingredient.id.includes('carb_bread')) {
        score += 0.6;
        tags.push('Quick prep');
      }
      break;
      
    case 'Budget':
      // Favor high protein per cost, filling ingredients
      const proteinPerCal = calories > 0 ? p / (calories / 100) : 0;
      if (proteinPerCal > 15) {
        score += 0.7;
        tags.push('High protein');
      }
      if (['carb_rice', 'carb_oats', 'fib_lentils', 'fib_chickpeas', 'fib_blackbeans', 'pro_egg'].includes(ingredient.id)) {
        score += 0.6;
        tags.push('Budget-friendly');
      }
      break;
      
    case 'Hydrating':
      // Favor vegetables and fruits
      if (category === 'Fiber' && !ingredient.id.includes('beans') && !ingredient.id.includes('lentils')) {
        score += 0.8;
        tags.push('Hydrating');
      }
      if (['fib_broccoli', 'fib_spinach', 'fib_carrot', 'fib_apple', 'fib_pear'].includes(ingredient.id)) {
        score += 0.9;
        tags.push('High water content');
      }
      break;
      
    case 'Recovery':
      // Favor protein + some carbs
      if (category === 'Protein') {
        score += 0.6;
        tags.push('Protein');
      }
      if (category === 'Carb' && fiber > 3) {
        score += 0.5;
        tags.push('Complex carbs');
      }
      if (p > 15) {
        score += 0.4;
        tags.push('High protein');
      }
      break;
      
    case 'Balanced':
      // Favor balanced macros and variety
      const proteinRatio = calories > 0 ? (p * 4) / calories : 0;
      const carbRatio = calories > 0 ? (c * 4) / calories : 0;
      const fatRatio = calories > 0 ? (f * 9) / calories : 0;
      
      if (proteinRatio >= 0.15 && proteinRatio <= 0.35 && carbRatio >= 0.3 && carbRatio <= 0.6) {
        score += 0.6;
        tags.push('Balanced');
      }
      if (fiber > 3) {
        score += 0.3;
        tags.push('High fiber');
      }
      break;
  }
  
  // Add basic nutrition tags
  if (calories < 100) tags.push('Low cal');
  if (p > 10) tags.push('Protein-rich');
  if (fiber > 4) tags.push('High fiber');
  
  return {
    score: Math.min(score, 1),
    tags: tags.slice(0, 3), // Max 3 tags
    calories
  };
}

/**
 * Sort ingredients based on daily goal
 */
export function sortIngredientsByGoal(ingredients, dailyGoal) {
  const scoredIngredients = ingredients.map(ingredient => {
    const scores = calculateIngredientScores(ingredient, dailyGoal);
    return {
      ...ingredient,
      goalScore: scores.score,
      tags: scores.tags,
      calories: scores.calories
    };
  });
  
  // Sort by score (descending) then by protein content
  return scoredIngredients.sort((a, b) => {
    if (Math.abs(a.goalScore - b.goalScore) > 0.1) {
      return b.goalScore - a.goalScore;
    }
    return b.p - a.p; // Tie breaker: protein content
  });
}

/**
 * Apply dietary filters
 */
export function applyDietaryFilters(ingredients, filters = []) {
  if (!filters.length) return ingredients;
  
  return ingredients.filter(ingredient => {
    if (filters.includes('vegan') && !ingredient.vegan) return false;
    if (filters.includes('nutFree') && !ingredient.nutFree) return false;
    if (filters.includes('dairyFree') && !ingredient.dairyFree) return false;
    return true;
  });
}
