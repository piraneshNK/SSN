import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Activity, Info, Check, Leaf, Beef, AlertCircle, Search, Loader2, Upload, X, Sparkles } from 'lucide-react';
import { fetchBreeds, getAverageWeight } from '../services/dogApi';
import { fetchCatBreeds } from '../services/catApi';
import { getBreedRisk } from '../data/breedRisks';
import { analyzeBreedNutrition } from '../utils/breedNutritionEngine';
import { analyzeHealthRisks } from '../services/healthAI'; // New Service
import hamsterBreeds from '../data/hamsterBreeds.json';
import rabbitBreeds from '../data/rabbit.json'; // Direct import from source
import { BANNED_IN_INDIA, BANNED_IN_UK, BANNED_CATS_IN_INDIA, RESTRICTED_CATS_IN_INDIA } from '../data/bannedBreeds';

const MULTIPLIERS = {
    dog: {
        low: 1.4,
        medium: 1.7,
        high: 2.2
    },
    cat: {
        low: 1.1,
        medium: 1.4,
        high: 1.7
    },
    hamster: {
        low: 1.1, // Less active
        medium: 1.3,
        high: 1.5 // Wheel runner
    },
    rabbit: {
        low: 1.1,
        medium: 1.3,
        high: 1.6
    }
};

const ACTIVITY_LABELS = {
    low: { label: 'Low Activity', desc: 'Sedentary, senior, or recovering' },
    medium: { label: 'Lazy / Normal', desc: 'Moderate exercise, casual play' },
    high: { label: 'High Active', desc: 'High energy, working, or athletic' }
};

const HEALTH_CONDITIONS = [
    'Obesity', 'Underweight', 'Sensitive Stomach', 'Skin Issues', 'Joint Pain', 'High Energy',
    'Diabetes', 'Kidney Support', 'Heart Health', 'Anxiety', 'Dental Issues', 'Post-Surgery'
];

const SYMPTOMS = {
    'Obesity': 'Excess body fat, difficulty moving, shortness of breath, lethargy.',
    'Underweight': 'Visible ribs/spine, low energy, poor appetite, dull coat.',
    'Sensitive Stomach': 'Frequent vomiting, diarrhea, gas, picky eating.',
    'Skin Issues': 'Constant scratching, hair loss, redness, hot spots.',
    'Joint Pain': 'Limping, difficulty standing up, reluctance to jump/run.',
    'High Energy': 'Hyperactive, destructive behavior if bored, needs constant play.',
    'Diabetes': 'Excessive thirst, increased urination, weight loss despite appetite.',
    'Kidney Support': 'Increased thirst/urination, bad breath, vomiting, lethargy.',
    'Heart Health': 'Coughing, difficulty breathing, tiring easily during exercise.',
    'Anxiety': 'Pacing, panting, trembling, destructive behavior when left alone.',
    'Dental Issues': 'Bad breath, difficulty chewing, drooling, pawing at mouth.',
    'Post-Surgery': 'Recovering from anesthesia, needs gentle digestion, high energy for healing.'
};

const DIET_STYLES = ['Grain-Free', 'Kibble Only', 'Home Cooked', 'Wet Food / Gravy', 'Raw Diet'];

const DIET_ADVANTAGES = {
    nonveg: {
        title: "Carnivore / Omnivore Benefits",
        items: [
            "Complete Amino Acid Profile",
            "Natural Source of Taurine (Essential for Cats)",
            "High Bioavailability & Digestibility",
            "Supports Lean Muscle Mass"
        ],
        icon: <Beef className="w-5 h-5 text-rose-500" />,
        color: "bg-rose-50 border-rose-100 text-rose-800"
    },
    omnivore: { // Hamsters
        title: "Granivore / Omnivore",
        items: [
            "Seeds & Grains Base",
            "Fresh Vegetables",
            "Insects / Protein Occasional",
            "High Fiber Needs"
        ],
        icon: <Leaf className="w-5 h-5 text-amber-500" />,
        color: "bg-amber-50 border-amber-100 text-amber-800"
    },
    herbivore: { // Rabbits
        title: "Herbivore (High Fiber)",
        items: [
            "Unlimited Hay (80%)",
            "Fresh Leafy Greens",
            "Measured Pellets",
            "NO Grains/Seeds"
        ],
        icon: <Leaf className="w-5 h-5 text-green-600" />,
        color: "bg-green-50 border-green-100 text-green-800"
    },
    veg: {
        title: "Plant-Based Benefits",
        items: [
            "Rich in Fiber & Antioxidants",
            "Hypoallergenic for some pets",
            "Lower Environmental Impact",
            "Good for Weight Management"
        ],
        icon: <Leaf className="w-5 h-5 text-emerald-500" />,
        color: "bg-emerald-50 border-emerald-100 text-emerald-800"
    }
};

