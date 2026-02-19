import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, DollarSign } from 'lucide-react';

const TIERS = [
    { id: 'budget', label: 'Budget Friendly', avg: '1000-2000', desc: 'Affordable, locally sourced ingredients without compromising basic nutrition.', color: 'emerald' },
    { id: 'balanced', label: 'Balanced Plan', avg: '2500-4500', desc: 'Optimal mix of quality proteins and fresh vegetables for best value.', color: 'indigo', recommended: true },
    { id: 'premium', label: 'Premium / Organic', avg: '5000+', desc: 'Top-tier organic ingredients, exotic proteins, and specialized supplements.', color: 'violet' }
];

export default function BudgetSelector({ petProfile, onComplete, onBack }) {
    const [selectedTier, setSelectedTier] = useState('balanced');
    const [customAmount, setCustomAmount] = useState('');

    const handleSelect = () => {
        const tier = TIERS.find(t => t.id === selectedTier);
        onComplete({
            tier: selectedTier,
            label: tier ? tier.label : 'Custom Budget',
            amount: customAmount || (selectedTier === 'budget' ? 1500 : selectedTier === 'balanced' ? 3500 : 6000)
        });
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Monthly Budget Preference</h2>
                <p className="text-gray-500 text-sm">Select a range to help AI optimize ingredient choices.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {TIERS.map((tier) => (
                    <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-200 hover:shadow-md ${selectedTier === tier.id ? `border-${tier.color}-500 bg-${tier.color}-50 ring-1 ring-${tier.color}-500` : 'border-gray-200 bg-white hover:border-gray-300'}`}
                    >
                        {tier.recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">Recommended</span>}
                        <div className="text-center mb-4">
                            <h3 className={`font-bold text-lg text-gray-900 mb-1`}>{tier.label}</h3>
                            <div className={`text-${tier.color}-600 font-extrabold text-xl`}>₹{tier.avg}</div>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed text-center mb-4">{tier.desc}</p>
                        <div className={`w-6 h-6 mx-auto rounded-full border-2 flex items-center justify-center ${selectedTier === tier.id ? `border-${tier.color}-600 bg-${tier.color}-600` : 'border-gray-300'}`}>
                            {selectedTier === tier.id && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                    </div>
                ))}
            </div>

            <div className="card-base p-6 bg-gray-50 border-gray-100 mt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Have a specific limit?</h4>
                        <p className="text-gray-500 text-xs">Enter exact amount in INR (optional).</p>
                    </div>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="number"
                            placeholder="e.g. 3000"
                            className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-40 text-sm font-medium"
                            value={customAmount}
                            onChange={(e) => { setCustomAmount(e.target.value); if (e.target.value) setSelectedTier('custom'); }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <button onClick={onBack} className="btn-secondary px-6 py-2.5 flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Back</button>
                <button onClick={handleSelect} className="btn-primary px-8 py-2.5 flex items-center gap-2">Generate Plan <ChevronRight className="w-4 h-4" /></button>
            </div>
        </div>
    );
}
