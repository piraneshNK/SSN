import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader2, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login({ onSwitchToRegister, onLoginSuccess, onCancel }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            if (onLoginSuccess) onLoginSuccess();
        } catch (err) {
            console.error(err);
            setError('Failed to log in: ' + err.message);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="card-base w-full max-w-md p-8 animate-fade-in-up">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to access your pet's dashboard</p>
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

                    <button disabled={loading} type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToRegister} className="text-indigo-600 font-semibold hover:underline">
                        Sign Up
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