function calculateNutrition(profile) {
    let weight = parseFloat(profile.weight);

    // Normalization: If Hamster, weight is likely in Grams from user perception, but RER formula expects KG.
    // However, for UX, if user selects "Hamster", we might ask for grams.
    // Let's assume input is kg for consistency OR detect small values.
    // Better: For Hamster, let's treat input as grams if > 10? No, standard is kg.
    // Let's assume user inputs 0.15 kg for 150g hamster.
    // RER for small mammals (Kleiber's law fits generally)

    const rer = 70 * Math.pow(weight, 0.75);

    let merFactor = MULTIPLIERS[profile.petType][profile.activity];

    // Calculate Age in Months
    let ageInMonths = parseFloat(profile.age);
    if (profile.ageUnit === 'years') ageInMonths *= 12;

    // Determine Life Stage
    let lifeStage = 'Adult';
    if (profile.petType === 'dog') {
        if (ageInMonths < 12) lifeStage = 'Puppy/Kitten';
        else if (ageInMonths >= 84) lifeStage = 'Senior';
    } else {
        if (ageInMonths < 12) lifeStage = 'Puppy/Kitten';
        else if (ageInMonths >= 120) lifeStage = 'Senior';
    }

    // Adjust for specific conditions
    if (profile.conditions.includes('Obesity')) merFactor -= 0.2;
    if (profile.conditions.includes('High Energy')) merFactor += 0.2;
    if (profile.conditions.includes('Post-Surgery')) merFactor += 0.3; // Recovery needs

    // Growth multiplier for puppies/kittens
    if (lifeStage === 'Puppy/Kitten') {
        merFactor += 0.5;
    }

    // Safety clamps
    if (merFactor < 1.0) merFactor = 1.0;
    if (merFactor > 3.0) merFactor = 3.0;

    const mer = Math.round(rer * merFactor);

    // Macro split based on diet type
    let proteinPct = 0.30;
    let fatPct = 0.20;
    let carbsPct = 0.50;

    if (profile.petType === 'cat') {
        proteinPct = 0.45;
        fatPct = 0.35;
        carbsPct = 0.20;
    }

    if (profile.petType === 'hamster') {
        // Granivore/Omnivore: High Carb (Seeds), Moderate Protein, Low Fat
        proteinPct = 0.18;
        fatPct = 0.07;
        carbsPct = 0.75;
    }

    if (profile.petType === 'rabbit') {
        // Herbivore: Very High Fiber (Carb count in data), Low Protein, Very Low Fat
        // Based on rabbit.json (220kcal: 16g P, 3g F, 22g Fiber)
        // Protein ~ 25%, Fat ~ 10%, Carb/Fiber ~ 65%
        proteinPct = 0.15;
        fatPct = 0.05;
        carbsPct = 0.80; // Mostly Fiber
    }

    if (profile.dietType === 'veg' && profile.petType === 'dog') {
        proteinPct = 0.25;
        fatPct = 0.15;
        carbsPct = 0.60;
    }

    // Breed Specific Overrides (API First, Fallback to Static)
    // 1. Check API Data (Smart Groups)
    if (profile.selectedBreedData) {
        const smartMacros = analyzeBreedNutrition(profile.selectedBreedData);
        if (smartMacros) {
            proteinPct = smartMacros.protein;
            fatPct = smartMacros.fat;
            // Recalculate carbs
            carbsPct = parseFloat((1.0 - (proteinPct + fatPct)).toFixed(2));
        }
    }

    // 2. Check Medical Exceptions (Dalmatian, etc.) - Takes Precedence
    const breedRisk = getBreedRisk(profile.breed);
    if (breedRisk && breedRisk.macros) {
        // Only override if specific medical need implies it (optional, logic here assumes static list is 'medical overrides')
        // For now, let's allow static list to Refine the API guess if present
        proteinPct = breedRisk.macros.protein;
        fatPct = breedRisk.macros.fat;
        carbsPct = parseFloat((1.0 - (proteinPct + fatPct)).toFixed(2));
    }

    const proteinG = Math.round((mer * proteinPct) / 4);
    const fatG = Math.round((mer * fatPct) / 9);
    const carbsG = Math.round((mer * carbsPct) / 4);

    return {
        rer: Math.round(rer),
        merFactor: merFactor.toFixed(1),
        mer,
        proteinG,
        fatG,
        carbsG,
        proteinPct: Math.round(proteinPct * 100),
        fatPct: Math.round(fatPct * 100),
        carbsPct: Math.round(carbsPct * 100),
        ageInMonths,
        lifeStage
    };
}

