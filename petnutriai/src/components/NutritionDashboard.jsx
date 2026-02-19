import { ChevronRight, ChevronLeft, Activity, Info } from 'lucide-react';

export default function NutritionDashboard({ nutrition, petProfile, onNext, onBack }) {
    // Helper to generate Conic Gradient for charts
    const getGradient = (color, pct) => {
        const c = color === 'amber' ? '#f59e0b' : color === 'cyan' ? '#06b6d4' : '#8b5cf6';
        return `conic-gradient(${c} ${pct}%, #e5e7eb 0deg)`;
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="card-base p-6 sm:p-8">
                <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Nutritional Targets</h2>
                        <p className="text-gray-500 text-sm">Calculated for <span className="text-indigo-600 font-semibold">{petProfile.name}</span> ({petProfile.weight}kg, {petProfile.age})</p>
                    </div>
                    <div className="text-center sm:text-right bg-indigo-50 px-6 py-4 rounded-2xl border border-indigo-100">
                        <div className="text-xs text-indigo-500 uppercase tracking-wider font-bold mb-1">Daily Target</div>
                        <div className="text-4xl font-extrabold text-indigo-600">{nutrition.mer} <span className="text-base font-semibold text-indigo-400">kcal</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    {/* Protein Chart */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 rounded-full flex items-center justify-center mb-3" style={{ background: getGradient('amber', nutrition.proteinPct) }}>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-col shadow-inner">
                                <span className="text-sm font-bold text-gray-900">{nutrition.proteinPct}%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-amber-600 font-bold text-lg leading-tight">{nutrition.proteinG}g</div>
                            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Protein</div>
                        </div>
                    </div>

                    {/* Fat Chart */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 rounded-full flex items-center justify-center mb-3" style={{ background: getGradient('cyan', nutrition.fatPct) }}>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-col shadow-inner">
                                <span className="text-sm font-bold text-gray-900">{nutrition.fatPct}%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-cyan-600 font-bold text-lg leading-tight">{nutrition.fatG}g</div>
                            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Fat</div>
                        </div>
                    </div>

                    {/* Carbs Chart */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 rounded-full flex items-center justify-center mb-3" style={{ background: getGradient('violet', nutrition.carbsPct) }}>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-col shadow-inner">
                                <span className="text-sm font-bold text-gray-900">{nutrition.carbsPct}%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-violet-600 font-bold text-lg leading-tight">{nutrition.carbsG}g</div>
                            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Carbs</div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex gap-3 text-sm text-gray-600">
                    <Info className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    <p className="leading-relaxed text-xs sm:text-sm">
                        Calculated using <strong>{petProfile.petType === 'dog' ? 'WSAVA' : 'AAFCO'}</strong> guidelines.
                        RER: {nutrition.rer} kcal/day × Multiplier: {nutrition.merFactor} ({petProfile.lifeStage}, {ACTIVITY_LABELS && ACTIVITY_LABELS[petProfile.activity] ? ACTIVITY_LABELS[petProfile.activity].label : petProfile.activity}).
                    </p>
                </div>
            </div>

            <div className="flex justify-between">
                <button onClick={onBack} className="btn-secondary px-6 py-3 flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Edit Profile</button>
                <button onClick={onNext} className="btn-primary px-8 py-3 flex items-center gap-2 shadow-lg shadow-indigo-500/30">Select Budget <ChevronRight className="w-4 h-4" /></button>
            </div>
        </div>
    );
}

const ACTIVITY_LABELS = {
    low: { label: 'Low Activity' },
    medium: { label: 'Lazy / Normal' },
    high: { label: 'High Active' }
};
