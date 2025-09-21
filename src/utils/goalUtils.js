import { GOAL_WEIGHTS, DIETARY_FILTERS, DEFAULT_WEIGHTS } from './goalConfig.js';

/**
 * Combine long-term and daily goals with weighted priorities
 * @param {string} longTermGoal - User's profile long-term goal
 * @param {string} dailyGoal - Selected daily goal from home page
 * @param {number} dailyWeight - Weight for daily vs long-term (0.65 = 65% daily, 35% long-term)
 * @returns {object} Combined weights for ingredient scoring
 */
export function combineGoals(longTermGoal, dailyGoal, dailyWeight = 0.65) {
  const longTermWeights = GOAL_WEIGHTS.longTerm[longTermGoal] || {};
  const dailyWeights = GOAL_WEIGHTS.daily[dailyGoal] || {};
  
  // Get all possible feature names
  const allFeatures = new Set([
    ...Object.keys(longTermWeights),
    ...Object.keys(dailyWeights),
    ...Object.keys(DEFAULT_WEIGHTS)
  ]);
  
  const combinedWeights = {};
  
  // Combine weights: daily priority * dailyWeight + longTerm * (1 - dailyWeight)
  allFeatures.forEach(feature => {
    const dailyW = dailyWeights[feature] || 0;
    const longTermW = longTermWeights[feature] || 0;
    const defaultW = DEFAULT_WEIGHTS[feature] || 0;
    
    combinedWeights[feature] = 
      dailyW * dailyWeight + 
      longTermW * (1 - dailyWeight) +
      (dailyW === 0 && longTermW === 0 ? defaultW * 0.1 : 0); // Small default boost
  });
  
  return combinedWeights;
}

/**
 * Get dietary restrictions based on user profile
 * @param {string[]} restrictions - Array of dietary restrictions
 * @returns {object} Filter criteria for ingredients
 */
export function getDietaryFilters(restrictions = []) {
  const filters = {};
  
  restrictions.forEach(restriction => {
    const filterCriteria = DIETARY_FILTERS[restriction];
    if (filterCriteria) {
      Object.assign(filters, filterCriteria);
    }
  });
  
  return filters;
}

/**
 * Debug function to show goal combination results
 */
export function debugGoalCombination(longTermGoal, dailyGoal) {
  const combined = combineGoals(longTermGoal, dailyGoal);
  console.log(`Goal Combination: ${longTermGoal} + ${dailyGoal}`);
  console.log('Combined weights:', combined);
  return combined;
}
