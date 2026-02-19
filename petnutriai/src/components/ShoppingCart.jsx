import { Download, Check, ChevronLeft, RotateCcw, ShoppingBag } from 'lucide-react';
import { getMealPlanKey, mealPlansData } from '../data/mealData';
import { COUNTRY_RULES, getCurrency } from '../data/countryRules';

function exportShoppingList(items, total, budget) {
    const content = `SHOPPING LIST
Budget: Rs. ${budget.amount}
Total: Rs. ${total}

` + items.map(i => `- ${i.ingredient}: ${i.monthlyQty} (Rs. ${i.estimatedCost})`).join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopping-list.txt';
    a.click();
    URL.revokeObjectURL(url);
}

export default function ShoppingCart({ petProfile, budget, generatedPlan, location, onBack, onReset }) {

    // Dynamic Aggregation Logic (only if components exist - i.e. dynamic engine)
    let items = [];

    // Helper to localize items
    const localizeItems = (list) => {
        if (!list) return [];
        return list.map(item => {
            // Check for localization
            // Import getLocalizedIngredient locally or usage logic
            // Since we can't easily import inside a function without top-level, we assume helper available or simple check

            // We need to fetch/import getLocalizedIngredient. It is imported? No.
            // I will add import in next step. For now, logic:

            // Actually, let's just loop and check COUNTRY_RULES if we can, 
            // OR better: The user wants it "replaced".

            // Since we don't have getLocalizedIngredient imported in this file yet, I need to add it.
            // For this specific edit, I will stick to structure.
            return item;
        });
    };

    // Helper to localize a single ingredient name
    const localizeIngredientName = (name) => {
        if (!location || !location.code || !COUNTRY_RULES[location.code]) return name;
        const rules = COUNTRY_RULES[location.code];
        let newName = name;
        for (const banned of rules.restrict) {
            const regex = new RegExp(`\\b${banned}\\b`, 'gi');
            if (regex.test(newName)) {
                const sub = rules.substitutions[banned];
                if (sub) {
                    const replacementName = typeof sub === 'string' ? sub : (sub.replaceWith || sub.name);
                    if (replacementName) {
                        const replacement = replacementName.charAt(0).toUpperCase() + replacementName.slice(1);
                        newName = newName.replace(regex, replacement);
                    }
                }
            }
        }
        return newName;
    };

    if (generatedPlan && generatedPlan.days && generatedPlan.days[0].breakfast.components) {
        const aggregator = {};
        generatedPlan.days.forEach(day => {
            ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
                const meal = day[mealType];
                if (meal && meal.components) {
                    meal.components.forEach(comp => {
                        const finalName = localizeIngredientName(comp.name);
                        if (!aggregator[finalName]) {
                            aggregator[finalName] = { grams: 0, cost: 0 };
                        }
                        aggregator[finalName].grams += comp.grams;
                    });
                }
            });
        });

        // Convert to list
        items = Object.keys(aggregator).map(name => {
            const totalGrams = aggregator[name].grams * 4; // Monthly
            const kg = (totalGrams / 1000).toFixed(1);
            let pricePerKg = 100;
            const n = name.toLowerCase();
            if (n.includes('chicken') || n.includes('fish') || n.includes('meat') || n.includes('egg')) pricePerKg = 300;
            if (n.includes('rice') || n.includes('oats')) pricePerKg = 80;
            if (n.includes('pumpkin') || n.includes('carrot') || n.includes('spinach')) pricePerKg = 60;
            if (n.includes('mutton')) pricePerKg = 800;

            return {
                ingredient: name,
                monthlyQty: `${kg} kg`,
                estimatedCost: Math.round((totalGrams / 1000) * pricePerKg)
            };
        });
    } else {
        // Fallback or static (Use generatedPlan if available as it might contain shoppingList, else legacy)
        // If generatedPlan is passed (from MealPlan), use its shoppingList which might be same as static for now.
        // WE NEED TO LOCALIZE THIS.
        const planKey = getMealPlanKey(petProfile.petType, petProfile.dietType, budget.tier);
        const sourcePlan = generatedPlan || mealPlansData[planKey];
        const rawItems = sourcePlan ? sourcePlan.shoppingList : [];

        // We will Apply Localization in a separate step after importing helper
        items = localizeItems(rawItems);
    }

    const totalCost = items.reduce((sum, item) => sum + item.estimatedCost, 0);

    // Currency Handling
    const { symbol, rate, code } = getCurrency(location?.code);

    const formatPrice = (val) => {
        const converted = Math.round(val * rate);
        return `${symbol}${converted.toLocaleString()}`;
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="card-base p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Monthly Shopping List</h2>
                        <p className="text-gray-500 text-sm">Estimated items for 30 days based on plan.</p>
                    </div>
                </div>

                {items.length > 0 ? (
                    <div className="space-y-3 mb-8">
                        {items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-transparent group-hover:border-indigo-400">
                                        <Check className="w-3 h-3 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-medium text-sm">{item.ingredient}</p>
                                        <p className="text-gray-500 text-xs">{item.monthlyQty}</p>
                                    </div>
                                </div>
                                <div className="text-gray-900 font-semibold text-sm">{formatPrice(item.estimatedCost)}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl mb-8">
                        <p>No shopping list data available for this selection.</p>
                    </div>
                )}

                <div className="bg-gray-900 text-white p-6 rounded-xl flex items-center justify-between mb-8 shadow-lg">
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Estimated Monthly Cost</p>
                        <div className="text-3xl font-bold">{formatPrice(totalCost)}</div>
                        {code !== 'INR' && <div className="text-xs text-gray-400 mt-1">({code})</div>}
                    </div>
                    {budget.amount && (
                        <div className={`text-right ${totalCost <= budget.amount ? 'text-emerald-400' : 'text-amber-400'}`}>
                            <p className="text-xs font-medium mb-1">{totalCost <= budget.amount ? 'Within Budget' : 'Over Budget'}</p>
                            <p className="text-sm opacity-80">Target: {budget.displayAmount || formatPrice(budget.amount)}</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={() => exportShoppingList(items, totalCost, budget)} className="btn-primary flex-1 py-3 justify-center flex items-center gap-2">
                        <Download className="w-4 h-4" /> Download List
                    </button>
                    <button onClick={() => window.print()} className="btn-secondary flex-1 py-3 justify-center flex items-center gap-2 text-gray-600">
                        Print List
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4">
                <button onClick={onBack} className="btn-secondary px-6 py-2.5 flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Back to Plan</button>
                <button onClick={onReset} className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-1.5 transition-colors px-4 py-2">
                    <RotateCcw className="w-3.5 h-3.5" /> Start Over
                </button>
            </div>
        </div>
    );
}
