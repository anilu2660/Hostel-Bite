import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { pageTransition, fadeIn } from '../utils/animations';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        hostelId: '',
        roomNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/" />;
    }

    const getPasswordStrength = (password) => {
        if (password.length === 0) return { strength: 0, label: '', color: '' };
        if (password.length < 6) return { strength: 33, label: 'Weak', color: 'bg-red-500' };
        if (password.length < 10) return { strength: 66, label: 'Medium', color: 'bg-yellow-500' };
        return { strength: 100, label: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const result = await signup({
                name: formData.name,
                email: formData.email,
                hostelId: formData.hostelId,
                roomNumber: formData.roomNumber,
                password: formData.password
            });

            if (result.success) {
                navigate('/');
            }
        } catch (err) {
            setError('Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen flex items-center justify-center bg-gradient-mesh py-12 px-4 sm:px-6 lg:px-8"
        >
            <motion.div
                variants={fadeIn}
                className="max-w-md w-full"
            >
                <div className="card-glass p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white dark:bg-dark-800 p-2 shadow-lg">
                            <img src="/logo.png" alt="HostelBite Logo" className="w-full h-full object-contain" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Join HostelBite today
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                        >
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="hostelId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Hostel ID
                                </label>
                                <input
                                    id="hostelId"
                                    name="hostelId"
                                    type="text"
                                    required
                                    value={formData.hostelId}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="H-101"
                                />
                            </div>

                            <div>
                                <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Room Number
                                </label>
                                <input
                                    id="roomNumber"
                                    name="roomNumber"
                                    type="text"
                                    required
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="205"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="••••••••"
                            />

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-gray-600 dark:text-gray-400">Password Strength:</span>
                                        <span className={`font-semibold ${passwordStrength.strength === 100 ? 'text-green-600' :
                                            passwordStrength.strength === 66 ? 'text-yellow-600' :
                                                'text-red-600'
                                            }`}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${passwordStrength.strength}%` }}
                                            className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center space-x-2">
                                    <span className="animate-spin">⏳</span>
                                    <span>Creating account...</span>
                                </span>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Signup;
