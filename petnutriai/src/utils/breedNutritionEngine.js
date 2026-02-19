/**
 * Logic to map TheDogAPI breed data to nutritional targets.
 * 
 * API Data Available:
 * - breed_group: "Working", "Herding", "Toy", "Hound", "Sporting", "Non-Sporting", "Terrier", "Mixed"
 * - temperament: "Alert, Active, ..."
 * - weight: { metric: "20 - 30" }
 */

export const analyzeBreedNutrition = (breedData) => {
    if (!breedData) return null;

    const group = breedData.breed_group || 'Unknown';
    const temperament = breedData.temperament?.toLowerCase() || '';

    // Default: Standard Balanced Diet
    let profile = {
        protein: 0.28,
        fat: 0.18,
        carbs: 0.54,
        note: 'Standard Balanced Diet'
    };

    // 1. Working & Sporting & Herding (High Energy Output)
    if (['Working', 'Sporting', 'Herding'].includes(group)) {
        profile = {
            protein: 0.32, // Higher protein for muscle repair
            fat: 0.22,     // Higher fat for endurance energy
            carbs: 0.46,
            note: `${group} Dog Formula (High Performance)`
        };
    }

    // 2. Terriers & Hounds (High Metabolism / Prey Drive)
    else if (['Terrier', 'Hound'].includes(group)) {
        profile = {
            protein: 0.30,
            fat: 0.20,
            carbs: 0.50,
            note: `${group} Formula (Metabolic Support)`
        };
    }

    // 3. Toy Breeds (Fast Metabolism, small stomachs)
    else if (group === 'Toy') {
        profile = {
            protein: 0.30,
            fat: 0.20,
            carbs: 0.50,
            note: 'Toy Breed Formula (Energy Dense)'
        };
    }

    // 4. Non-Sporting (Often lower activity or unique needs)
    else if (group === 'Non-Sporting') {
        profile = {
            protein: 0.26,
            fat: 0.16,
            carbs: 0.58,
            note: 'Standard Maintenance Formula'
        };
    }

    // 5. Temperament Overrides
    if (temperament.includes('calm') || temperament.includes('gentle')) {
        // Slightly reduce energy density to prevent weight gain
        profile.fat = Math.max(0.12, profile.fat - 0.02);
        profile.carbs += 0.02;
    }

    if (temperament.includes('active') || temperament.includes('energetic')) {
        profile.protein = Math.min(0.35, profile.protein + 0.02);
        profile.fat = Math.min(0.25, profile.fat + 0.02);
        profile.carbs -= 0.04;
    }

    return profile;
};
