import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { pageTransition, fadeIn } from '../utils/animations';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState('student'); // 'student' or 'admin'
    const { login, user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/');
            }
        } catch (err) {
            setError('Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fillAdminCredentials = () => {
        setEmail('admin@canteen.com');
        setPassword('admin123');
        setLoginType('admin');
    };

    const fillStudentCredentials = () => {
        setEmail('student@example.com');
        setPassword('student123');
        setLoginType('student');
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
                            Welcome Back!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Login to order delicious food
                        </p>
                    </div>

                    {/* Login Type Tabs */}
                    <div className="flex gap-2 mb-6">
                        <button
                            type="button"
                            onClick={() => setLoginType('student')}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${loginType === 'student'
                                    ? 'gradient-primary text-white shadow-lg'
                                    : 'glass hover:shadow-md'
                                }`}
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <span>👨‍🎓</span>
                                <span>Student</span>
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setLoginType('admin')}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${loginType === 'admin'
                                    ? 'gradient-secondary text-white shadow-lg'
                                    : 'glass hover:shadow-md'
                                }`}
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <span>👨‍💼</span>
                                <span>Admin</span>
                            </span>
                        </button>
                    </div>

                    {/* Quick Fill Demo Credentials */}
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-800 dark:text-blue-300 font-semibold mb-3">
                            Quick Login (Demo):
                        </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={fillStudentCredentials}
                                className="flex-1 px-3 py-2 bg-white dark:bg-dark-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                            >
                                Fill Student
                            </button>
                            <button
                                type="button"
                                onClick={fillAdminCredentials}
                                className="flex-1 px-3 py-2 bg-white dark:bg-dark-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                            >
                                Fill Admin
                            </button>
                        </div>
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder={loginType === 'admin' ? 'admin@canteen.com' : 'your.email@example.com'}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed ${loginType === 'admin' ? 'btn-secondary' : 'btn-primary'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center space-x-2">
                                    <span className="animate-spin">⏳</span>
                                    <span>Logging in...</span>
                                </span>
                            ) : (
                                `Login as ${loginType === 'admin' ? 'Admin' : 'Student'}`
                            )}
                        </button>
                    </form>

                    {/* Info Box */}
                    {loginType === 'admin' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800"
                        >
                            <p className="text-xs text-cyan-800 dark:text-cyan-300">
                                <strong>Admin Access:</strong> After login, you'll see the "Admin Panel" button in the navbar to access dashboard, menu management, and orders.
                            </p>
                        </motion.div>
                    )}

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary-500 hover:text-primary-600 font-semibold">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Login;
