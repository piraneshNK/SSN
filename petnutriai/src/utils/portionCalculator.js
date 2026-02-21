import { INGREDIENTS } from '../data/ingredients';
import { getLocalizedIngredient } from '../data/countryRules';

// Base recipes templates (generic terms)
// Recipe Templates
const RECIPES = {
    dog: {
        breakfast: [
            { name: 'Power Bowl', components: { meat: 0.5, carb: 0.3, veg: 0.2 } },
            { name: 'Morning Mix', components: { meat: 0.4, carb: 0.5, veg: 0.1 } },
            { name: 'Light Start', components: { meat: 0.3, carb: 0.4, veg: 0.3 } }
        ],
        lunch: [
            { name: 'Protein Feast', components: { meat: 0.6, carb: 0.2, veg: 0.2 } },
            { name: 'Balanced Meal', components: { meat: 0.4, carb: 0.4, veg: 0.2 } },
            { name: 'Active Lunch', components: { meat: 0.5, carb: 0.3, veg: 0.2 } }
        ],
        dinner: [
            { name: 'Recovery Stew', components: { meat: 0.5, carb: 0.2, veg: 0.3 } },
            { name: 'Hearty Dinner', components: { meat: 0.6, carb: 0.3, veg: 0.1 } },
            { name: 'Simple Supper', components: { meat: 0.4, carb: 0.4, veg: 0.2 } }
        ]
    },
    cat: {
        breakfast: [
            { name: 'Hunter\'s Morning', components: { meat: 0.8, carb: 0.05, veg: 0.15 } },
            { name: 'Carnivore Start', components: { meat: 0.9, carb: 0.0, veg: 0.1 } },
            { name: 'Protein Kick', components: { meat: 0.85, carb: 0.0, veg: 0.15 } }
        ],
        lunch: [
            { name: 'Feline Feast', components: { meat: 0.8, carb: 0.1, veg: 0.1 } },
            { name: 'Midday Prey', components: { meat: 0.9, carb: 0.0, veg: 0.1 } },
            { name: 'Fishy Delight', components: { meat: 0.85, carb: 0.05, veg: 0.1 } }
        ],
        dinner: [
            { name: 'Night Prowl', components: { meat: 0.9, carb: 0.0, veg: 0.1 } },
            { name: 'Moonlight Meal', components: { meat: 0.85, carb: 0.0, veg: 0.15 } },
            { name: 'Rest & Digest', components: { meat: 0.8, carb: 0.05, veg: 0.15 } }
        ]
    },
    rabbit: {
        breakfast: [
            { name: 'Morning Hay', components: { meat: 0.0, carb: 0.8, veg: 0.2 } },
            { name: 'Fresh Start', components: { meat: 0.0, carb: 0.7, veg: 0.3 } },
            { name: 'Fiber Boost', components: { meat: 0.0, carb: 0.85, veg: 0.15 } }
        ],
        lunch: [
            { name: 'Midday Greens', components: { meat: 0.0, carb: 0.5, veg: 0.5 } },
            { name: 'Salad Bowl', components: { meat: 0.0, carb: 0.4, veg: 0.6 } },
            { name: 'Crunch Time', components: { meat: 0.0, carb: 0.6, veg: 0.4 } }
        ],
        dinner: [
            { name: 'Evening Forage', components: { meat: 0.0, carb: 0.7, veg: 0.3 } },
            { name: 'Pellet Mix', components: { meat: 0.0, carb: 0.8, veg: 0.2 } },
            { name: 'Light Supper', components: { meat: 0.0, carb: 0.75, veg: 0.25 } }
        ]
    },
    hamster: {
        breakfast: [
            { name: 'Seed Medley', components: { meat: 0.1, carb: 0.7, veg: 0.2 } },
            { name: 'Grain Start', components: { meat: 0.0, carb: 0.8, veg: 0.2 } },
            { name: 'Power Oats', components: { meat: 0.1, carb: 0.8, veg: 0.1 } }
        ],
        lunch: [
            { name: 'Fresh Forage', components: { meat: 0.05, carb: 0.6, veg: 0.35 } },
            { name: 'Garden Crunch', components: { meat: 0.0, carb: 0.5, veg: 0.5 } },
            { name: 'Nutty Lunch', components: { meat: 0.1, carb: 0.7, veg: 0.2 } }
        ],
        dinner: [
            { name: 'Protein Boost', components: { meat: 0.2, carb: 0.6, veg: 0.2 } },
            { name: 'Evening Feast', components: { meat: 0.15, carb: 0.7, veg: 0.15 } },
            { name: 'Simple Seeds', components: { meat: 0.05, carb: 0.85, veg: 0.1 } }
        ]
    }
};

// Available ingredients by category (Generic -> Key in ingredients.js)
const PANTRY = {
    meat: ['chicken', 'mutton', 'fish_rohu_katla', 'egg', 'chicken_liver', 'turkey', 'beef', 'pork', 'duck', 'fish_seer', 'mealworms', 'crickets'], // Added insects for hamsters
    carb: ['white_rice', 'brown_rice', 'oats', 'sweet_potato', 'millet', 'barley', 'seeds_mix', 'corn', 'timothy_hay', 'orchard_grass_hay', 'rabbit_pellets', 'high_fiber_pellets'], // Added Rabbit/Hamster carbs
    veg: ['pumpkin', 'carrot', 'beans', 'spinach', 'cucumber', 'broccoli', 'peas', 'coriander_leaves', 'pear', 'carrot_tops'] // Rabbit favorites
};

