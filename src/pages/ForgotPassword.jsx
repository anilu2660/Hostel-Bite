import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await authService.forgotPassword(email);

            if (result.success) {
                setSuccess(true);
            } else {
                setError(result.message || 'Failed to send reset email');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-blue-900/20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        y: [0, -35, 0],
                        x: [0, 25, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, 45, 0],
                        x: [0, -35, 0],
                        scale: [1, 1.25, 1],
                    }}
                    transition={{
                        duration: 13,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"
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
                    <motion.div
                        initial={{ rotateY: -10, rotateX: 10 }}
                        animate={{ rotateY: 0, rotateX: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ perspective: "1000px" }}
                        className="relative"
                    >
                        <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 overflow-hidden">
                            {/* Header */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-center mb-8 relative z-10"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 p-1 shadow-lg"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-4xl">
                                        🔐
                                    </div>
                                </motion.div>
                                <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                                    Forgot Password?
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    No worries, we'll send you reset instructions
                                </p>
                            </motion.div>

                            {!success ? (
                                <>
                                    {/* Error Message */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl relative z-10"
                                        >
                                            <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                                                <span className="mr-2">⚠️</span>
                                                {error}
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Form */}
                                    <motion.form
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
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
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                                                    placeholder="your.email@example.com"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    📧
                                                </div>
                                            </motion.div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        ⏳
                                                    </motion.span>
                                                    <span>Sending...</span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <span>Send Reset Link</span>
                                                    <span>→</span>
                                                </span>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center relative z-10"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                        className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-4xl"
                                    >
                                        ✅
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        Check Your Email
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        We've sent password reset instructions to<br />
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">{email}</span>
                                    </p>
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                        <p className="text-sm text-blue-800 dark:text-blue-300">
                                            📬 Didn't receive the email? Check your spam folder or try again.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Footer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-6 text-center relative z-10"
                            >
                                <Link
                                    to="/login"
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors inline-flex items-center space-x-2"
                                >
                                    <span>←</span>
                                    <span>Back to Login</span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPassword;
