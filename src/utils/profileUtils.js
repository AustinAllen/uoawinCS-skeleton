// Utility functions for reading user profile data

const STORAGE_KEY = "health_profile_v1";

/**
 * Get user profile from localStorage
 */
export function getUserProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to load profile:", e);
    return null;
  }
}

/**
 * Get user's dietary preference from profile
 */
export function getUserDietaryPreference() {
  const profile = getUserProfile();
  return profile?.diet || "";
}

/**
 * Get user's long-term goal from profile
 */
export function getUserGoal() {
  const profile = getUserProfile();
  return profile?.goal || "focus";
}

/**
 * Convert profile diet preference to filter format for ingredients
 */
export function convertDietToFilters(diet) {
  const filters = [];
  
  switch (diet) {
    case 'vegan':
      filters.push('vegan');
      break;
    case 'dairy-free':
      filters.push('dairyFree');
      break;
    case 'nut-free':
      filters.push('nutFree');
      break;
    default:
      // No dietary restrictions
      break;
  }
  
  return filters;
}

/**
 * Map profile goal to long-term goal names
 */
export function mapProfileGoalToLongTerm(profileGoal) {
  const goalMap = {
    'focus': 'Focus/Energy',
    'high-protein': 'High-Protein',
    'weight-friendly': 'Lean'
  };
  
  return goalMap[profileGoal] || 'Focus/Energy';
}
