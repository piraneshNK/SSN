import rawData from '../../ingredients.json';

// Convert array to Map for O(1) access
// Key: item.name (e.g., "chicken")
export const INGREDIENTS = rawData.reduce((acc, item) => {
    acc[item.name] = item;
    return acc;
}, {});

// Helper to get formatted name
export const getIngredientName = (key) => {
    return key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};
