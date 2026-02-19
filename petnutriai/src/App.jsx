import { useState, useEffect } from 'react';
import './index.css';
import Home from './components/Home';
import PetForm from './components/PetForm';
import NutritionDashboard from './components/NutritionDashboard';
import BudgetSelector from './components/BudgetSelector';
import MealPlan from './components/MealPlan';
import ShoppingCart from './components/ShoppingCart';
import { PawPrint, Sparkles, Home as HomeIcon } from 'lucide-react';

const STEPS = [
    { id: 1, short: 'Profile' },
    { id: 2, short: 'Nutrition' },
    { id: 3, short: 'Budget' },
    { id: 4, short: 'Plan' },
    { id: 5, short: 'Cart' },
];

function ProgressStepper({ currentStep }) {
    return (
        <div className="flex items-center justify-center mb-10 px-4">
            {STEPS.map((step, idx) => (
                <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${currentStep > step.id ? 'bg-indigo-600 text-white shadow-md' :
                            currentStep === step.id ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 scale-110 shadow-lg' :
                                'bg-white border border-gray-200 text-gray-400'
                            }`}>
                            {currentStep > step.id ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : step.id}
                        </div>
                        <span className={`mt-2 text-xs font-medium hidden sm:block ${currentStep === step.id ? 'text-indigo-600' : 'text-gray-400'}`}>{step.short}</span>
                    </div>
                    {idx < STEPS.length - 1 && (
                        <div className="w-8 sm:w-14 h-0.5 mx-1 mb-5 rounded-full overflow-hidden bg-gray-200">
                            <div className="h-full bg-indigo-600 transition-all duration-700" style={{ width: currentStep > step.id ? '100%' : '0%' }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default function App() {
    // Load initial state from localStorage if available
    const [showHome, setShowHome] = useState(() => JSON.parse(localStorage.getItem('pn_showHome')) ?? true);
    const [step, setStep] = useState(() => JSON.parse(localStorage.getItem('pn_step')) ?? 1);
    const [petProfile, setPetProfile] = useState(() => JSON.parse(localStorage.getItem('pn_petProfile')) ?? null);
    const [nutrition, setNutrition] = useState(() => JSON.parse(localStorage.getItem('pn_nutrition')) ?? null);
    const [budget, setBudget] = useState(() => JSON.parse(localStorage.getItem('pn_budget')) ?? null);

    // Persist state changes
    useEffect(() => { localStorage.setItem('pn_showHome', JSON.stringify(showHome)); }, [showHome]);
    useEffect(() => { localStorage.setItem('pn_step', JSON.stringify(step)); }, [step]);
    useEffect(() => { localStorage.setItem('pn_petProfile', JSON.stringify(petProfile)); }, [petProfile]);
    useEffect(() => { localStorage.setItem('pn_nutrition', JSON.stringify(nutrition)); }, [nutrition]);
    useEffect(() => { localStorage.setItem('pn_budget', JSON.stringify(budget)); }, [budget]);

    const startPlan = () => {
        setShowHome(false);
        setStep(1);
    };

    const goHome = () => {
        // Confirm before clearing if in middle of flow
        if (!showHome && step > 1) {
            if (!window.confirm("Return to home? This will clear your current progress.")) return;
        }

        // Clear storage and state
        localStorage.removeItem('pn_showHome');
        localStorage.removeItem('pn_step');
        localStorage.removeItem('pn_petProfile');
        localStorage.removeItem('pn_nutrition');
        localStorage.removeItem('pn_budget');

        setShowHome(true);
        setPetProfile(null);
        setNutrition(null);
        setBudget(null);
        setStep(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 grid-pattern font-sans text-gray-900">
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <button onClick={goHome} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
                            <PawPrint className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-lg font-bold text-gray-900 leading-tight">PetNutriAI</h1>
                            <p className="text-xs text-gray-500 hidden sm:block">Smart Diet Planner</p>
                        </div>
                    </button>

                    <div className="flex items-center gap-4">
                        {!showHome && (
                            <button onClick={goHome} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Home">
                                <HomeIcon className="w-5 h-5" />
                            </button>
                        )}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="text-xs font-semibold text-indigo-700">AI Powered</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pb-16 pt-8">
                {showHome ? (
                    <Home onStart={startPlan} />
                ) : (
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <ProgressStepper currentStep={step} />
                        <div className="animate-fade-in-up">
                            {step === 1 && (
                                <PetForm onComplete={(profile, nutr) => { setPetProfile(profile); setNutrition(nutr); setStep(2); }} />
                            )}
                            {step === 2 && nutrition && (
                                <NutritionDashboard nutrition={nutrition} petProfile={petProfile} onNext={() => setStep(3)} onBack={() => setStep(1)} />
                            )}
                            {step === 3 && (
                                <BudgetSelector petProfile={petProfile} onComplete={(b) => { setBudget(b); setStep(4); }} onBack={() => setStep(2)} />
                            )}
                            {step === 4 && (
                                <MealPlan petProfile={petProfile} nutrition={nutrition} budget={budget} onNext={() => setStep(5)} onBack={() => setStep(3)} />
                            )}
                            {step === 5 && (
                                <ShoppingCart petProfile={petProfile} budget={budget} onBack={() => setStep(4)}
                                    onReset={goHome} />
                            )}
                        </div>
                    </div>
                )}
            </main>

            <footer className="bg-white border-t border-gray-100 py-8 text-center text-gray-500 text-sm">
                <div className="max-w-4xl mx-auto px-4">
                    <p className="mb-2">PetNutriAI — Scientific Nutrition for Pets</p>
                    <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
