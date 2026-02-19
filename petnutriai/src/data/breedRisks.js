export const BREED_RISKS = {
    'Dalmatian': {
        condition: 'Low Purine Diet',
        exclude: ['Organ Meats', 'Red Meat', 'Game', 'Yeast'],
        symptom: 'Prone to urinary stones. Requires low purine diet (avoid organ meats).',
        adjustment: 'switch_to_white_meat',
        macros: { protein: 0.22, fat: 0.15 } // Lower protein due to purine risk
    },
    'German Shepherd': {
        condition: 'Joint Support',
        exclude: [],
        symptom: 'Prone to hip dysplasia. Requires joint support (Glucosamine/Omega-3).',
        adjustment: 'add_joint_support',
        macros: { protein: 0.30, fat: 0.20 } // Active working dog
    },
    'Labrador Retriever': {
        condition: 'Obesity Prone',
        exclude: ['High Fat Treats', 'Table Scraps'],
        symptom: 'Prone to weight gain. Monitor calories strictly.',
        adjustment: 'reduce_calories_10',
        macros: { protein: 0.30, fat: 0.12 } // High protein for satiety, low fat
    },
    'Pug': {
        condition: 'Breathing/Weight',
        exclude: [],
        symptom: 'Brachycephalic (flat-faced). Keep weight low to ease breathing.',
        adjustment: 'reduce_calories_10',
        macros: { protein: 0.25, fat: 0.10 } // Lower fat to prevent obesity
    },
    'Bulldog': {
        condition: 'Sensitive Stomach',
        exclude: ['Grains', 'Soy'],
        symptom: 'Prone to gas and skin allergies.',
        adjustment: 'grain_free_default',
        macros: { protein: 0.25, fat: 0.12 }
    },
    'Golden Retriever': {
        condition: 'Cancer Prone/Joints',
        exclude: ['Processed Foods'],
        symptom: 'General health monitoring required. Antioxidants recommended.',
        adjustment: 'add_antioxidants',
        macros: { protein: 0.28, fat: 0.15 }
    },
    'Boxer': {
        condition: 'Heart Health',
        exclude: ['Grain-Heavy Fillers'],
        symptom: 'Prone to heart issues and cancer.',
        adjustment: 'add_taurine',
        macros: { protein: 0.30, fat: 0.18 }
    },
    'Siberian Husky': {
        condition: 'Zinc Deficiency',
        exclude: [],
        symptom: 'May require zinc supplementation.',
        adjustment: 'add_zinc',
        macros: { protein: 0.35, fat: 0.22 } // High energy/endurance
    },
    'Greyhound': {
        condition: 'High Metabolism',
        exclude: [],
        symptom: 'Fast metabolism, requires energy dense food.',
        adjustment: 'increase_calories',
        macros: { protein: 0.35, fat: 0.20 } // Sprint energy
    }
};

export const getBreedRisk = (breedName) => {
    if (!breedName) return null;
    // Simple partial match
    const key = Object.keys(BREED_RISKS).find(k => breedName.includes(k));
    return key ? BREED_RISKS[key] : null;
};