export default function PetForm({ onComplete, location, setLocation }) {
    const [formStep, setFormStep] = useState(1);
    const [lastSelectedCondition, setLastSelectedCondition] = useState(null);
    const [breeds, setBreeds] = useState([]); // Store API breeds
    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [isBreedLoading, setIsBreedLoading] = useState(false);
    const [showBreedDropdown, setShowBreedDropdown] = useState(false);
    const [breedRiskAlert, setBreedRiskAlert] = useState(null); // Alert for specific breed logic
    const [breedImage, setBreedImage] = useState(null); // Image URL for verification
    const [selectedBreedData, setSelectedBreedData] = useState(null); // Store full API object
    const [showCountryDropdown, setShowCountryDropdown] = useState(false); // New local dropdown state
    const [bannedAlert, setBannedAlert] = useState(null); // New Banned Alert State

    const [form, setForm] = useState({
        petType: 'dog',
        name: '',
        breed: '',
        age: '',
        ageUnit: 'years',
        weight: '',
        activity: 'medium',
        conditions: [],
        otherConditions: '', // New Field
        dietType: 'nonveg',
        dietStyles: [],
        dietType: 'nonveg',
        dietStyles: [],
        allergies: '',
        prescriptionFile: null // New Field
    });

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [healthAnalysis, setHealthAnalysis] = useState(null); // { avoid: [], reason: "" }



    // Load Breeds on Mount
    useEffect(() => {
        const loadBreeds = async () => {
            setIsBreedLoading(true);
            let data = [];
            if (form.petType === 'dog') {
                data = await fetchBreeds();
            } else if (form.petType === 'cat') {
                data = await fetchCatBreeds();
            } else if (form.petType === 'hamster') {
                data = hamsterBreeds; // Load from local JSON
            } else if (form.petType === 'rabbit') {
                // Parse rabbit.json
                data = rabbitBreeds.rabbit_breeds.map(r => ({
                    id: r.name.toLowerCase().replace(/ /g, '_'),
                    name: r.name,
                    weight: `${(r.min_weight_g / 1000).toFixed(1)} - ${(r.max_weight_g / 1000).toFixed(1)}`, // Store as string for UI
                    life_span: `${Math.floor(r.min_age_months / 12)} - ${Math.floor(r.max_age_months / 12)} years`,
                    temperament: "Gentle", // Static fallback
                    image: null // Explicitly null to disable verification
                }));
            }
            setBreeds(data);
            setIsBreedLoading(false);
        };
        loadBreeds();
    }, [form.petType]);

    // Watch for Breed + Location changes to trigger Ban Alert
    useEffect(() => {
        if (form.petType === 'dog' && form.breed && location) {
            let isBanned = false;
            let countryName = '';

            if (location.country === 'India') {
                isBanned = BANNED_IN_INDIA.some(b => form.breed.toLowerCase().includes(b.toLowerCase()));
                countryName = 'India';
            } else if (location.country === 'UK') {
                isBanned = BANNED_IN_UK.some(b => form.breed.toLowerCase().includes(b.toLowerCase()));
                countryName = 'the UK';
            }

            if (isBanned) {
                setBannedAlert(`This dog breed is restricted/banned in ${countryName}.`);
            } else {
                setBannedAlert(null);
            }
        } else if (form.petType === 'cat' && form.breed && location && location.country === 'India') {
            const isBengal = BANNED_CATS_IN_INDIA.some(b => form.breed.toLowerCase().includes(b.toLowerCase()));
            const isSavannah = RESTRICTED_CATS_IN_INDIA.some(b => form.breed.toLowerCase().includes(b.toLowerCase()));

            if (isBengal) {
                setBannedAlert("This cat breed is banned in India (Wild Life Protection Act).");
            } else if (isSavannah) {
                setBannedAlert("Not officially banned, but check local Forestry Rules.");
            } else {
                setBannedAlert(null);
            }
        } else {
            setBannedAlert(null);
        }
    }, [form.breed, location, form.petType]);

    // Filter breeds when user types
    const handleBreedChange = (e) => {
        const val = e.target.value;
        updateForm('breed', val);
        if (val.length > 0 && breeds.length > 0) {
            const matches = breeds.filter(b => b.name.toLowerCase().includes(val.toLowerCase())).slice(0, 5);
            setFilteredBreeds(matches);
            setShowBreedDropdown(true);
        } else {
            setShowBreedDropdown(false);
        }
    };

    const selectBreed = (breed) => {
        updateForm('breed', breed.name);

        // Disable Image Verification for Hamster & Rabbit
        if (form.petType === 'hamster' || form.petType === 'rabbit') {
            setBreedImage(null);
        } else {
            setBreedImage(breed.image);
        }

        setSelectedBreedData(breed); // Save full data for nutrition engine
        setShowBreedDropdown(false);

        // Auto-Fill Logic
        if (breed.weight) {
            const avgWeight = getAverageWeight(breed.weight);
            if (avgWeight) updateForm('weight', avgWeight);
        }

        // Activity Analysis
        if (breed.temperament) {
            const t = breed.temperament.toLowerCase();
            if (t.includes('active') || t.includes('working') || t.includes('energetic')) {
                updateForm('activity', 'high');
            } else if (t.includes('calm') || t.includes('quiet')) {
                updateForm('activity', 'low');
            } else {
                updateForm('activity', 'medium');
            }
        }

        // Risk Analysis
        const risk = getBreedRisk(breed.name);
        if (risk) {
            setBreedRiskAlert(risk);
        } else {
            setBreedRiskAlert(null);
        }
    };

    const updateForm = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const toggleCondition = (condition) => {
        setForm(prev => {
            const exists = prev.conditions.includes(condition);
            if (exists) {
                if (lastSelectedCondition === condition) setLastSelectedCondition(null);
                return { ...prev, conditions: prev.conditions.filter(c => c !== condition) };
            }

            // Conflict Logic: Prevent selecting opposites
            const CONFLICTS = {
                'Obesity': ['Underweight'],
                'Underweight': ['Obesity'],
                'High Energy': ['Post-Surgery', 'Joint Pain'], // High energy might conflict with restriction needs
                'Post-Surgery': ['High Energy']
            };

            let newConditions = [...prev.conditions, condition];

            // If new condition has conflicts, remove them
            if (CONFLICTS[condition]) {
                newConditions = newConditions.filter(c => !CONFLICTS[condition].includes(c));
            }

            setLastSelectedCondition(condition);
            return { ...prev, conditions: newConditions };
        });
    };

    const toggleDietStyle = (style) => {
        setForm(prev => {
            const exists = prev.dietStyles.includes(style);
            if (exists) return { ...prev, dietStyles: prev.dietStyles.filter(s => s !== style) };
            return { ...prev, dietStyles: [...prev.dietStyles, style] };
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            updateForm('prescriptionFile', file);
        }
    };

    const removePrescription = () => {
        updateForm('prescriptionFile', null);
    };

    const handleNext = () => {
        if (formStep === 1 && (!form.name || !form.weight || !form.age)) return alert("Please fill in Name, Weight, and Age");

        if (formStep < 3) {
            setFormStep(s => s + 1);
            setLastSelectedCondition(null); // Reset when changing steps
        } else {
            const profileWithData = { ...form, selectedBreedData };
            const nutrition = calculateNutrition(profileWithData);
            const profileWithStage = { ...form, age: nutrition.lifeStage === 'Puppy/Kitten' ? (form.petType === 'dog' ? 'Puppy' : 'Kitten') : nutrition.lifeStage };
            onComplete(profileWithStage, nutrition);
        }
    };

    const handleBack = () => {
        if (formStep > 1) setFormStep(s => s - 1);
    };

    // Progress Bar Component
    const steps = [
        { num: 1, label: 'Details' },
        { num: 2, label: 'Health' },
        { num: 3, label: 'Diet' }
    ];

    return (
        <div className="card-base p-6 sm:p-8 animate-fade-in-up">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2 px-2">
                    {steps.map((s, i) => (
                        <div key={s.num} className="flex flex-col items-center relative z-10 w-1/3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${formStep >= s.num ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-100' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
                                {formStep > s.num ? <Check className="w-5 h-5" /> : s.num}
                            </div>
                            <span className={`text-xs font-bold mt-2 transition-colors duration-300 ${formStep >= s.num ? 'text-indigo-600' : 'text-gray-400'}`}>{s.label}</span>
                        </div>
                    ))}
                </div>
                {/* Active Line */}
                <div className="relative h-1 bg-gray-100 rounded-full mt-2 w-full overflow-hidden mx-auto max-w-[90%]">
                    <div
                        className="absolute h-full bg-indigo-500 transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${((formStep - 1) / 2) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {formStep === 1 ? 'Pet Profile & Lifestyle' : formStep === 2 ? 'Health Assessment' : 'Dietary Preferences'}
                </h2>
                <p className="text-gray-500 text-sm">We'll use this to calculate perfect macros.</p>
            </div>

            <div className="space-y-6 min-h-[300px]">
                {formStep === 1 && (
                    <div className="space-y-5 animate-fade-in-up">
                        {/* Country Selection */}
                        <div className="relative z-50">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
                            <button
                                type="button"
                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-left"
                            >
                                <span className="flex items-center gap-2 text-gray-700 font-medium">
                                    <span className="text-xl">{location ? location.flag : '🌍'}</span>
                                    {location ? location.country : 'Select Country (For Local Ingredients)'}
                                </span>
                                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-90' : ''}`} />
                            </button>

                            {showCountryDropdown && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowCountryDropdown(false)}></div>
                                    <div className="absolute top-full w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in-up">
                                        {[
                                            { country: 'India', code: 'IN', flag: '🇮🇳' },
                                            { country: 'USA', code: 'US', flag: '🇺🇸' },
                                            { country: 'UK', code: 'GB', flag: '🇬🇧' }
                                        ].map((opt) => (
                                            <button
                                                key={opt.code}
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setLocation(opt);
                                                    setShowCountryDropdown(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${location?.code === opt.code ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                                            >
                                                <span className="text-2xl">{opt.flag}</span>
                                                <span className="font-medium">{opt.country}</span>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            <button onClick={() => updateForm('petType', 'dog')} className={`px-2 py-4 rounded-xl border-2 transition-all font-semibold text-center hover:scale-[1.02] active:scale-95 ${form.petType === 'dog' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-500/10' : 'border-gray-200 hover:border-indigo-200 text-gray-600'}`}>🐶 Dog</button>
                            <button onClick={() => updateForm('petType', 'cat')} className={`px-2 py-4 rounded-xl border-2 transition-all font-semibold text-center hover:scale-[1.02] active:scale-95 ${form.petType === 'cat' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-500/10' : 'border-gray-200 hover:border-indigo-200 text-gray-600'}`}>🐱 Cat</button>
                            <button onClick={() => updateForm('petType', 'hamster')} className={`px-2 py-4 rounded-xl border-2 transition-all font-semibold text-center hover:scale-[1.02] active:scale-95 ${form.petType === 'hamster' ? 'border-amber-600 bg-amber-50 text-amber-700 ring-4 ring-amber-500/10' : 'border-gray-200 hover:border-indigo-200 text-gray-600'}`}>🐹 Hams</button>
                            <button onClick={() => updateForm('petType', 'rabbit')} className={`px-2 py-4 rounded-xl border-2 transition-all font-semibold text-center hover:scale-[1.02] active:scale-95 ${form.petType === 'rabbit' ? 'border-green-600 bg-green-50 text-green-700 ring-4 ring-green-500/10' : 'border-gray-200 hover:border-indigo-200 text-gray-600'}`}>🐰 Rabit</button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
                                <input type="text" className="input-field focus:ring-4 focus:ring-indigo-500/10" placeholder="e.g. Bella" value={form.name} onChange={e => updateForm('name', e.target.value)} />
                            </div>

                            {/* Smart Breed Autocomplete */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                                    Breed (Optional)
                                    {isBreedLoading && <Loader2 className="w-3 h-3 animate-spin text-gray-400" />}
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="input-field pr-8"
                                        placeholder="Type to search..."
                                        value={form.breed}
                                        onChange={handleBreedChange}
                                        onFocus={() => form.breed && setShowBreedDropdown(true)}
                                    />
                                    <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                                </div>
                                {showBreedDropdown && filteredBreeds.length > 0 && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                        {filteredBreeds.map(b => (
                                            <button
                                                key={b.id}
                                                onClick={() => selectBreed(b)}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-50 last:border-0"
                                            >
                                                <div className="font-bold text-gray-800">{b.name}</div>
                                                <div className="text-xs text-gray-500">{b.weight} kg · {b.life_span}</div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Breed Risk Alert with Image */}
                        {(breedRiskAlert || breedImage || bannedAlert) && (
                            <div className={`p-4 rounded-xl flex gap-4 animate-fade-in-up items-start border ${bannedAlert ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}>
                                {breedImage ? (
                                    <img src={breedImage} alt={form.breed} className="w-24 h-24 object-cover rounded-lg border border-blue-200 shadow-sm bg-white flex-shrink-0" />
                                ) : (
                                    <Info className={`w-6 h-6 flex-shrink-0 mt-1 ${bannedAlert ? 'text-red-600' : 'text-blue-600'}`} />
                                )}
                                <div>
                                    <strong className={`block mb-1 ${bannedAlert ? 'text-red-900' : 'text-blue-900'}`}>{form.breed}</strong>

                                    {bannedAlert && (
                                        <div className="text-sm text-red-800 mb-2 font-bold flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {bannedAlert}
                                        </div>
                                    )}

                                    {breedRiskAlert ? (
                                        <div className="text-sm text-blue-800">
                                            {breedRiskAlert.symptom} We'll adjust the diet to <strong>{breedRiskAlert.condition}</strong> logic.
                                        </div>
                                    ) : (
                                        !bannedAlert && (
                                            <div className="text-sm text-blue-800">
                                                Great choice! We've auto-adjusted the activity level based on typical {form.breed} temperament.
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Weight ({['hamster', 'rabbit'].includes(form.petType) ? 'grams (mostly)' : 'kg'})</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    placeholder={['hamster', 'rabbit'].includes(form.petType) ? "1500" : "25"}
                                    value={['hamster', 'rabbit'].includes(form.petType) && form.weight ? form.weight * 1000 : form.weight}
                                    onChange={e => {
                                        let val = parseFloat(e.target.value);
                                        // For Hamster and Rabbit, assume user inputs GRAMS, convert to KG
                                        if (['hamster', 'rabbit'].includes(form.petType)) val = val / 1000;
                                        updateForm('weight', val);
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        className="input-field flex-1"
                                        placeholder="3"
                                        value={form.age}
                                        onChange={e => updateForm('age', e.target.value)}
                                    />
                                    <select
                                        value={form.ageUnit}
                                        onChange={e => updateForm('ageUnit', e.target.value)}
                                        className="bg-gray-50 border border-gray-200 rounded-lg px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                        <option value="years">Years</option>
                                        <option value="months">Months</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Moved Activity Level Here */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Activity Level</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {Object.keys(ACTIVITY_LABELS).map((k) => (
                                    <button key={k} onClick={() => updateForm('activity', k)} className={`p-4 text-left rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-95 ${form.activity === k ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-500/20' : 'border-gray-200 hover:border-indigo-200 bg-white'}`}>
                                        <div className={`font-bold text-sm mb-1 ${form.activity === k ? 'text-indigo-700' : 'text-gray-900'}`}>{ACTIVITY_LABELS[k].label}</div>
                                        <div className="text-xs text-gray-500 leading-tight">{ACTIVITY_LABELS[k].desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {formStep === 2 && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Known Health Conditions</label>

                            {/* Symptom Checker Alert */}
                            {lastSelectedCondition && SYMPTOMS[lastSelectedCondition] && (
                                <div className="mb-4 bg-amber-50 border border-amber-100 p-4 rounded-xl text-sm text-amber-900 flex gap-3 animate-fade-in-up shadow-sm">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" />
                                    <div>
                                        <strong className="block mb-1 text-amber-700">Verify {lastSelectedCondition}:</strong>
                                        <span className="opacity-90">Common symptoms include: {SYMPTOMS[lastSelectedCondition]}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2">
                                {HEALTH_CONDITIONS.map(c => (
                                    <button key={c} onClick={() => toggleCondition(c)} className={`px-4 py-2 rounded-full text-sm border transition-all flex items-center gap-2 hover:bg-gray-50 ${form.conditions.includes(c) ? 'bg-indigo-100 border-indigo-200 text-indigo-700 font-bold ring-2 ring-indigo-500/10 hover:bg-indigo-100' : 'bg-white border-gray-200 text-gray-600'}`}>
                                        {form.conditions.includes(c) && <Check className="w-4 h-4" />} {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Other Health Concerns / Notes</label>
                            <textarea
                                className="input-field h-24 resize-none"
                                placeholder="Describe any other symptoms or conditions..."
                                value={form.otherConditions}
                                onChange={e => updateForm('otherConditions', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Prescription (Optional)</label>

                            {!form.prescriptionFile ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 font-medium">Click to Upload Prescription</p>
                                    <p className="text-xs text-gray-400">JPG, PNG or PDF (Max 5MB)</p>
                                </div>
                            ) : (
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                            <Upload className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-indigo-900 truncate max-w-[200px]">{form.prescriptionFile.name}</p>
                                            <p className="text-xs text-indigo-600">Uploaded successfully</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={removePrescription}
                                        className="p-2 hover:bg-indigo-100 text-indigo-400 hover:text-indigo-600 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Health AI Analysis Section */}
                        {(form.conditions.length > 0 || form.otherConditions || form.prescriptionFile) && (
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-indigo-500" /> Items to Avoid
                                        </h4>
                                        <p className="text-xs text-gray-500">Based on your pet's health conditions.</p>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            if (isAnalyzing) return;
                                            setIsAnalyzing(true);
                                            setHealthAnalysis(null);
                                            try {
                                                const result = await analyzeHealthRisks(form.conditions, form.otherConditions, form.prescriptionFile);
                                                if (result.avoid) setHealthAnalysis(result);
                                            } catch (err) {
                                                alert("AI Analysis Failed: " + err.message);
                                            }
                                            setIsAnalyzing(false);
                                        }}
                                        disabled={isAnalyzing}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${isAnalyzing ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'}`}
                                    >
                                        {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                        {isAnalyzing ? 'Analyzing...' : 'Check Now'}
                                    </button>
                                </div>

                                {healthAnalysis && (
                                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 animate-fade-in-up">
                                        <div className="flex items-start gap-3 mb-2">
                                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h5 className="font-bold text-red-900 text-sm">Recommended Exclusions</h5>
                                                <p className="text-xs text-red-700 opacity-80">{healthAnalysis.reason}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2 ml-8">
                                            {healthAnalysis.avoid.map((item, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-white border border-red-200 text-red-700 text-xs font-bold rounded-full shadow-sm">
                                                    🚫 No {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {formStep === 3 && (
                    <div className="space-y-6 animate-fade-in-up">
                        {/* Diet Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Diet Type</label>
                            <div className="grid grid-cols-2 gap-4">
                                {form.petType !== 'hamster' && form.petType !== 'rabbit' && (
                                    <>
                                        <button onClick={() => updateForm('dietType', 'nonveg')} className={`p-6 rounded-xl border-2 transition-all text-center hover:scale-[1.02] active:scale-95 ${form.dietType === 'nonveg' ? 'border-rose-600 bg-rose-50 text-rose-700 ring-4 ring-rose-500/10' : 'border-gray-200 hover:border-rose-200 text-gray-600'}`}>
                                            <span className="text-3xl block mb-2">🍖</span>
                                            <span className="font-bold">Non-Vegetarian</span>
                                        </button>
                                        <button onClick={() => updateForm('dietType', 'veg')} className={`p-6 rounded-xl border-2 transition-all text-center hover:scale-[1.02] active:scale-95 ${form.dietType === 'veg' ? 'border-emerald-600 bg-emerald-50 text-emerald-700 ring-4 ring-emerald-500/10' : 'border-gray-200 hover:border-emerald-200 text-gray-600'}`}>
                                            <span className="text-3xl block mb-2">🥦</span>
                                            <span className="font-bold">Vegetarian</span>
                                        </button>
                                    </>
                                )}
                                {form.petType === 'hamster' && (
                                    <button onClick={() => updateForm('dietType', 'omnivore')} className={`col-span-2 p-6 rounded-xl border-2 transition-all text-center hover:scale-[1.02] active:scale-95 ${form.dietType === 'omnivore' || true ? 'border-amber-600 bg-amber-50 text-amber-700 ring-4 ring-amber-500/10' : 'border-gray-200'}`}>
                                        <span className="text-3xl block mb-2">🌾</span>
                                        <span className="font-bold">Omnivore / Granivore</span>
                                    </button>
                                )}
                                {form.petType === 'rabbit' && (
                                    <button onClick={() => updateForm('dietType', 'herbivore')} className={`col-span-2 p-6 rounded-xl border-2 transition-all text-center hover:scale-[1.02] active:scale-95 ${form.dietType === 'herbivore' || true ? 'border-green-600 bg-green-50 text-green-700 ring-4 ring-green-500/10' : 'border-gray-200'}`}>
                                        <span className="text-3xl block mb-2">🌿</span>
                                        <span className="font-bold">Herbivore (Hay & Greens)</span>
                                    </button>
                                )}
                            </div>


                            {/* Dynamic Diet Info Card */}
                            <div className={`mt-4 rounded-xl border p-5 flex gap-4 ${DIET_ADVANTAGES[form.dietType].color}`}>
                                <div className="flex-shrink-0 mt-1">{DIET_ADVANTAGES[form.dietType].icon}</div>
                                <div>
                                    <h4 className="font-bold text-sm mb-2">{DIET_ADVANTAGES[form.dietType].title}</h4>
                                    <ul className="text-sm space-y-1 list-disc list-inside opacity-90">
                                        {DIET_ADVANTAGES[form.dietType].items.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {form.petType === 'cat' && form.dietType === 'veg' && (
                                <div className="mt-4 bg-amber-50 border border-amber-100 p-4 rounded-xl text-sm text-amber-800 flex gap-3">
                                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span><strong>Veterinary Warning:</strong> Cats are obligate carnivores. A vegetarian diet requires synthetic taurine supplements to prevent permanent health damage.</span>
                                </div>
                            )}
                        </div>

                        {/* Diet Style Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Dietary Preferences (Optional)</label>
                            <div className="flex flex-wrap gap-2">
                                {DIET_STYLES.map(style => (
                                    <button key={style} onClick={() => toggleDietStyle(style)} className={`px-4 py-2 rounded-lg text-sm border transition-all flex items-center gap-2 hover:bg-gray-50 ${form.dietStyles.includes(style) ? 'bg-indigo-100 border-indigo-200 text-indigo-700 font-bold ring-2 ring-indigo-500/10' : 'bg-white border-gray-200 text-gray-600'}`}>
                                        {form.dietStyles.includes(style) && <Check className="w-4 h-4" />} {style}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Any Allergies? (Optional)</label>
                            <input type="text" className="input-field" placeholder="e.g. Chicken, Grain, Dairy" value={form.allergies} onChange={e => updateForm('allergies', e.target.value)} />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between pt-8 mt-4 border-t border-gray-100">
                {formStep > 1 ? (
                    <button onClick={handleBack} className="btn-secondary px-6 py-3 flex items-center gap-2 font-semibold">
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                ) : <div></div>}

                <button onClick={handleNext} className="btn-primary px-8 py-3 flex items-center gap-2 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40">
                    {formStep === 3 ? 'Calculate Perfect Plan' : 'Next Step'} <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
