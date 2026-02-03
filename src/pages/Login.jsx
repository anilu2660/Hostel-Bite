import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState('student'); // 'student' or 'admin'
    const [showPassword, setShowPassword] = useState(false);
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
            const result = await login(email, password, loginType);
            if (result.success) {
                navigate('/');
            } else if (result.message) {
                // Display error with hint if available
                const errorMsg = result.hint
                    ? `${result.message}\n💡 ${result.hint}`
                    : result.message;
                setError(errorMsg);
            }
        } catch (err) {
            setError('Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Orbs */}
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, 40, 0],
                        x: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 15, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-15 blur-3xl"
                />
            </div>

            {/* Main Content */}
            <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md w-full"
                >
                    {/* 3D Card Container */}
                    <motion.div
                        initial={{ rotateY: -10, rotateX: 10 }}
                        animate={{ rotateY: 0, rotateX: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ perspective: "1000px" }}
                        className="relative"
                    >
                        <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 overflow-hidden">
                            {/* Animated Gradient Border */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                            {/* Header with 3D Effect */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-center mb-8 relative z-10"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotateY: 180 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-lg"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-4xl">
                                        🍽️
                                    </div>
                                </motion.div>
                                <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                                    Welcome Back!
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Login to order delicious food
                                </p>
                            </motion.div>

                            {/* Login Type Tabs with 3D Effect */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="flex gap-3 mb-6 relative z-10"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => setLoginType('student')}
                                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${loginType === 'student'
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                                        }`}
                                    style={{
                                        transform: loginType === 'student' ? 'translateZ(10px)' : 'translateZ(0)',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    <span className="flex items-center justify-center space-x-2">
                                        <span>👨‍🎓</span>
                                        <span>Student</span>
                                    </span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => setLoginType('admin')}
                                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${loginType === 'admin'
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                                        }`}
                                    style={{
                                        transform: loginType === 'admin' ? 'translateZ(10px)' : 'translateZ(0)',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    <span className="flex items-center justify-center space-x-2">
                                        <span>👨‍💼</span>
                                        <span>Admin</span>
                                    </span>
                                </motion.button>
                            </motion.div>

                            {/* Error Message with Animation */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl relative z-10"
                                >
                                    <div className="flex items-start">
                                        <span className="mr-2 text-lg">⚠️</span>
                                        <div className="flex-1">
                                            <p className="text-sm text-red-600 dark:text-red-400 font-semibold mb-1">
                                                {error.split('\n')[0]}
                                            </p>
                                            {error.includes('💡') && (
                                                <p className="text-xs text-red-500 dark:text-red-300 mt-2">
                                                    {error.split('\n')[1]}
                                                </p>
                                            )}
                                            {error.includes('No account found') && (
                                                <Link
                                                    to="/signup"
                                                    className="inline-block mt-3 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline"
                                                >
                                                    Create a new account →
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Form with 3D Inputs */}
                            <motion.form
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                onSubmit={handleSubmit}
                                className="space-y-6 relative z-10"
                            >
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                                            placeholder={loginType === 'admin' ? 'admin@canteen.com' : 'your.email@example.com'}
                                            style={{ transformStyle: 'preserve-3d' }}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            📧
                                        </div>
                                    </motion.div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none pr-12"
                                            placeholder="••••••••"
                                            style={{ transformStyle: 'preserve-3d' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                        >
                                            {showPassword ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                    </motion.div>
                                    <div className="mt-2 text-right">
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 rounded-xl text-lg font-semibold text-white shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${loginType === 'admin'
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-blue-500/50'
                                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/50'
                                        }`}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            >
                                                ⏳
                                            </motion.span>
                                            <span>Logging in...</span>
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center space-x-2">
                                            <span>Login as {loginType === 'admin' ? 'Admin' : 'Student'}</span>
                                            <span>→</span>
                                        </span>
                                    )}
                                </motion.button>
                            </motion.form>

                            {/* Admin Info */}
                            {loginType === 'admin' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800 relative z-10"
                                >
                                    <p className="text-xs text-cyan-800 dark:text-cyan-300">
                                        <strong>Admin Access:</strong> After login, you'll see the "Admin Panel" button in the navbar.
                                    </p>
                                </motion.div>
                            )}

                            {/* Footer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="mt-6 text-center relative z-10"
                            >
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/signup"
                                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
