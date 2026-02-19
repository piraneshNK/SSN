import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Download, Eye, Table, Sparkles } from 'lucide-react';
import { mealPlansData, getMealPlanKey } from '../data/mealData';

const MEAL_COLORS = {
    breakfast: { label: 'Breakfast', bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-700' },
    lunch: { label: 'Lunch', bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-800', badge: 'bg-cyan-100 text-cyan-700' },
    dinner: { label: 'Dinner', bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-800', badge: 'bg-violet-100 text-violet-700' },
};

function MealCard({ type, data }) {
    const c = MEAL_COLORS[type];
    return (
        <div className={`${c.bg} border ${c.border} rounded-xl p-4 transition-all hover:shadow-sm`}>
            <div className={`text-xs font-bold uppercase tracking-wider ${c.text} mb-2 flex items-center gap-2`}>
                <span className={`w-2 h-2 rounded-full ${c.text.replace('text', 'bg').replace('800', '500')}`}></span>
                {c.label}
            </div>
            <p className="text-gray-900 text-sm font-medium mb-3 leading-snug">{data.meal}</p>
            <p className="text-gray-500 text-xs mb-3">{data.portions}</p>
            <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-white border border-gray-100 rounded-md px-2 py-1 text-gray-500 font-medium">🔥 {data.calories} kcal</span>
                <span className="text-xs bg-white border border-gray-100 rounded-md px-2 py-1 text-gray-500 font-medium">🥩 {data.protein}g</span>
                <span className="text-xs bg-white border border-gray-100 rounded-md px-2 py-1 text-gray-500 font-medium">💧 {data.fat}g fat</span>
            </div>
        </div>
    );
}

export default function MealPlan({ petProfile, nutrition, budget, onNext, onBack }) {
    const [activeDay, setActiveDay] = useState(0);
    const [viewMode, setViewMode] = useState('card');

    const planKey = getMealPlanKey(petProfile.petType, petProfile.dietType, budget.tier);
    const days = mealPlansData[planKey]?.days || [];
    const activeData = days[activeDay] || days[0];

    const dailyTotal = activeData ? {
        calories: activeData.breakfast.calories + activeData.lunch.calories + activeData.dinner.calories,
        protein: activeData.breakfast.protein + activeData.lunch.protein + activeData.dinner.protein,
    } : null;

    if (!activeData) {
        return <div className="card-base p-8 text-center"><p className="text-gray-500">No meal plan available for this combination.</p></div>;
    }

    return (
        <div className="space-y-5 animate-fade-in-up">
            <div className="card-base p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-sm"><Calendar className="w-5 h-5 text-white" /></div>
                            <h2 className="text-2xl font-bold text-gray-900">Weekly Meal Plan</h2>
                        </div>
                        <p className="text-gray-500 text-sm">AI-generated for <span className="text-violet-700 font-semibold">{petProfile.breed || petProfile.petType}</span> · <span className="text-gray-700 font-medium">{budget.label}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setViewMode(v => v === 'card' ? 'table' : 'card')} className="btn-secondary px-3 py-2 text-xs text-gray-600 flex items-center gap-1.5 shadow-sm">
                            {viewMode === 'card' ? <Table className="w-4 h-4" /> : <Eye className="w-4 h-4" />} {viewMode === 'card' ? 'Table View' : 'Card View'}
                        </button>
                        <button onClick={() => window.print()} className="btn-secondary px-3 py-2 text-xs text-gray-600 flex items-center gap-1.5 shadow-sm">
                            <Download className="w-4 h-4" /> Print / Save PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Screen View (Interactive) */}
            <div className="print:hidden">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {days.map((d, i) => (
                        <button key={i} onClick={() => setActiveDay(i)} className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeDay === i ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-600 ring-offset-1' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>{d.day.slice(0, 3)}</button>
                    ))}
                </div>

                {viewMode === 'card' ? (
                    <div className="card-base p-6 border-t-4 border-t-indigo-500">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2"><div className="w-2 h-6 bg-indigo-500 rounded-full"></div>{activeData.day}</h3>
                            {dailyTotal && <div className="flex gap-4 text-xs bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><span className="text-gray-500 font-medium">🔥 <span className="text-gray-900 font-bold">{dailyTotal.calories}</span> kcal</span><span className="text-gray-500 font-medium">🥩 <span className="text-gray-900 font-bold">{dailyTotal.protein}g</span></span></div>}
                        </div>
                        <div className="space-y-4">
                            <MealCard type="breakfast" data={activeData.breakfast} />
                            <MealCard type="lunch" data={activeData.lunch} />
                            <MealCard type="dinner" data={activeData.dinner} />
                        </div>
                    </div>
                ) : (
                    <div className="card-base overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="py-4 px-6">Day</th>
                                        <th className="py-4 px-4 text-amber-600">Breakfast</th>
                                        <th className="py-4 px-4 text-cyan-600">Lunch</th>
                                        <th className="py-4 px-4 text-violet-600">Dinner</th>
                                        <th className="py-4 px-6 text-right">kcal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {days.map((d, i) => {
                                        const t = d.breakfast.calories + d.lunch.calories + d.dinner.calories;
                                        return (
                                            <tr key={i} onClick={() => { setActiveDay(i); setViewMode('card'); }} className={`cursor-pointer transition-colors duration-150 hover:bg-indigo-50/50 ${activeDay === i ? 'bg-indigo-50' : ''}`}>
                                                <td className="py-4 px-6 font-medium text-gray-900">{d.day.slice(0, 3)}</td>
                                                <td className="py-4 px-4 text-gray-600 text-xs">{d.breakfast.meal}</td>
                                                <td className="py-4 px-4 text-gray-600 text-xs">{d.lunch.meal}</td>
                                                <td className="py-4 px-4 text-gray-600 text-xs">{d.dinner.meal}</td>
                                                <td className="py-4 px-6 text-right text-gray-900 font-semibold">{t}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Print View (Full Week) */}
            <div className="hidden print:block space-y-6">
                {days.map((d, i) => (
                    <div key={i} className="break-inside-avoid border-b border-gray-100 pb-6 last:border-0 pointer-events-none">
                        <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>{d.day}</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <MealCard type="breakfast" data={d.breakfast} />
                            <MealCard type="lunch" data={d.lunch} />
                            <MealCard type="dinner" data={d.dinner} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex gap-3">
                <div className="bg-indigo-100 p-1.5 rounded-full h-fit"><Sparkles className="w-4 h-4 text-indigo-600" /></div>
                <p className="text-indigo-800 text-sm">
                    <span className="font-semibold block mb-0.5">AI-Generated Plan</span>
                    Mock logic used for demonstration. Future versions integrate GPT-4/Gemini for vet-approved accuracy.
                    {petProfile.allergies && <span className="block mt-2 pt-2 border-t border-indigo-200 text-amber-700 font-medium">⚠️ Noted allergies: {petProfile.allergies} — please check ingredients.</span>}
                </p>
            </div>

            <div className="flex justify-between gap-3 pt-2">
                <button onClick={onBack} className="btn-secondary px-5 py-2.5 text-sm text-gray-600 flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Back</button>
                <button onClick={onNext} className="btn-primary px-8 py-3 text-sm flex items-center gap-2">Shopping Cart <ChevronRight className="w-4 h-4" /></button>
            </div>
        </div>
    );
}
