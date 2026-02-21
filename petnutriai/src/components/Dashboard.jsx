import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { deletePetProfile } from '../services/userService';
import { Plus, Activity, ArrowRight, Trash2, Dog, Cat, Rabbit, Loader2, PawPrint, LogOut, AlertCircle } from 'lucide-react';

const PET_ICONS = {
    dog: Dog,
    cat: Cat,
    rabbit: Rabbit,
};

const PET_COLORS = {
    dog: 'bg-amber-100 text-amber-600',
    cat: 'bg-violet-100 text-violet-600',
    rabbit: 'bg-emerald-100 text-emerald-600',
    hamster: 'bg-orange-100 text-orange-600',
};

export default function Dashboard({ onStartNew, onResume }) {
    const { currentUser, logout } = useAuth();
    const [savedPets, setSavedPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null); // petId to confirm deletion

    useEffect(() => {
        if (!currentUser) return;
        const petsRef = ref(database, 'users/' + currentUser.uid + '/pets');
        const unsubscribe = onValue(petsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const petsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                // Sort by most recent first
                petsArray.sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
                setSavedPets(petsArray);
            } else {
                setSavedPets([]);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser]);

    const handleDelete = async (petId) => {
        setDeletingId(petId);
        try {
            await deletePetProfile(currentUser.uid, petId);
        } catch (err) {
            console.error('Delete failed:', err);
        }
        setDeletingId(null);
        setConfirmDelete(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <PawPrint className="w-8 h-8 text-indigo-600" />
                        My Dashboard
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">Logged in as <span className="font-semibold text-gray-700">{currentUser?.email}</span></p>
                </div>
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                >
                    <LogOut className="w-4 h-4" /> Log Out
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="card-base p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                        <PawPrint className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{savedPets.length}</p>
                        <p className="text-sm text-gray-500">Saved Pets</p>
                    </div>
                </div>
                <div className="card-base p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">Realtime</p>
                        <p className="text-sm text-gray-500">Data Sync</p>
                    </div>
                </div>
            </div>

            {/* New Pet Card */}
            <div className="card-base p-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-none shadow-lg shadow-indigo-200/50 mb-8">
                <h3 className="text-xl font-bold mb-1">Add New Pet Plan</h3>
                <p className="text-indigo-100 mb-5 text-sm">Fill in your pet's profile to generate a tailored nutrition plan.</p>
                <button
                    onClick={onStartNew}
                    className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
                >
                    <Plus className="w-5 h-5" /> Start New Plan
                </button>
            </div>

            {/* Saved Pets List */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">My Saved Pets</h2>
                <span className="text-sm text-gray-400">{savedPets.length} pet{savedPets.length !== 1 ? 's' : ''}</span>
            </div>

            {loading ? (
                <div className="text-center py-16 flex flex-col items-center gap-3 text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p>Loading your pets...</p>
                </div>
            ) : savedPets.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <PawPrint className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium mb-2">No pets saved yet</p>
                    <p className="text-sm text-gray-400 mb-4">Your pets will appear here after you complete Step 1 of the planner.</p>
                    <button onClick={onStartNew} className="btn-primary px-6 py-2 text-sm">
                        Create First Plan
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {savedPets.map(pet => {
                        const Icon = PET_ICONS[pet.petType] || PawPrint;
                        const colorClass = PET_COLORS[pet.petType] || 'bg-gray-100 text-gray-600';
                        const savedDate = pet.lastUpdated ? new Date(pet.lastUpdated).toLocaleDateString() : 'Unknown';

                        return (
                            <div key={pet.id} className="card-base p-5 flex items-center gap-4 group hover:shadow-md transition-all">
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 text-lg">{pet.name || 'Unnamed Pet'}</h3>
                                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mt-1">
                                        <span className="capitalize">{pet.petType}</span>
                                        {pet.breed && <span>· {pet.breed}</span>}
                                        {pet.weight && <span>· {pet.weight} kg</span>}
                                        {pet.age && <span>· {pet.age} yrs</span>}
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">Saved on {savedDate}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    {/* Delete Confirmation Inline */}
                                    {confirmDelete === pet.id ? (
                                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                            <span className="text-xs text-red-700 font-medium">Delete?</span>
                                            <button
                                                onClick={() => handleDelete(pet.id)}
                                                disabled={deletingId === pet.id}
                                                className="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors flex items-center gap-1"
                                            >
                                                {deletingId === pet.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Yes'}
                                            </button>
                                            <button
                                                onClick={() => setConfirmDelete(null)}
                                                className="text-xs text-gray-500 hover:text-gray-700"
                                            >
                                                No
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setConfirmDelete(pet.id)}
                                            className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                            title="Delete pet"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => onResume(pet)}
                                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all"
                                        title="Resume plan"
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
