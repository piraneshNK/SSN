import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader2, Mail, Lock, ArrowRight, AlertCircle, User } from 'lucide-react';

export default function Register({ onSwitchToLogin, onRegisterSuccess, onCancel }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            if (onRegisterSuccess) onRegisterSuccess();
        } catch (err) {
            console.error(err);
            setError('Failed to create account: ' + err.message);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="card-base w-full max-w-md p-8 animate-fade-in-up">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join PetNutriAI to track your pet's health</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-700 p-3 rounded-lg flex items-center gap-2 mb-6 text-sm">
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                className="input-field pl-10"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                className="input-field pl-10"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                className="input-field pl-10"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    <button disabled={loading} type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign Up <ArrowRight className="w-4 h-4" /></>}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} className="text-indigo-600 font-semibold hover:underline">
                        Log In
                    </button>
                </div>
                <div className="mt-2 text-center">
                    <button onClick={onCancel} className="text-xs text-gray-400 hover:text-gray-600">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
