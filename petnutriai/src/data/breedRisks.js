export const BREED_RISKS = {
    'Dalmatian': {
        condition: 'Low Purine Diet',
        exclude: ['Organ Meats', 'Red Meat', 'Game', 'Yeast'],
        symptom: 'Prone to urinary stones. Requires low purine diet (avoid organ meats).',
        adjustment: 'switch_to_white_meat'
    },
    'German Shepherd': {
        condition: 'Joint Support',
        exclude: [],
        symptom: 'Prone to hip dysplasia. Requires joint support (Glucosamine/Omega-3).',
        adjustment: 'add_joint_support'
    },
    'Labrador Retriever': {
        condition: 'Obesity Prone',
        exclude: ['High Fat Treats', 'Table Scraps'],
        symptom: 'Prone to weight gain. Monitor calories strictly.',
        adjustment: 'reduce_calories_10'
    },
    'Pug': {
        condition: 'Breathing/Weight',
        exclude: [],
        symptom: 'Brachycephalic (flat-faced). Keep weight low to ease breathing.',
        adjustment: 'reduce_calories_10'
    },
    'Bulldog': {
        condition: 'Sensitive Stomach',
        exclude: ['Grains', 'Soy'],
        symptom: 'Prone to gas and skin allergies.',
        adjustment: 'grain_free_default'
    },
    'Golden Retriever': {
        condition: 'Cancer Prone/Joints',
        exclude: ['Processed Foods'],
        symptom: 'General health monitoring required. Antioxidants recommended.',
        adjustment: 'add_antioxidants'
    },
    'Boxer': {
        condition: 'Heart Health',
        exclude: ['Grain-Heavy Fillers'],
        symptom: 'Prone to heart issues and cancer.',
        adjustment: 'add_taurine'
    },
    'Siberian Husky': {
        condition: 'Zinc Deficiency',
        exclude: [],
        symptom: 'May require zinc supplementation.',
        adjustment: 'add_zinc'
    }
};

export const getBreedRisk = (breedName) => {
    if (!breedName) return null;
    // Simple partial match
    const key = Object.keys(BREED_RISKS).find(k => breedName.includes(k));
    return key ? BREED_RISKS[key] : null;
};
