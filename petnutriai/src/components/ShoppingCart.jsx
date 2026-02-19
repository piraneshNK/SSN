import { Download, Check, ChevronLeft, RotateCcw, ShoppingBag } from 'lucide-react';
import { getMealPlanKey, mealPlansData } from '../data/mealData';

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

export default function ShoppingCart({ petProfile, budget, onBack, onReset }) {
    const planKey = getMealPlanKey(petProfile.petType, petProfile.dietType, budget.tier);
    const plan = mealPlansData[planKey];

    // Fallback if no plan found (should not happen with complete data)
    const items = plan ? plan.shoppingList : [];

    const totalCost = items.reduce((sum, item) => sum + item.estimatedCost, 0);

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
                                <div className="text-gray-900 font-semibold text-sm">₹{item.estimatedCost}</div>
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
                        <div className="text-3xl font-bold">₹{totalCost}</div>
                    </div>
                    {budget.amount && (
                        <div className={`text-right ${totalCost <= budget.amount ? 'text-emerald-400' : 'text-amber-400'}`}>
                            <p className="text-xs font-medium mb-1">{totalCost <= budget.amount ? 'Within Budget' : 'Over Budget'}</p>
                            <p className="text-sm opacity-80">Target: ₹{budget.amount}</p>
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
