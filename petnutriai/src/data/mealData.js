export const getMealPlanKey = (petType, dietType, budgetTier) => {
    return `${petType}_${dietType}_${budgetTier}`;
};

export const mealPlansData = {
    // DOG NON-VEG
    dog_nonveg_budget: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Boiled Eggs & Rice', portions: '2 eggs + 100g rice', calories: 350, protein: 18, fat: 12 }, lunch: { meal: 'Chicken Liver & Curd', portions: '150g liver + 50g curd', calories: 400, protein: 30, fat: 10 }, dinner: { meal: 'Chicken Parts & Pumpkin', portions: '200g parts + 100g pumpkin', calories: 450, protein: 35, fat: 15 } },
            { day: 'Tuesday', breakfast: { meal: 'Oats & Curd', portions: '100g oats + 100g curd', calories: 300, protein: 12, fat: 5 }, lunch: { meal: 'Fish Scraps & Rice', portions: '150g fish + 100g rice', calories: 400, protein: 25, fat: 10 }, dinner: { meal: 'Chicken Neck & Sweet Potato', portions: '200g necks + 100g potato', calories: 500, protein: 30, fat: 18 } },
            { day: 'Wednesday', breakfast: { meal: 'Boiled Eggs & Toast', portions: '2 eggs + 2 slices', calories: 350, protein: 14, fat: 10 }, lunch: { meal: 'Chicken Gizzards & Rice', portions: '150g gizzards + 100g rice', calories: 400, protein: 32, fat: 8 }, dinner: { meal: 'Beef Trimmings & Carrots', portions: '150g beef + 100g carrots', calories: 450, protein: 30, fat: 20 } },
            { day: 'Thursday', breakfast: { meal: 'Rice & Milk (Diluted)', portions: '150g rice + 100ml milk', calories: 300, protein: 8, fat: 5 }, lunch: { meal: 'Liver & Spinach Mix', portions: '150g liver + spinach', calories: 350, protein: 30, fat: 8 }, dinner: { meal: 'Chicken Feet Bone Broth', portions: 'Large bowl + rice', calories: 400, protein: 20, fat: 15 } },
            { day: 'Friday', breakfast: { meal: 'Scrambled Eggs (No Salt)', portions: '2 eggs', calories: 200, protein: 12, fat: 10 }, lunch: { meal: 'Sardines (Canned/Fresh)', portions: '100g sardines', calories: 300, protein: 20, fat: 15 }, dinner: { meal: 'Chicken & Peas Stew', portions: '200g chicken mix', calories: 500, protein: 35, fat: 15 } },
            { day: 'Saturday', breakfast: { meal: 'Oatmeal & Banana', portions: '1 bowl', calories: 300, protein: 8, fat: 4 }, lunch: { meal: 'Beef Heart & Rice', portions: '150g heart + 100g rice', calories: 400, protein: 28, fat: 12 }, dinner: { meal: 'Chicken Liver & Pumpkin', portions: '150g liver + 100g pumpkin', calories: 400, protein: 30, fat: 10 } },
            { day: 'Sunday', breakfast: { meal: 'Boiled Eggs & Curd', portions: '2 eggs + 50g curd', calories: 350, protein: 15, fat: 12 }, lunch: { meal: 'Mixed Meat Scraps', portions: '200g mix', calories: 450, protein: 30, fat: 20 }, dinner: { meal: 'Special Sunday Chicken', portions: '250g meat + rice', calories: 600, protein: 40, fat: 20 } }
        ],
        shoppingList: [
            { ingredient: 'Chicken Mix (Liver/Gizzards)', monthlyQty: '6 kg', estimatedCost: 1000 },
            { ingredient: 'Rice', monthlyQty: '5 kg', estimatedCost: 300 },
            { ingredient: 'Eggs', monthlyQty: '90 units', estimatedCost: 600 },
            { ingredient: 'Seasonal Veg (Pumpkin/Spinach)', monthlyQty: '4 kg', estimatedCost: 200 },
            { ingredient: 'Curd', monthlyQty: '3 kg', estimatedCost: 200 }
        ]
    },
    dog_nonveg_balanced: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Chicken Breast & Oats', portions: '150g chicken + 50g oats', calories: 400, protein: 40, fat: 5 }, lunch: { meal: 'Sardines & Rice', portions: '100g fish + 100g rice', calories: 450, protein: 25, fat: 15 }, dinner: { meal: 'Lean Beef & Sweet Potato', portions: '150g beef + 100g potato', calories: 500, protein: 35, fat: 18 } },
            { day: 'Tuesday', breakfast: { meal: 'Turkey Mince & Apple', portions: '150g turkey + slices', calories: 400, protein: 35, fat: 10 }, lunch: { meal: 'Boiled Eggs & Quinoa', portions: '2 eggs + 50g quinoa', calories: 350, protein: 20, fat: 12 }, dinner: { meal: 'Lamb & Green Beans', portions: '150g lamb + beans', calories: 550, protein: 30, fat: 25 } },
            { day: 'Wednesday', breakfast: { meal: 'Salmon & Spinach', portions: '100g salmon + leaves', calories: 350, protein: 25, fat: 15 }, lunch: { meal: 'Chicken Liver & Pumpkin', portions: '100g liver + 100g veg', calories: 300, protein: 25, fat: 8 }, dinner: { meal: 'Duck & Rice', portions: '150g duck mix', calories: 500, protein: 30, fat: 20 } },
            { day: 'Thursday', breakfast: { meal: 'Cottage Cheese & Berries', portions: '100g cheese + mix', calories: 300, protein: 15, fat: 10 }, lunch: { meal: 'Tuna & Sweet Potato', portions: '100g tuna + potato', calories: 350, protein: 25, fat: 5 }, dinner: { meal: 'Chicken & Carrots', portions: '200g chicken breast', calories: 450, protein: 45, fat: 8 } },
            { day: 'Friday', breakfast: { meal: 'Scrambled Eggs & Veg', portions: '3 eggs + peas', calories: 350, protein: 20, fat: 15 }, lunch: { meal: 'Pork (Lean) & Rice', portions: '150g pork + rice', calories: 500, protein: 30, fat: 20 }, dinner: { meal: 'Fish (White) & Broccoli', portions: '200g fish + veg', calories: 400, protein: 35, fat: 5 } },
            { day: 'Saturday', breakfast: { meal: 'Turkey Neck (Raw/Boiled)', portions: '1 large neck', calories: 400, protein: 30, fat: 15 }, lunch: { meal: 'Beef Liver & Curd', portions: '100g liver + curd', calories: 350, protein: 25, fat: 10 }, dinner: { meal: 'Chicken & Zucchini', portions: '150g chicken + veg', calories: 400, protein: 35, fat: 10 } },
            { day: 'Sunday', breakfast: { meal: 'Salmon Oil & Eggs', portions: '2 eggs + 1tsp oil', calories: 300, protein: 14, fat: 15 }, lunch: { meal: 'Lamb Heart & Rice', portions: '150g heart + rice', calories: 450, protein: 30, fat: 15 }, dinner: { meal: 'Roast Chicken (No Bone)', portions: '200g meat', calories: 500, protein: 40, fat: 15 } }
        ],
        shoppingList: [
            { ingredient: 'Chicken Breast', monthlyQty: '4 kg', estimatedCost: 1200 },
            { ingredient: 'Fish (Sardines/Salmon)', monthlyQty: '3 kg', estimatedCost: 1000 },
            { ingredient: 'Lean Red Meat', monthlyQty: '3 kg', estimatedCost: 1500 },
            { ingredient: 'Oats/Quinoa', monthlyQty: '2 kg', estimatedCost: 400 },
            { ingredient: 'Variety Veg', monthlyQty: '5 kg', estimatedCost: 500 }
        ]
    },
    dog_nonveg_premium: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Wild Salmon & Quinoa', portions: '150g salmon', calories: 450, protein: 35, fat: 20 }, lunch: { meal: 'Rabbit & Blueberry', portions: '100g rabbit', calories: 400, protein: 30, fat: 10 }, dinner: { meal: 'Venison Steak & Sweet Potato', portions: '150g venison', calories: 500, protein: 40, fat: 15 } },
            { day: 'Tuesday', breakfast: { meal: 'Duck Egg & Asparagus', portions: '2 eggs', calories: 350, protein: 20, fat: 15 }, lunch: { meal: 'Kangaroo & Pumpkin', portions: '150g meal', calories: 450, protein: 35, fat: 5 }, dinner: { meal: 'Lamb Shank & Mint', portions: '200g lamb', calories: 600, protein: 35, fat: 30 } },
            { day: 'Wednesday', breakfast: { meal: 'Mackerel & Spinach', portions: '150g fish', calories: 400, protein: 30, fat: 20 }, lunch: { meal: 'Turkey & Cranberry', portions: '150g turkey', calories: 400, protein: 35, fat: 10 }, dinner: { meal: 'Angus Beef & Kale', portions: '200g beef', calories: 550, protein: 40, fat: 25 } },
            { day: 'Thursday', breakfast: { meal: 'Goat Milk & Berries', portions: '1 cup milk', calories: 250, protein: 10, fat: 10 }, lunch: { meal: 'Pheasant & Squash', portions: '150g bird', calories: 400, protein: 35, fat: 10 }, dinner: { meal: 'Bison & Carrot Puree', portions: '200g bison', calories: 500, protein: 45, fat: 15 } },
            { day: 'Friday', breakfast: { meal: 'Sardines in Spring Water', portions: '1 tin', calories: 300, protein: 25, fat: 15 }, lunch: { meal: 'Quail & Zucchini', portions: '1 whole quail', calories: 400, protein: 30, fat: 15 }, dinner: { meal: 'Wild Boar & Apple', portions: '200g boar', calories: 550, protein: 40, fat: 20 } },
            { day: 'Saturday', breakfast: { meal: 'Ostrich & Chia Seeds', portions: '150g meat', calories: 400, protein: 35, fat: 10 }, lunch: { meal: 'Premium Raw Topper', portions: '100g topper', calories: 350, protein: 25, fat: 15 }, dinner: { meal: 'Salmon & Sweet Potato', portions: '200g salmon', calories: 500, protein: 35, fat: 25 } },
            { day: 'Sunday', breakfast: { meal: 'Gourmet Sunday Roast', portions: 'Duck breast', calories: 500, protein: 30, fat: 25 }, lunch: { meal: 'Bone Broth Jelly', portions: '1 cup', calories: 100, protein: 10, fat: 0 }, dinner: { meal: 'Steak Tartare (Dog Safe)', portions: '200g steak', calories: 600, protein: 45, fat: 30 } }
        ],
        shoppingList: [
            { ingredient: 'Premium Game Meats', monthlyQty: '5 kg', estimatedCost: 8000 },
            { ingredient: 'Wild Caught Fish', monthlyQty: '3 kg', estimatedCost: 4000 },
            { ingredient: 'Exotic Proteins (Duck/Rabbit)', monthlyQty: '3 kg', estimatedCost: 5000 },
            { ingredient: 'Organic Produce', monthlyQty: 'Box', estimatedCost: 2000 },
            { ingredient: 'Superfood Supplements', monthlyQty: 'Kit', estimatedCost: 3000 }
        ]
    },
    // DOG VEG
    dog_veg_budget: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Paneer & Rice', portions: '100g paneer + 100g rice', calories: 400, protein: 20, fat: 20 }, lunch: { meal: 'Soya Chunks & Curd', portions: '50g soya + 100g curd', calories: 350, protein: 25, fat: 5 }, dinner: { meal: 'Lentils (Dal) & Roti', portions: '1 cup dal + 2 rotis', calories: 450, protein: 15, fat: 5 } },
            { day: 'Tuesday', breakfast: { meal: 'Oatmeal & Milk', portions: '1 bowl', calories: 350, protein: 10, fat: 8 }, lunch: { meal: 'Chickpeas & Rice', portions: '1 cup chickpeas', calories: 400, protein: 15, fat: 5 }, dinner: { meal: 'Mixed Veg Stew & Bread', portions: 'Large bowl', calories: 300, protein: 10, fat: 5 } },
            { day: 'Wednesday', breakfast: { meal: 'Scrambled Tofu', portions: '150g tofu', calories: 300, protein: 18, fat: 10 }, lunch: { meal: 'Kidney Beans & Rice', portions: '1 cup beans', calories: 450, protein: 20, fat: 5 }, dinner: { meal: 'Paneer & Pumpkin', portions: '100g paneer', calories: 400, protein: 20, fat: 20 } },
            { day: 'Thursday', breakfast: { meal: 'Yogurt & Rice', portions: '200g yogurt', calories: 300, protein: 10, fat: 8 }, lunch: { meal: 'Soya Granules & Veg', portions: '1 cup soya', calories: 350, protein: 25, fat: 5 }, dinner: { meal: 'Mung Bean Dal & Roti', portions: '1 cup dal', calories: 400, protein: 15, fat: 5 } },
            { day: 'Friday', breakfast: { meal: 'Cheese Slice & Toast', portions: '2 slices', calories: 250, protein: 8, fat: 15 }, lunch: { meal: 'Lentil Soup & Rice', portions: '1 large bowl', calories: 400, protein: 15, fat: 5 }, dinner: { meal: 'Peas & Potato Mash', portions: '1 cup peas', calories: 350, protein: 12, fat: 5 } },
            { day: 'Saturday', breakfast: { meal: 'Milk & Bread', portions: '1 bowl', calories: 300, protein: 10, fat: 5 }, lunch: { meal: 'Paneer Bhurji (No Spice)', portions: '150g paneer', calories: 450, protein: 25, fat: 25 }, dinner: { meal: 'Soya Chunks & Pumpkin', portions: '100g soya', calories: 400, protein: 25, fat: 5 } },
            { day: 'Sunday', breakfast: { meal: 'Special Curd Rice', portions: 'Large bowl', calories: 400, protein: 12, fat: 10 }, lunch: { meal: 'Mixed Bean Salad', portions: '1 bowl', calories: 350, protein: 20, fat: 5 }, dinner: { meal: 'Paneer & Sweet Potato', portions: '150g paneer', calories: 500, protein: 25, fat: 20 } }
        ],
        shoppingList: [
            { ingredient: 'Paneer/Tofu', monthlyQty: '4 kg', estimatedCost: 1600 },
            { ingredient: 'Soya Chunks', monthlyQty: '3 kg', estimatedCost: 400 },
            { ingredient: 'Lentils/Beans', monthlyQty: '4 kg', estimatedCost: 500 },
            { ingredient: 'Rice/Atta', monthlyQty: '6 kg', estimatedCost: 400 },
            { ingredient: 'Curd/Milk', monthlyQty: '6 L', estimatedCost: 400 }
        ]
    },
    dog_veg_balanced: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Tofu & Sweet Potato', portions: '150g tofu', calories: 400, protein: 25, fat: 10 }, lunch: { meal: 'Chickpeas & Spinach', portions: '1 cup chickpeas', calories: 350, protein: 15, fat: 5 }, dinner: { meal: 'Greek Yogurt & Flax', portions: '200g yogurt', calories: 300, protein: 20, fat: 10 } },
            { day: 'Tuesday', breakfast: { meal: 'Quinoa & Peas', portions: '1 cup quinoa', calories: 350, protein: 12, fat: 5 }, lunch: { meal: 'Lentil Stew & Carrots', portions: '1 bowl', calories: 300, protein: 15, fat: 2 }, dinner: { meal: 'Cottage Cheese & Beans', portions: '150g cheese', calories: 400, protein: 20, fat: 15 } },
            { day: 'Wednesday', breakfast: { meal: 'Oats & Almond Milk', portions: '1 cup', calories: 350, protein: 10, fat: 8 }, lunch: { meal: 'Edamame & Rice', portions: '1 cup edamame', calories: 400, protein: 18, fat: 10 }, dinner: { meal: 'Tempeh & Pumpkin', portions: '100g tempeh', calories: 450, protein: 20, fat: 15 } },
            { day: 'Thursday', breakfast: { meal: 'Scrambled Tofu', portions: '150g tofu', calories: 300, protein: 18, fat: 10 }, lunch: { meal: 'Black Beans & Corn', portions: '1 cup mix', calories: 350, protein: 15, fat: 5 }, dinner: { meal: 'Veggie Omelet (Chickpea Flour)', portions: '2 pancakes', calories: 400, protein: 15, fat: 8 } },
            { day: 'Friday', breakfast: { meal: 'Smoothie (Spinach/Banana)', portions: '1 glass', calories: 200, protein: 5, fat: 2 }, lunch: { meal: 'Seitan (Wheat Meat) & Veg', portions: '100g seitan', calories: 450, protein: 30, fat: 5 }, dinner: { meal: 'Brown Rice & Lentils', portions: '1 bowl', calories: 400, protein: 15, fat: 5 } },
            { day: 'Saturday', breakfast: { meal: 'Peanut Butter & Apple', portions: '2 spoon PB', calories: 300, protein: 10, fat: 20 }, lunch: { meal: 'Soya & Green Beans', portions: '1 cup soya', calories: 400, protein: 25, fat: 5 }, dinner: { meal: 'Sweet Potato & Curd', portions: '1 large potato', calories: 350, protein: 10, fat: 5 } },
            { day: 'Sunday', breakfast: { meal: 'Pancakes (Oat/Banana)', portions: '2 cakes', calories: 350, protein: 8, fat: 10 }, lunch: { meal: 'Sunday Veg Roast', portions: 'Root veg mix', calories: 400, protein: 10, fat: 15 }, dinner: { meal: 'Warm Milk & Biscuits', portions: '1 cup', calories: 250, protein: 8, fat: 8 } }
        ],
        shoppingList: [
            { ingredient: 'Tofu/Tempeh', monthlyQty: '5 kg', estimatedCost: 2000 },
            { ingredient: 'Variety Beans', monthlyQty: '4 kg', estimatedCost: 600 },
            { ingredient: 'Greek Yogurt', monthlyQty: '3 kg', estimatedCost: 900 },
            { ingredient: 'Quinoa/Brown Rice', monthlyQty: '3 kg', estimatedCost: 600 },
            { ingredient: 'Supplements (Flax/Chia)', monthlyQty: 'Pack', estimatedCost: 500 }
        ]
    },
    dog_veg_premium: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Imported Veg Kibble', portions: '1 cup', calories: 400, protein: 25, fat: 15 }, lunch: { meal: 'Gourmet Veg Loaf', portions: '1 pack', calories: 350, protein: 20, fat: 10 }, dinner: { meal: 'Quinoa & Veg Stew', portions: '1 bowl', calories: 350, protein: 15, fat: 5 } },
            { day: 'Tuesday', breakfast: { meal: 'Hemp Seed Porridge', portions: '1 cup', calories: 400, protein: 18, fat: 15 }, lunch: { meal: 'Vegan Sausage (Pet Safe)', portions: '2 links', calories: 450, protein: 25, fat: 20 }, dinner: { meal: 'Sweet Potato Gnocchi', portions: '1 bowl', calories: 400, protein: 10, fat: 5 } },
            { day: 'Wednesday', breakfast: { meal: 'Blueberry & Coconut Bowl', portions: '1 bowl', calories: 300, protein: 5, fat: 15 }, lunch: { meal: 'Lentil Pasta & Sauce', portions: '1 cup', calories: 400, protein: 15, fat: 5 }, dinner: { meal: 'Grilled Portobello & Tofu', portions: '2 caps', calories: 350, protein: 20, fat: 10 } },
            { day: 'Thursday', breakfast: { meal: 'Premium Kibble Topper', portions: '1/2 cup', calories: 350, protein: 20, fat: 15 }, lunch: { meal: 'Amaranth & Squash', portions: '1 cup', calories: 400, protein: 15, fat: 5 }, dinner: { meal: 'Pea Protein Shake', portions: '1 bottle', calories: 300, protein: 25, fat: 5 } },
            { day: 'Friday', breakfast: { meal: 'Avocado (Flesh Only) Toast', portions: '1 slice', calories: 300, protein: 5, fat: 20 }, lunch: { meal: 'Vegan Burger Patty', portions: '1 patty', calories: 450, protein: 25, fat: 18 }, dinner: { meal: 'Wild Rice & Kale', portions: '1 bowl', calories: 350, protein: 12, fat: 5 } },
            { day: 'Saturday', breakfast: { meal: 'Chia Seed Pudding', portions: '1 cup', calories: 300, protein: 10, fat: 15 }, lunch: { meal: 'Gourmet Wet Food', portions: '1 tin', calories: 350, protein: 20, fat: 10 }, dinner: { meal: 'Roasted Root Medley', portions: '1 tray', calories: 400, protein: 10, fat: 10 } },
            { day: 'Sunday', breakfast: { meal: 'Vegan Waffles', portions: '2 waffles', calories: 400, protein: 8, fat: 12 }, lunch: { meal: 'Fake Meat Roast', portions: '200g slice', calories: 500, protein: 30, fat: 20 }, dinner: { meal: 'Coconut Ice Cream (Dog)', portions: '1 scoop', calories: 250, protein: 5, fat: 15 } }
        ],
        shoppingList: [
            { ingredient: 'Gourmet Veg Food', monthlyQty: '20 packs', estimatedCost: 6000 },
            { ingredient: 'Imported Kibble', monthlyQty: '4 kg', estimatedCost: 3500 },
            { ingredient: 'Ancient Grains', monthlyQty: '3 kg', estimatedCost: 1000 },
            { ingredient: 'Organic Produce', monthlyQty: 'Box', estimatedCost: 2000 },
            { ingredient: 'Vegan Supplements', monthlyQty: 'Kit', estimatedCost: 2000 }
        ]
    },
    // CAT NON-VEG
    cat_nonveg_budget: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Boiled Fish', portions: '100g fish', calories: 150, protein: 20, fat: 5 }, lunch: { meal: 'Chicken Liver', portions: '50g liver', calories: 100, protein: 15, fat: 5 }, dinner: { meal: 'Chicken Scraps', portions: '100g chicken', calories: 200, protein: 25, fat: 10 } },
            { day: 'Tuesday', breakfast: { meal: 'Boiled Egg Yolk', portions: '2 yolks', calories: 120, protein: 6, fat: 10 }, lunch: { meal: 'Fish Head/Tail', portions: '1 part', calories: 150, protein: 15, fat: 8 }, dinner: { meal: 'Chicken Neck (Raw)', portions: '1 neck', calories: 180, protein: 15, fat: 10 } },
            { day: 'Wednesday', breakfast: { meal: 'Sardine (Local)', portions: '2 fish', calories: 150, protein: 20, fat: 8 }, lunch: { meal: 'Chicken Gizzards', portions: '50g gizzards', calories: 100, protein: 18, fat: 2 }, dinner: { meal: 'Boiled Chicken', portions: '100g meat', calories: 150, protein: 25, fat: 5 } },
            { day: 'Thursday', breakfast: { meal: 'Milk (Lactose Free)', portions: '1/2 cup', calories: 100, protein: 5, fat: 5 }, lunch: { meal: 'Egg & Rice Mix', portions: '1 egg + rice', calories: 150, protein: 10, fat: 5 }, dinner: { meal: 'Fish Scraps', portions: '100g', calories: 150, protein: 18, fat: 8 } },
            { day: 'Friday', breakfast: { meal: 'Chicken Liver', portions: '50g liver', calories: 100, protein: 15, fat: 5 }, lunch: { meal: 'Chicken Heart', portions: '3 hearts', calories: 100, protein: 15, fat: 5 }, dinner: { meal: 'Mackerel Slice', portions: '1 slice', calories: 150, protein: 20, fat: 10 } },
            { day: 'Saturday', breakfast: { meal: 'Boiled Egg', portions: '1 egg', calories: 80, protein: 6, fat: 5 }, lunch: { meal: 'Chicken Cartilage', portions: '50g', calories: 100, protein: 10, fat: 5 }, dinner: { meal: 'Fish Broth & Meat', portions: '1 bowl', calories: 150, protein: 15, fat: 5 } },
            { day: 'Sunday', breakfast: { meal: 'Chicken Wing Tip', portions: '2 tips', calories: 120, protein: 10, fat: 8 }, lunch: { meal: 'Mixed Organ Meat', portions: '50g', calories: 100, protein: 15, fat: 5 }, dinner: { meal: 'Treat Meal (Fish)', portions: '100g fish', calories: 150, protein: 20, fat: 5 } }
        ],
        shoppingList: [
            { ingredient: 'Fish (Local)', monthlyQty: '4 kg', estimatedCost: 800 },
            { ingredient: 'Chicken Offal (Liver/Heart)', monthlyQty: '3 kg', estimatedCost: 400 },
            { ingredient: 'Chicken Parts/Scraps', monthlyQty: '4 kg', estimatedCost: 500 },
            { ingredient: 'Eggs', monthlyQty: '30 units', estimatedCost: 200 }
        ]
    },
    cat_nonveg_balanced: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Tuna (Canned)', portions: '1/2 can', calories: 150, protein: 20, fat: 5 }, lunch: { meal: 'Boiled Chicken Breast', portions: '100g chicken', calories: 150, protein: 25, fat: 2 }, dinner: { meal: 'Wet Food Pouch', portions: '1 pouch', calories: 100, protein: 10, fat: 5 } },
            { day: 'Tuesday', breakfast: { meal: 'Salmon & Pumpkin', portions: '100g fish', calories: 180, protein: 22, fat: 10 }, lunch: { meal: 'Turkey Mince', portions: '50g turkey', calories: 120, protein: 15, fat: 5 }, dinner: { meal: 'Chicken Liver Treat', portions: '30g liver', calories: 60, protein: 8, fat: 2 } },
            { day: 'Wednesday', breakfast: { meal: 'Scrambled Egg', portions: '1 egg', calories: 80, protein: 6, fat: 5 }, lunch: { meal: 'Beef Mince (Lean)', portions: '50g beef', calories: 120, protein: 15, fat: 6 }, dinner: { meal: 'Sardines in Water', portions: '2 fish', calories: 150, protein: 18, fat: 8 } },
            { day: 'Thursday', breakfast: { meal: 'Chicken Hearts', portions: '5 hearts', calories: 100, protein: 15, fat: 5 }, lunch: { meal: 'Wet Food Paté', portions: '1/2 tin', calories: 120, protein: 12, fat: 6 }, dinner: { meal: 'Duck Breast Slice', portions: '50g duck', calories: 140, protein: 15, fat: 8 } },
            { day: 'Friday', breakfast: { meal: 'White Fish (Boiled)', portions: '100g fish', calories: 120, protein: 20, fat: 2 }, lunch: { meal: 'Quail Egg', portions: '2 eggs', calories: 60, protein: 5, fat: 4 }, dinner: { meal: 'Rabbit Mince', portions: '50g rabbit', calories: 100, protein: 15, fat: 3 } },
            { day: 'Saturday', breakfast: { meal: 'Chicken Wing (Raw)', portions: '1 wing', calories: 150, protein: 15, fat: 10 }, lunch: { meal: 'Bone Broth Ice Cube', portions: '1 cube', calories: 20, protein: 2, fat: 0 }, dinner: { meal: 'Lamb Kidney', portions: '30g kidney', calories: 50, protein: 8, fat: 1 } },
            { day: 'Sunday', breakfast: { meal: 'Sunday Salmon', portions: '100g fillet', calories: 200, protein: 25, fat: 12 }, lunch: { meal: 'Chicken Gizzards', portions: '50g', calories: 80, protein: 12, fat: 1 }, dinner: { meal: 'Shrimp Treat', portions: '3 shrimp', calories: 50, protein: 10, fat: 0 } }
        ],
        shoppingList: [
            { ingredient: 'Tuna/Fish Cans', monthlyQty: '15 cans', estimatedCost: 2000 },
            { ingredient: 'Chicken Breast', monthlyQty: '3 kg', estimatedCost: 1200 },
            { ingredient: 'Wet Food Pouches', monthlyQty: '20 pouches', estimatedCost: 800 },
            { ingredient: 'Variety Meats (Beef/Turkey)', monthlyQty: '2 kg', estimatedCost: 1000 }
        ]
    },
    cat_nonveg_premium: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Imported Salmon', portions: '100g premium', calories: 200, protein: 25, fat: 10 }, lunch: { meal: 'Gourmet Pate', portions: '1 tin', calories: 150, protein: 15, fat: 8 }, dinner: { meal: 'Freeze-Dried Treat', portions: '50g', calories: 200, protein: 30, fat: 10 } },
            { day: 'Tuesday', breakfast: { meal: 'Rabbit & Blueberry', portions: '1 pouch', calories: 180, protein: 20, fat: 8 }, lunch: { meal: 'Venison Jerky', portions: '1 strip', calories: 50, protein: 8, fat: 1 }, dinner: { meal: 'Quail (Whole Ground)', portions: '100g', calories: 200, protein: 25, fat: 10 } },
            { day: 'Wednesday', breakfast: { meal: 'Tuna Carpaccio', portions: '100g tuna', calories: 150, protein: 25, fat: 5 }, lunch: { meal: 'Duck Mousse', portions: '1 tin', calories: 180, protein: 15, fat: 12 }, dinner: { meal: 'Lamb Lung Treat', portions: '30g', calories: 100, protein: 15, fat: 3 } },
            { day: 'Thursday', breakfast: { meal: 'Wild Boar Stew', portions: '1 pouch', calories: 200, protein: 25, fat: 10 }, lunch: { meal: 'Goat Milk Yogurt', portions: '2 tbsp', calories: 40, protein: 2, fat: 2 }, dinner: { meal: 'Pheasant Breast', portions: '50g', calories: 100, protein: 20, fat: 2 } },
            { day: 'Friday', breakfast: { meal: 'Lobster & Crab', portions: '1/2 tin', calories: 150, protein: 20, fat: 5 }, lunch: { meal: 'Ostrich Chew', portions: '1 chew', calories: 80, protein: 15, fat: 1 }, dinner: { meal: 'Kangaroo Mince', portions: '100g', calories: 180, protein: 30, fat: 2 } },
            { day: 'Saturday', breakfast: { meal: 'Salmon Sashimi', portions: '50g raw', calories: 100, protein: 15, fat: 8 }, lunch: { meal: 'Caviar (Fish Roe)', portions: '1 tsp', calories: 40, protein: 5, fat: 3 }, dinner: { meal: 'Duck Heart', portions: '3 hearts', calories: 80, protein: 12, fat: 4 } },
            { day: 'Sunday', breakfast: { meal: 'Wagyu Beef Slice', portions: '50g', calories: 150, protein: 10, fat: 12 }, lunch: { meal: 'Bone Broth Jelly', portions: '1 cube', calories: 20, protein: 2, fat: 0 }, dinner: { meal: 'Whole Prey (Mouse/Chick)', portions: '1 item', calories: 100, protein: 15, fat: 5 } }
        ],
        shoppingList: [
            { ingredient: 'Premium Salmon/Tuna', monthlyQty: '4 kg', estimatedCost: 5000 },
            { ingredient: 'Gourmet Tins/Pouches', monthlyQty: '30 units', estimatedCost: 6000 },
            { ingredient: 'Exotic Treats (Freeze-Dried)', monthlyQty: '5 bags', estimatedCost: 4000 },
            { ingredient: 'Raw Food Subscription', monthlyQty: 'Month', estimatedCost: 5000 }
        ]
    },
    // CAT VEG (Hypothetical, with warnings)
    cat_veg_budget: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Rice & Veg Mash', portions: '100g', calories: 150, protein: 5, fat: 2 }, lunch: { meal: 'Curd & Bread', portions: '50g curd', calories: 100, protein: 4, fat: 4 }, dinner: { meal: 'Lentil Soup (Unsalted)', portions: '1/2 cup', calories: 150, protein: 8, fat: 2 } },
            { day: 'Tuesday', breakfast: { meal: 'Oats & Milk', portions: '1/2 cup', calories: 150, protein: 5, fat: 4 }, lunch: { meal: 'Soya & Rice', portions: '50g soya', calories: 120, protein: 10, fat: 2 }, dinner: { meal: 'Pumpkin Puree', portions: '1/2 cup', calories: 80, protein: 2, fat: 0 } },
            { day: 'Wednesday', breakfast: { meal: 'Bread & Milk', portions: '1 slice', calories: 120, protein: 4, fat: 3 }, lunch: { meal: 'Mashed Potato', portions: '1 potato', calories: 100, protein: 2, fat: 0 }, dinner: { meal: 'Veggie Broth', portions: '1 cup', calories: 50, protein: 1, fat: 0 } },
            { day: 'Thursday', breakfast: { meal: 'Rice & Peas', portions: '1 cup', calories: 150, protein: 5, fat: 1 }, lunch: { meal: 'Yogurt Dip', portions: '2 tbsp', calories: 40, protein: 2, fat: 2 }, dinner: { meal: 'Carrot Stew', portions: '1 cup', calories: 80, protein: 1, fat: 0 } },
            { day: 'Friday', breakfast: { meal: 'Boiled Pasta', portions: '1/2 cup', calories: 150, protein: 5, fat: 1 }, lunch: { meal: 'Cheese Bit', portions: '1 cube', calories: 60, protein: 3, fat: 5 }, dinner: { meal: 'Green Beans', portions: '1/2 cup', calories: 40, protein: 2, fat: 0 } },
            { day: 'Saturday', breakfast: { meal: 'Rice & Lentils', portions: '1 cup', calories: 180, protein: 8, fat: 2 }, lunch: { meal: 'Tofu Bit', portions: '30g', calories: 40, protein: 4, fat: 2 }, dinner: { meal: 'Sweet Potato', portions: '1/2 potato', calories: 80, protein: 1, fat: 0 } },
            { day: 'Sunday', breakfast: { meal: 'Special Curd Rice', portions: '1 cup', calories: 200, protein: 6, fat: 5 }, lunch: { meal: 'Veggie Treat', portions: '1 biscuit', calories: 30, protein: 1, fat: 1 }, dinner: { meal: 'Warm Milk', portions: '1/2 cup', calories: 80, protein: 4, fat: 4 } }
        ],
        shoppingList: [
            { ingredient: 'Rice', monthlyQty: '3 kg', estimatedCost: 200 },
            { ingredient: 'Vegetables', monthlyQty: '4 kg', estimatedCost: 200 },
            { ingredient: 'Curd/Milk', monthlyQty: '3 L', estimatedCost: 300 },
            { ingredient: 'Lentils', monthlyQty: '1 kg', estimatedCost: 150 },
            { ingredient: 'Taurine (Required)', monthlyQty: 'Bottle', estimatedCost: 500 }
        ]
    },
    cat_veg_balanced: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Vegan Cat Kibble', portions: '1/2 cup', calories: 200, protein: 15, fat: 8 }, lunch: { meal: 'Tofu & Pumpkin', portions: '50g tofu', calories: 150, protein: 10, fat: 5 }, dinner: { meal: 'Supplemented Veg Mix', portions: '100g', calories: 150, protein: 10, fat: 5 } },
            { day: 'Tuesday', breakfast: { meal: 'Chickpea Stew (Safe Prep)', portions: '1/2 cup', calories: 180, protein: 12, fat: 4 }, lunch: { meal: 'Nutritional Yeast Sprinkle', portions: '1 tsp', calories: 20, protein: 3, fat: 0 }, dinner: { meal: 'Quinoa Bowl', portions: '1/2 cup', calories: 150, protein: 6, fat: 2 } },
            { day: 'Wednesday', breakfast: { meal: 'Seitan Bits', portions: '50g', calories: 150, protein: 20, fat: 1 }, lunch: { meal: 'Avocado Oil Drizzle', portions: '1 tsp', calories: 40, protein: 0, fat: 5 }, dinner: { meal: 'Lentil Puree', portions: '1/2 cup', calories: 120, protein: 8, fat: 1 } },
            { day: 'Thursday', breakfast: { meal: 'Vegan Kibble', portions: '1/2 cup', calories: 200, protein: 15, fat: 8 }, lunch: { meal: 'Pea Protein Shake', portions: '2 tbsp', calories: 50, protein: 8, fat: 1 }, dinner: { meal: 'Sweet Potato Mash', portions: '1/2 cup', calories: 100, protein: 2, fat: 0 } },
            { day: 'Friday', breakfast: { meal: 'Tempeh Bites', portions: '50g', calories: 160, protein: 15, fat: 8 }, lunch: { meal: 'Hemp Seeds', portions: '1 tsp', calories: 30, protein: 2, fat: 2 }, dinner: { meal: 'Spinach & Tofu', portions: '1/2 cup', calories: 120, protein: 10, fat: 4 } },
            { day: 'Saturday', breakfast: { meal: 'Oat & Pumpkin Porridge', portions: '1/2 cup', calories: 150, protein: 5, fat: 3 }, lunch: { meal: 'Veggie Burger (Pet Safe)', portions: '1/2 patty', calories: 150, protein: 10, fat: 8 }, dinner: { meal: 'Green Bean Snack', portions: '1/4 cup', calories: 20, protein: 1, fat: 0 } },
            { day: 'Sunday', breakfast: { meal: 'Special Sunday Kibble', portions: '1/2 cup', calories: 220, protein: 18, fat: 10 }, lunch: { meal: 'Coconut Oil Treat', portions: '1 tsp', calories: 40, protein: 0, fat: 5 }, dinner: { meal: 'Warm Almond Milk', portions: '1/2 cup', calories: 80, protein: 2, fat: 4 } }
        ],
        shoppingList: [
            { ingredient: 'Vegan Cat Kibble', monthlyQty: '3 kg', estimatedCost: 2000 },
            { ingredient: 'Tofu/Tempeh', monthlyQty: '3 kg', estimatedCost: 600 },
            { ingredient: 'Pumpkin/Veg', monthlyQty: '3 kg', estimatedCost: 200 },
            { ingredient: 'Detailed Supplements', monthlyQty: 'Pack', estimatedCost: 1500 }
        ]
    },
    cat_veg_premium: {
        days: [
            { day: 'Monday', breakfast: { meal: 'Imported Vegan Kibble', portions: '1/2 cup', calories: 200, protein: 18, fat: 10 }, lunch: { meal: 'Gourmet Plant-Based Wet Food', portions: '1 pouch', calories: 150, protein: 12, fat: 5 }, dinner: { meal: 'Synth-Meat Treat', portions: '50g', calories: 200, protein: 20, fat: 8 } },
            { day: 'Tuesday', breakfast: { meal: 'Lab-Grown Mouse (Future)', portions: '1 unit', calories: 200, protein: 25, fat: 10 }, lunch: { meal: 'Algal Oil Supplement', portions: '1 capsule', calories: 20, protein: 0, fat: 2 }, dinner: { meal: 'Fermented Veggies', portions: '1 tbsp', calories: 30, protein: 1, fat: 0 } },
            { day: 'Wednesday', breakfast: { meal: 'Bio-Identical Protein Shake', portions: '1 bottle', calories: 150, protein: 20, fat: 2 }, lunch: { meal: 'Gourmet Vegan Cheese', portions: '1 slice', calories: 80, protein: 5, fat: 6 }, dinner: { meal: 'Spirulina Treat', portions: '1 biscuit', calories: 40, protein: 4, fat: 1 } },
            { day: 'Thursday', breakfast: { meal: 'Luxury Vegan Pate', portions: '1 tin', calories: 180, protein: 14, fat: 8 }, lunch: { meal: 'Chia Gel', portions: '2 tbsp', calories: 50, protein: 3, fat: 3 }, dinner: { meal: 'Insect Protein Bar', portions: '1/2 bar', calories: 100, protein: 12, fat: 4 } },
            { day: 'Friday', breakfast: { meal: 'Imported Kibble', portions: '1/2 cup', calories: 200, protein: 18, fat: 10 }, lunch: { meal: 'Vegan Broth', portions: '1 cup', calories: 50, protein: 2, fat: 0 }, dinner: { meal: 'Textured Veg Protein', portions: '1/2 cup', calories: 120, protein: 15, fat: 1 } },
            { day: 'Saturday', breakfast: { meal: 'Amylase-Enriched Stew', portions: '1 pouch', calories: 160, protein: 10, fat: 5 }, lunch: { meal: 'Nut Butter Treat', portions: '1 tsp', calories: 50, protein: 2, fat: 4 }, dinner: { meal: 'Roasted Pumpkin Seeds', portions: '1 tsp', calories: 30, protein: 2, fat: 2 } },
            { day: 'Sunday', breakfast: { meal: 'Chef Special Vegan Mix', portions: '1 bowl', calories: 250, protein: 20, fat: 12 }, lunch: { meal: 'Coconut Water', portions: '1/2 cup', calories: 30, protein: 0, fat: 0 }, dinner: { meal: 'Warm Vegan Milk', portions: '1/2 cup', calories: 80, protein: 2, fat: 4 } }
        ],
        shoppingList: [
            { ingredient: 'Imported Vegan Food', monthlyQty: '4 kg', estimatedCost: 5000 },
            { ingredient: 'Gourmet Pouches', monthlyQty: '20 packs', estimatedCost: 4000 },
            { ingredient: 'Advanced Supplements', monthlyQty: 'Kit', estimatedCost: 3000 }
        ]
    }
};
