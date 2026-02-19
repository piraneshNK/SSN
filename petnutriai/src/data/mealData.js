export const getMealPlanKey = (petType, dietType, budgetTier) => {
    return `${petType}_${dietType}_${budgetTier}`;
};

export const mealPlansData = {
    // DOG NON-VEG
    dog_nonveg_budget: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Boiled Egg & Rice', portions: '2 eggs + 100g rice', calories: 350, protein: 18, fat: 12 },
            lunch: { meal: 'Chicken Liver & Curd', portions: '150g liver + 50g curd', calories: 400, protein: 30, fat: 10 },
            dinner: { meal: 'Chicken & Pumpkin', portions: '150g chicken parts + 100g pumpkin', calories: 450, protein: 35, fat: 15 }
        })),
        shoppingList: [
            { ingredient: 'Chicken Parts/Liver', monthlyQty: '10 kg', estimatedCost: 1200 },
            { ingredient: 'Rice', monthlyQty: '5 kg', estimatedCost: 300 },
            { ingredient: 'Eggs', monthlyQty: '60 units', estimatedCost: 400 },
            { ingredient: 'Pumpkin/Veg', monthlyQty: '3 kg', estimatedCost: 150 },
            { ingredient: 'Curd', monthlyQty: '2 kg', estimatedCost: 150 }
        ]
    },
    dog_nonveg_balanced: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Boiled Chicken Breast & Oats', portions: '150g chicken + 50g oats', calories: 400, protein: 40, fat: 5 },
            lunch: { meal: 'Fish (Sardines) & Rice', portions: '100g fish + 100g rice', calories: 450, protein: 25, fat: 15 },
            dinner: { meal: 'Lean Meat & Sweet Potato', portions: '150g meat + 100g potato', calories: 500, protein: 35, fat: 18 }
        })),
        shoppingList: [
            { ingredient: 'Chicken Breast', monthlyQty: '5 kg', estimatedCost: 1500 },
            { ingredient: 'Fish (Sardines)', monthlyQty: '3 kg', estimatedCost: 600 },
            { ingredient: 'Lean Meat (Buff/Mutton)', monthlyQty: '3 kg', estimatedCost: 1200 },
            { ingredient: 'Oats/Rice', monthlyQty: '4 kg', estimatedCost: 400 },
            { ingredient: 'Sweet Potato/Veg', monthlyQty: '5 kg', estimatedCost: 300 }
        ]
    },
    dog_nonveg_premium: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Salmon & Quinoa', portions: '150g salmon + 50g quinoa', calories: 500, protein: 35, fat: 25 },
            lunch: { meal: 'Turkey & Blueberry Mix', portions: '150g turkey + fruit mix', calories: 450, protein: 40, fat: 10 },
            dinner: { meal: 'Lamb & Imported Kibble Topper', portions: '150g lamb + premium topper', calories: 600, protein: 30, fat: 30 }
        })),
        shoppingList: [
            { ingredient: 'Salmon/Seafood', monthlyQty: '4 kg', estimatedCost: 3000 },
            { ingredient: 'Turkey/Lamb', monthlyQty: '5 kg', estimatedCost: 4000 },
            { ingredient: 'Quinoa/Premium Grains', monthlyQty: '2 kg', estimatedCost: 600 },
            { ingredient: 'Blueberries/Supplements', monthlyQty: 'Pack', estimatedCost: 1000 },
            { ingredient: 'Premium Toppers', monthlyQty: '2 kg', estimatedCost: 1500 }
        ]
    },
    // DOG VEG
    dog_veg_budget: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Paneer & Rice', portions: '100g paneer + 100g rice', calories: 400, protein: 20, fat: 20 },
            lunch: { meal: 'Soya Chunks & Curd', portions: '50g soya + 100g curd', calories: 350, protein: 25, fat: 5 },
            dinner: { meal: 'Lentils (Dal) & Roti', portions: '1 cup dal + 2 rotis', calories: 450, protein: 15, fat: 5 }
        })),
        shoppingList: [
            { ingredient: 'Paneer', monthlyQty: '3 kg', estimatedCost: 1200 },
            { ingredient: 'Soya Chunks', monthlyQty: '2 kg', estimatedCost: 300 },
            { ingredient: 'Lentils/Dal', monthlyQty: '3 kg', estimatedCost: 400 },
            { ingredient: 'Rice/Atta', monthlyQty: '5 kg', estimatedCost: 300 },
            { ingredient: 'Curd/Milk', monthlyQty: '5 L', estimatedCost: 300 }
        ]
    },
    dog_veg_balanced: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Tofu & Sweet Potato', portions: '150g tofu + 100g potato', calories: 400, protein: 25, fat: 10 },
            lunch: { meal: 'Chickpeas & Spinach', portions: '1 cup chickpeas + spinach', calories: 350, protein: 15, fat: 5 },
            dinner: { meal: 'Greek Yogurt & Flaxseed Mix', portions: '200g yogurt + seeds', calories: 300, protein: 20, fat: 10 }
        })),
        shoppingList: [
            { ingredient: 'Tofu/Paneer', monthlyQty: '4 kg', estimatedCost: 1600 },
            { ingredient: 'Chickpeas/Beans', monthlyQty: '3 kg', estimatedCost: 400 },
            { ingredient: 'Greek Yogurt', monthlyQty: '2 kg', estimatedCost: 600 },
            { ingredient: 'Sweet Potato/Veg', monthlyQty: '5 kg', estimatedCost: 300 },
            { ingredient: 'Supplements (Flax)', monthlyQty: 'Pack', estimatedCost: 300 }
        ]
    },
    dog_veg_premium: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Imported Veg Kibble', portions: '1 cup premium kibble', calories: 400, protein: 25, fat: 15 },
            lunch: { meal: 'Gourmet Veg Loaf', portions: '1 pack wet food', calories: 350, protein: 20, fat: 10 },
            dinner: { meal: 'Quinoa & Veg Stew', portions: '1 bowl stew', calories: 350, protein: 15, fat: 5 }
        })),
        shoppingList: [
            { ingredient: 'Gourmet Veg Food', monthlyQty: '15 packs', estimatedCost: 4000 },
            { ingredient: 'Imported Kibble', monthlyQty: '3 kg', estimatedCost: 2500 },
            { ingredient: 'Quinoa', monthlyQty: '2 kg', estimatedCost: 600 },
            { ingredient: 'Organic Veg', monthlyQty: '3 kg', estimatedCost: 500 },
            { ingredient: 'Supplements', monthlyQty: 'Pack', estimatedCost: 1000 }
        ]
    },
    // CAT NON-VEG
    cat_nonveg_budget: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Boiled Fish', portions: '100g fish', calories: 150, protein: 20, fat: 5 },
            lunch: { meal: 'Chicken Liver', portions: '50g liver', calories: 100, protein: 15, fat: 5 },
            dinner: { meal: 'Chicken Scraps', portions: '100g chicken', calories: 200, protein: 25, fat: 10 }
        })),
        shoppingList: [
            { ingredient: 'Fish (Local)', monthlyQty: '3 kg', estimatedCost: 600 },
            { ingredient: 'Chicken Liver', monthlyQty: '2 kg', estimatedCost: 300 },
            { ingredient: 'Chicken Scraps', monthlyQty: '3 kg', estimatedCost: 400 }
        ]
    },
    cat_nonveg_balanced: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Tuna (Canned)', portions: '1/2 can', calories: 150, protein: 20, fat: 5 },
            lunch: { meal: 'Boiled Chicken Breast', portions: '100g chicken', calories: 150, protein: 25, fat: 2 },
            dinner: { meal: 'Wet Food Pouch', portions: '1 pouch', calories: 100, protein: 10, fat: 5 }
        })),
        shoppingList: [
            { ingredient: 'Tuna Cans', monthlyQty: '10 cans', estimatedCost: 1500 },
            { ingredient: 'Chicken Breast', monthlyQty: '2 kg', estimatedCost: 800 },
            { ingredient: 'Wet Food Pouches', monthlyQty: '15 pouches', estimatedCost: 600 }
        ]
    },
    cat_nonveg_premium: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Imported Salmon', portions: '100g premium salmon', calories: 200, protein: 25, fat: 10 },
            lunch: { meal: 'Gourmet Pate', portions: '1 tin', calories: 150, protein: 15, fat: 8 },
            dinner: { meal: 'Raw Freeze-Dried Treat', portions: '50g', calories: 200, protein: 30, fat: 10 }
        })),
        shoppingList: [
            { ingredient: 'Premium Salmon', monthlyQty: '3 kg', estimatedCost: 3000 },
            { ingredient: 'Gourmet Pate', monthlyQty: '20 tins', estimatedCost: 3000 },
            { ingredient: 'Freeze Dried Treats', monthlyQty: '2 bags', estimatedCost: 2000 }
        ]
    },
    // CAT VEG (Hypothetical, with warnings)
    cat_veg_budget: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Rice & Veg Mash', portions: '100g', calories: 150, protein: 5, fat: 2 },
            lunch: { meal: 'Curd & Bread', portions: '50g curd', calories: 100, protein: 4, fat: 4 },
            dinner: { meal: 'Lentil Soup (Unsalted)', portions: '1/2 cup', calories: 150, protein: 8, fat: 2 }
        })),
        shoppingList: [
            { ingredient: 'Rice', monthlyQty: '2 kg', estimatedCost: 100 },
            { ingredient: 'Vegetables', monthlyQty: '3 kg', estimatedCost: 150 },
            { ingredient: 'Curd', monthlyQty: '2 L', estimatedCost: 150 },
            { ingredient: 'Lentils', monthlyQty: '1 kg', estimatedCost: 150 },
            { ingredient: 'Taurine (Required)', monthlyQty: 'Bottle', estimatedCost: 500 }
        ]
    },
    cat_veg_balanced: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Vegan Cat Kibble', portions: '1/2 cup', calories: 200, protein: 15, fat: 8 },
            lunch: { meal: 'Tofu & Pumpkin', portions: '50g tofu', calories: 150, protein: 10, fat: 5 },
            dinner: { meal: 'Supplemented Veg Mix', portions: '100g', calories: 150, protein: 10, fat: 5 }
        })),
        shoppingList: [
            { ingredient: 'Vegan Cat Kibble', monthlyQty: '2 kg', estimatedCost: 1500 },
            { ingredient: 'Tofu', monthlyQty: '2 kg', estimatedCost: 400 },
            { ingredient: 'Pumpkin', monthlyQty: '2 kg', estimatedCost: 100 },
            { ingredient: 'Essential Supplements', monthlyQty: 'Pack', estimatedCost: 800 }
        ]
    },
    cat_veg_premium: {
        days: Array(7).fill(null).map((_, i) => ({
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
            breakfast: { meal: 'Imported Vegan Kibble', portions: '1/2 cup', calories: 200, protein: 18, fat: 10 },
            lunch: { meal: 'Gourmet Plant-Based Wet Food', portions: '1 pouch', calories: 150, protein: 12, fat: 5 },
            dinner: { meal: 'Synth-Meat Treat', portions: '50g', calories: 200, protein: 20, fat: 8 }
        })),
        shoppingList: [
            { ingredient: 'Imported Vegan Food', monthlyQty: '3 kg', estimatedCost: 3500 },
            { ingredient: 'Gourmet Pouches', monthlyQty: '15 packs', estimatedCost: 2500 },
            { ingredient: 'Premium Supplements', monthlyQty: 'Kit', estimatedCost: 2000 }
        ]
    }
};
