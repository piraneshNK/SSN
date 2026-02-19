export const COUNTRY_RULES = {
    'IN': {
        name: 'India',
        currency: { symbol: '₹', code: 'INR', rate: 1 },
        restrict: ['beef', 'pork', 'turkey', 'bison', 'venison', 'rabbit', 'duck', 'kangaroo', 'tofu'],
        substitutions: {
            'beef': { replaceWith: 'mutton', reason: 'Not widely available / Cultural restriction' },
            'pork': { replaceWith: 'chicken', reason: 'Less common in general pet diets here' },
            'turkey': { replaceWith: 'chicken', reason: 'Not widely available' },
            'bison': { replaceWith: 'mutton', reason: 'Not available' },
            'venison': { replaceWith: 'mutton', reason: 'Not available' },
            'rabbit': { replaceWith: 'chicken', reason: 'Not widely available' },
            'duck': { replaceWith: 'chicken', reason: 'Less common' },
            'kangaroo': { replaceWith: 'chicken', reason: 'Not available' },
            'tofu': { replaceWith: 'paneer', reason: 'Tofu is less common, Paneer is widely available' }, // User specific request
            'salmon': { replaceWith: 'mackerel', reason: 'Expensive/Imported. Mackerel is local & rich in Omega-3' }
        }
    },
    'US': {
        name: 'USA',
        currency: { symbol: '$', code: 'USD', rate: 0.012 }, // Approx conversion
        restrict: ['paneer', 'roti', 'dalia', 'mutton'],
        substitutions: {
            'roti': { replaceWith: 'whole_wheat_bread', reason: 'Roti is less common' },
            'dalia': { replaceWith: 'oats', reason: 'Oats are the standard local equivalent' },
            'paneer': { replaceWith: 'cottage_cheese', reason: 'Cottage Cheese is the local equivalent' },
            'curd': { replaceWith: 'greek_yogurt', reason: 'Greek Yogurt is widely available' },
            'mutton': { replaceWith: 'beef', reason: 'Mutton (Goat) is rare, Beef is standard' }
        }
    },
    'GB': {
        name: 'UK',
        currency: { symbol: '£', code: 'GBP', rate: 0.0095 }, // Approx conversion
        restrict: ['paneer', 'roti'],
        substitutions: {
            'roti': { replaceWith: 'whole_wheat_bread', reason: 'Less common' },
            'paneer': { replaceWith: 'cottage_cheese', reason: 'Cottage Cheese is available' },
            'curd': { replaceWith: 'yoghurt', reason: 'Local spelling/availability' },
            'lady_finger': { replaceWith: 'green_beans', reason: 'Okra is less common in pet diets' }
        }
    },
    // Default fallback
    'DEFAULT': {
        restrict: [],
        substitutions: {},
        currency: { symbol: '₹', code: 'INR', rate: 1 }
    }
};

export const getLocalizedIngredient = (ingredientKey, countryCode) => {
    if (!countryCode) return { key: ingredientKey, reason: null };
    // Normalize code (handle potential undefined or lowercase)
    const code = countryCode.toUpperCase();
    const rules = COUNTRY_RULES[code] || COUNTRY_RULES['DEFAULT'];
    const originalKey = ingredientKey.toLowerCase();

    // Check direct substitution
    if (rules.substitutions[originalKey]) {
        const sub = rules.substitutions[originalKey];
        const replaceWith = typeof sub === 'string' ? sub : sub.replaceWith;
        return { key: replaceWith, reason: sub.reason || null };
    }

    // Check restriction WITHOUT defined sub (Safety Fallback)
    if (rules.restrict.includes(originalKey)) {
        return { key: null, reason: 'Restricted in this region' };
    }

    return { key: ingredientKey, reason: null };
};

export const getCurrency = (countryCode) => {
    if (!countryCode) return COUNTRY_RULES['DEFAULT'].currency;
    const code = countryCode.toUpperCase();
    return (COUNTRY_RULES[code] || COUNTRY_RULES['DEFAULT']).currency;
};

