
// Local Rule-Based Health Engine (Zero Cost, No API Key)

const CONDITION_RULES = {
    'obesity': {
        avoid: ['High Fat Ingredients', 'Excessive Carbs', 'Table Scraps'],
        reason: 'To promote weight loss, reduce calorie density and avoid sugary/fatty fillers.'
    },
    'kidney': {
        avoid: ['High Phosphorus', 'Red Meat', 'Dried Bones', 'Organ Meat'],
        reason: 'Kidney support diets requires restricted phosphorus and high-quality but limited protein.'
    },
    'stomach': {
        avoid: ['Dairy', 'Spicy Food', 'Soy', 'Corn', 'Artificial Additives'],
        reason: 'Sensitive stomachs react poorly to common allergens and difficult-to-digest proteins.'
    },
    'skin': {
        avoid: ['Grain', 'Chicken (Common Allergen)', 'Beef'],
        reason: 'Skin issues are often linked to specific protein allergies or grains.'
    },
    'joint': {
        avoid: ['Inflammatory Grains', 'Nightshade Vegetables', 'High Sugar'],
        reason: 'Reducing inflammation helps manage arthritis and joint pain.'
    },
    'diabetes': {
        avoid: ['Sugar', 'High Glycemic Fruits', 'Rice', 'Corn'],
        reason: 'Strict glucose control is needed; avoid simple carbs and sugars.'
    },
    'heart': {
        avoid: ['High Sodium', 'Fatty Treats', 'Processed Meats'],
        reason: 'Low sodium intake is critical for managing heart conditions.'
    },
    'anxiety': {
        avoid: ['Artificial Preservatives', 'High Sugar'],
        reason: 'Clean diets can help stabilize mood; avoid stimulants.'
    },
    'dental': {
        avoid: ['Soft/Canned Food Only', 'Sugary Treats'],
        reason: 'Crunchy textures help clean teeth; sugar promotes decay.'
    },
    'surgery': {
        avoid: ['Hard Kibble', 'High Fiber'],
        reason: 'Easily digestible, high-energy soft food is recommended for recovery.'
    }
};

export const analyzeHealthRisks = async (conditions, notes, prescriptionFile) => {
    // Simulate API delay for "AI feel"
    await new Promise(resolve => setTimeout(resolve, 1500));

    let allAvoid = new Set();
    let reasons = [];

    // Combine all text to search
    const searchText = (conditions.join(' ') + ' ' + (notes || '')).toLowerCase();

    // Check Rules
    Object.keys(CONDITION_RULES).forEach(key => {
        if (searchText.includes(key)) {
            CONDITION_RULES[key].avoid.forEach(item => allAvoid.add(item));
            reasons.push(CONDITION_RULES[key].reason);
        }
    });

    const finalAvoid = Array.from(allAvoid);

    if (finalAvoid.length === 0 && searchText.length > 3) {
        return {
            avoid: ['Processed Foods', 'Table Scraps'],
            reason: 'For general health, avoid processed human foods and stick to a balanced pet diet.'
        };
    } else if (finalAvoid.length === 0) {
        return {
            avoid: [],
            reason: 'No specific exclusions identified based on the provided info.'
        };
    }

    return {
        avoid: finalAvoid,
        reason: reasons.length > 0 ? reasons[0] : 'Based on your selected conditions.'
    };
};
