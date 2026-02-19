import { ArrowRight, CheckCircle, ShieldCheck, Heart } from 'lucide-react';

export default function Home({ onStart }) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 animate-fade-in-up">
            <div className="text-center py-12 sm:py-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    AI-Powered Pet Nutrition v1.0
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Scientific Diet Plans for <span className="gradient-text">Happy Pets</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Stop guessing. Get a vet-approved, personalized meal plan for your dog or cat in seconds. Optimized for health and budget.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={onStart} className="btn-primary px-8 py-4 text-lg flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg shadow-indigo-500/20">
                        Create Free Plan <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto text-gray-600 hover:text-gray-900">
                        View Sample
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-20">
                {[
                    { icon: Heart, title: "Tailored Nutrition", desc: "Customized macros based on age, breed, weight, and activity level." },
                    { icon: ShieldCheck, title: "Vet Approved Logic", desc: "Calculations based on WSAVA and AAFCO guidelines for pet health." },
                    { icon: CheckCircle, title: "Budget Friendly", desc: "Get premium nutrition without breaking the bank. Plans for every budget." }
                ].map((feature, i) => (
                    <div key={i} className="card-base p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