/**
 * Selects an ingredient for a category, respecting location rules
 */
const pickIngredient = (category, countryCode) => {
    const options = PANTRY[category];
    // Filter by country rules
    const validOptions = options.filter(item => {
        // localized check
        const localizedObj = getLocalizedIngredient(item, countryCode);
        return localizedObj.key !== null; // filtered out if null
    });

    if (validOptions.length === 0) return { key: 'chicken', original: 'chicken', isReplaced: false }; // Fallback

    const random = validOptions[Math.floor(Math.random() * validOptions.length)];

    // Get details
    const localizedObj = getLocalizedIngredient(random, countryCode);

    return {
        key: localizedObj.key,
        original: random,
        isReplaced: random !== localizedObj.key,
        reason: localizedObj.reason // Capture the explicit reason
    };
};

/**
 * Calculates grams for an ingredient to meet specific calories
 */
const calculateGrams = (ingredientKey, targetCalories) => {
    const data = INGREDIENTS[ingredientKey];
    if (!data) return { grams: 0, macros: { p: 0, c: 0, f: 0 } };

    // calories = (kcal/100g) * (grams/100)
    // grams = (calories * 100) / kcal_per_100
    if (targetCalories <= 0) return { grams: 0, name: data.name, calories: 0, protein: 0, fat: 0 };

    const grams = Math.round((targetCalories * 100) / data.calories);

    return {
        grams,
        name: data.name,
        calories: Math.round((data.calories * grams) / 100),
        protein: Math.round((data.protein * grams) / 100),
        fat: Math.round((data.fat * grams) / 100)
    };
};

/**
 * Generates a full day plan with precise measurements
 */
export const generateDailyPlan = (petProfile, nutrition, location, activeDayIndex) => {
    const dailyMER = nutrition.mer;
    const meals = ['breakfast', 'lunch', 'dinner'];
    const distribution = [0.3, 0.35, 0.35]; // Calorie split per meal (30%, 35%, 35%)

    const dayPlan = {};
    let totalCals = 0;
    let totalProtein = 0;

    // Use correct recipe set
    const recipeSet = RECIPES[petProfile.petType] || RECIPES.dog;

    meals.forEach((mealType, idx) => {
        const mealCals = dailyMER * distribution[idx];

        // Pick a recipe template (rotate based on day index to vary)
        const templates = recipeSet[mealType];
        const template = templates[(activeDayIndex + idx) % templates.length]; // Simple rotation logic

        // Pick ingredients
        const meatObj = pickIngredient('meat', location?.code);

        // For cats, carbs might be 0. Handle effectively.
        let carbObj = { key: 'white_rice', original: 'Rice', isReplaced: false };
        if (template.components.carb > 0) {
            carbObj = pickIngredient('carb', location?.code);
        }

        const vegObj = pickIngredient('veg', location?.code);

        // Calculate portions
        const meatPortion = calculateGrams(meatObj.key, mealCals * template.components.meat);
        const carbPortion = calculateGrams(carbObj.key, mealCals * template.components.carb);
        const vegPortion = calculateGrams(vegObj.key, mealCals * template.components.veg);

        // Construct Meal Data
        // e.g. "120g Chicken, 80g Rice, 50g Pumpkin"
        // Filter out 0g items
        const parts = [];
        if (meatPortion.grams > 0) parts.push(`${meatPortion.grams}g ${meatPortion.name}`);
        if (carbPortion.grams > 0) parts.push(`${carbPortion.grams}g ${carbPortion.name}`);
        if (vegPortion.grams > 0) parts.push(`${vegPortion.grams}g ${vegPortion.name}`);

        const mealString = parts.join(', ');

        const mealTotalCals = meatPortion.calories + carbPortion.calories + vegPortion.calories;

        // Check for any replacements to highlight
        const replacements = [];

        const formatReplacement = (obj, finalName) => {
            if (obj.isReplaced) {
                // Formatting: "Beef unavailable (Replaced with Mutton)"
                // Or user requested: "Tofu is less common, Paneer is widely available"
                return obj.reason
                    ? `${obj.original} ➝ ${finalName} (${obj.reason})`
                    : `${obj.original} ➝ ${finalName}`;
            }
            return null;
        };

        const meatNote = formatReplacement(meatObj, meatPortion.name);
        if (meatNote) replacements.push(meatNote);

        const carbNote = formatReplacement(carbObj, carbPortion.name);
        if (carbNote && carbPortion.grams > 0) replacements.push(carbNote);

        const vegNote = formatReplacement(vegObj, vegPortion.name);
        if (vegNote) replacements.push(vegNote);

        dayPlan[mealType] = {
            meal: mealString,
            portions: template.name, // Display recipe name as subtitle
            calories: mealTotalCals,
            protein: meatPortion.protein + carbPortion.protein + vegPortion.protein,
            fat: meatPortion.fat + carbPortion.fat + vegPortion.fat,
            note: replacements.length > 0 ? `Localized for ${location?.country}: ${replacements.join(' | ')}` : null,
            components: [meatPortion, carbPortion, vegPortion].filter(c => c.grams > 0) // Explicit components for ShoppingCart
        };

        totalCals += mealTotalCals;
        totalProtein += dayPlan[mealType].protein;
    });

    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return {
        day: DAYS[activeDayIndex % 7],
        ...dayPlan
    };
};
