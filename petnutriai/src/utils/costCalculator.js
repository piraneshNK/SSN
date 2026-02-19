import { INGREDIENTS } from '../data/ingredients';
import { getLocalizedIngredient } from '../data/countryRules';

/**
 * Parses an ingredient string like "Chicken (150g)" 
 * Returns { key: 'chicken', grams: 150, cost: 42, calories: ... }
 */
export const parseIngredient = (text) => {
    // Regex to match "Name (123g)" or "Name 123g"
    const match = text.match(/^(.+?)\s*\(?(\d+)g\)?$/i);
    if (!match) return null;

    const rawName = match[1].trim().toLowerCase().replace(/ /g, '_'); // "Chicken Breast" -> "chicken_breast"
    const grams = parseInt(match[2]);

    // Fuzzy matching / Mapping
    // Simple mapping for now based on known keys in ingredients.json
    let key = rawName;

    // Manual mapping for common mismatches in mealData vs ingredients.json
    const MAPPINGS = {
        'chicken': 'chicken',
        'chicken_breast': 'chicken',
        'rice': 'white_rice',
        'brown_rice': 'brown_rice',
        'oats': 'oats',
        'egg': 'egg',
        'fish': 'fish_rohu_katla',
        'sardine': 'fish_seer',
        'pumpkin': 'pumpkin',
        'carrot': 'carrot',
        'spinach': 'spinach',
        'curd': 'curd',
        'yogurt': 'curd',
        'mix_veg': 'beans',
        'vegetables': 'beans',
        'sweet_potato': 'sweet_potato',
        'liver': 'chicken_liver',
        'organ_meat': 'chicken_liver',
        'mutton': 'mutton',
        'paneer': 'paneer',
        'cottage_cheese': 'paneer',
        'roti': 'roti',
        'chapati': 'roti',
        'dalia': 'dalia',
        'broken_wheat': 'dalia',
        'oil': null,
        'coconut_oil': null,
        'supplements': null
    };

    // Try finding exact match or mapped match
    if (!INGREDIENTS[key]) {
        // Try mapping
        if (MAPPINGS[key]) key = MAPPINGS[key];
        // Try partial match
        else if (key.includes('chicken')) key = 'chicken';
        else if (key.includes('rice')) key = 'white_rice';
        else if (key.includes('egg')) key = 'egg';
        else return null;
    }

    const data = INGREDIENTS[key];
    if (!data) return null;

    const cost = (data.price_per_kg / 1000) * grams;
    const calories = (data.calories / 100) * grams;
    const protein = (data.protein / 100) * grams;

    return {
        name: data.name,
        originalText: text,
        grams,
        cost,
        calories,
        protein,
        data
    };
};

/**
 * Calculates total cost for a list of ingredient strings
 */
export const calculateMealCost = (items) => {
    let totalCost = 0;
    let totalCalories = 0;
    let totalProtein = 0;
    let breakdown = [];

    items.forEach(itemStr => {
        const info = parseIngredient(itemStr);
        if (info) {
            totalCost += info.cost;
            totalCalories += info.calories;
            totalProtein += info.protein;
            breakdown.push(info);
        }
    });

    return {
        totalCost: Math.round(totalCost * 100) / 100, // 2 decimals
        totalCalories: Math.round(totalCalories),
        totalProtein: Math.round(totalProtein),
        breakdown
    };
};

/**
 * Estimates monthly cost based on calorie needs and tier composition
 * @param {number} dailyCalories - MER
 * @param {string} tier - 'budget', 'standard', 'premium' (or others)
 * @param {string} petType - 'dog' | 'cat'
 */
export const calculateMonthlyEstimate = (dailyCalories, tier, petType) => {
    let mix = [];

    if (petType === 'dog') {
        if (tier === 'budget' || tier === 'low') {
            // Mostly Rice + Egg + Veg + Little Chicken
            mix = [
                { id: 'white_rice', pct: 0.50 },
                { id: 'egg', pct: 0.20 },
                { id: 'beans', pct: 0.15 },
                { id: 'chicken', pct: 0.15 }
            ];
        } else if (tier === 'premium' || tier === 'high') {
            // Mostly Chicken/Mutton + Veg + Less Rice
            mix = [
                { id: 'chicken', pct: 0.40 },
                { id: 'mutton', pct: 0.10 },
                { id: 'white_rice', pct: 0.20 },
                { id: 'carrot', pct: 0.30 }
            ];
        } else {
            // Standard / Balanced
            mix = [
                { id: 'chicken', pct: 0.30 },
                { id: 'egg', pct: 0.10 },
                { id: 'white_rice', pct: 0.40 },
                { id: 'pumpkin', pct: 0.20 }
            ];
        }
    } else {
        // Cat - Carnivore (High Protein, varying sources)
        if (tier === 'budget' || tier === 'low') {
            // Mostly Chicken & Liver (Cheapest proteins)
            mix = [
                { id: 'chicken', pct: 0.60 },
                { id: 'chicken_liver', pct: 0.20 },
                { id: 'egg', pct: 0.10 },
                { id: 'pumpkin', pct: 0.10 }
            ];
        } else if (tier === 'premium' || tier === 'high') {
            // Expensive Meats (Mutton, Seer Fish, etc)
            mix = [
                { id: 'chicken', pct: 0.20 },
                { id: 'mutton', pct: 0.30 }, // Replaces Beef typically
                { id: 'fish_seer', pct: 0.30 },
                { id: 'carrot', pct: 0.20 }
            ];
        } else {
            // Standard Balance
            mix = [
                { id: 'chicken', pct: 0.50 },
                { id: 'fish_rohu_katla', pct: 0.20 },
                { id: 'chicken_liver', pct: 0.20 },
                { id: 'pumpkin', pct: 0.10 }
            ];
        }
    }

    // Calculate cost per day
    let dailyCost = 0;
    mix.forEach(item => {
        const calShare = dailyCalories * item.pct;
        const ing = INGREDIENTS[item.id] || INGREDIENTS['chicken'];

        // Calories per gram -> grams needed
        // Avoid divide by zero
        const calPerG = (ing.calories / 100) || 1;
        const gramsNeeded = calShare / calPerG;

        // Cost
        const cost = (ing.price_per_kg / 1000) * gramsNeeded;
        dailyCost += cost;
    });

    return Math.round(dailyCost * 30);
};
