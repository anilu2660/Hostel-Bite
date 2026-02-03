import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        hostelId: '',
        roomNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const verifyingRef = useRef(false);

    if (user) {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const getPasswordStrength = (password) => {
        if (password.length === 0) return { strength: 0, label: '', color: '' };
        if (password.length < 6) return { strength: 33, label: 'Weak', color: 'from-red-500 to-red-600' };
        if (password.length < 10) return { strength: 66, label: 'Medium', color: 'from-yellow-500 to-orange-500' };
        return { strength: 100, label: 'Strong', color: 'from-green-500 to-emerald-500' };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
        setOtp(newOtp);

        const nextIndex = Math.min(pastedData.length, 5);
        document.getElementById(`otp-${nextIndex}`)?.focus();
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
            const result = await authService.register({
                name: formData.name,
                email: formData.email,
                hostelId: formData.hostelId,
                roomNumber: formData.roomNumber,
                password: formData.password
            });

            if (result.success) {
                setStep(2);
                startResendCooldown();
            } else {
                setError(result.message || 'Failed to create account');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            setError('Please enter the complete 6-digit OTP');
            return;
        }


        if (loading || verifyingRef.current) return;


        setError('');
        setSuccess('');
        verifyingRef.current = true;
        setLoading(true);

        try {
            const result = await authService.verifyOTP(formData.email, otpCode);

            if (result.success) {

                setError('');
                setSuccess('✅ Email verified successfully! Redirecting to your account...');

                setUser(result.data);

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                verifyingRef.current = false;
                setError(result.message || 'Invalid OTP');
                setOtp(['', '', '', '', '', '']);
                document.getElementById('otp-0')?.focus();
            }
        } catch (err) {
            verifyingRef.current = false;
            const errorMessage = err.response?.data?.message || 'Failed to verify OTP. Please try again.';


            if (errorMessage.includes('already verified')) {
                setSuccess('✅ Email already verified! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(errorMessage);
                setOtp(['', '', '', '', '', '']);
                document.getElementById('otp-0')?.focus();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;

        setError('');
        setLoading(true);

        try {
            const result = await authService.sendOTP(formData.email);

            if (result.success) {
                startResendCooldown();
            } else {
                setError(result.message || 'Failed to resend OTP');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const startResendCooldown = () => {
        setResendCooldown(60);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 30, 0],
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, 50, 0],
                        x: [0, -40, 0],
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, -25, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-15 blur-3xl"
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
                                    whileHover={{ scale: 1.1, rotateY: 180 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 p-1 shadow-lg"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-4xl">
                                        🎓
                                    </div>
                                </motion.div>
                                <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                                    Create Account
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Join HostelBite today
                                </p>
                            </motion.div>

                            {/* Step Indicator */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center justify-center mb-8 relative z-10"
                            >
                                <div className="flex items-center space-x-4">
                                    <motion.div
                                        animate={{
                                            scale: step === 1 ? [1, 1.2, 1] : 1,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: step === 1 ? Infinity : 0,
                                            repeatDelay: 2
                                        }}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step === 1
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                                            : 'bg-green-500 text-white'
                                            }`}
                                    >
                                        {step > 1 ? '✓' : '1'}
                                    </motion.div>
                                    <div className={`h-1 w-16 rounded-full transition-all duration-500 ${step === 2 ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-300 dark:bg-gray-700'
                                        }`} />
                                    <motion.div
                                        animate={{
                                            scale: step === 2 ? [1, 1.2, 1] : 1,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: step === 2 ? Infinity : 0,
                                            repeatDelay: 2
                                        }}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step === 2
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                                            : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                            }`}
                                    >
                                        2
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Error and Success Messages */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl relative z-10"
                                    >
                                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                                            <span className="mr-2">⚠️</span>
                                            {error}
                                        </p>
                                    </motion.div>
                                )}
                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl relative z-10"
                                    >
                                        <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                                            <span className="mr-2">✅</span>
                                            {success}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Step 1: Registration Form */}
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-5 relative z-10"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name
                                            </label>
                                            <motion.input
                                                whileFocus={{ scale: 1.02 }}
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            <motion.input
                                                whileFocus={{ scale: 1.02 }}
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Hostel ID
                                                </label>
                                                <motion.input
                                                    whileFocus={{ scale: 1.02 }}
                                                    type="text"
                                                    name="hostelId"
                                                    required
                                                    value={formData.hostelId}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                                                    placeholder="H-101"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Room Number
                                                </label>
                                                <motion.input
                                                    whileFocus={{ scale: 1.02 }}
                                                    type="text"
                                                    name="roomNumber"
                                                    required
                                                    value={formData.roomNumber}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                                                    placeholder="205"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <motion.input
                                                    whileFocus={{ scale: 1.02 }}
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    required
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none pr-12"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                                >
                                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                                </button>
                                            </div>
                                            {formData.password && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="mt-2"
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                                            Password Strength: <span className="font-semibold">{passwordStrength.label}</span>
                                                        </span>
                                                    </div>
                                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${passwordStrength.strength}%` }}
                                                            transition={{ duration: 0.3 }}
                                                            className={`h-full bg-gradient-to-r ${passwordStrength.color} rounded-full`}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <motion.input
                                                    whileFocus={{ scale: 1.02 }}
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="confirmPassword"
                                                    required
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none pr-12"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                                >
                                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                                </button>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        ⏳
                                                    </motion.span>
                                                    <span>Creating Account...</span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <span>Sign Up</span>
                                                    <span>→</span>
                                                </span>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}

                                {/* Step 2: OTP Verification */}
                                {step === 2 && (
                                    <motion.div
                                        key="otp"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative z-10"
                                    >
                                        <div className="text-center mb-6">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", duration: 0.6 }}
                                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-3xl"
                                            >
                                                📧
                                            </motion.div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                Verify Your Email
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                We've sent a 6-digit code to<br />
                                                <span className="font-semibold text-purple-600 dark:text-purple-400">{formData.email}</span>
                                            </p>
                                        </div>

                                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                                            <div className="flex justify-center gap-3">
                                                {otp.map((digit, index) => (
                                                    <motion.input
                                                        key={index}
                                                        initial={{ scale: 0, rotateY: -180 }}
                                                        animate={{ scale: 1, rotateY: 0 }}
                                                        transition={{ delay: index * 0.1, type: "spring" }}
                                                        whileFocus={{ scale: 1.1, y: -5 }}
                                                        id={`otp-${index}`}
                                                        type="text"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                        onPaste={index === 0 ? handleOtpPaste : undefined}
                                                        className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                                                        style={{ transformStyle: "preserve-3d" }}
                                                    />
                                                ))}
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? (
                                                    <span className="flex items-center justify-center space-x-2">
                                                        <motion.span
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        >
                                                            ⏳
                                                        </motion.span>
                                                        <span>Verifying...</span>
                                                    </span>
                                                ) : (
                                                    'Verify & Continue'
                                                )}
                                            </motion.button>

                                            <div className="text-center">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                    Didn't receive the code?
                                                </p>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    type="button"
                                                    onClick={handleResendOtp}
                                                    disabled={resendCooldown > 0 || loading}
                                                    className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                                                </motion.button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Footer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-6 text-center relative z-10"
                            >
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
                                    >
                                        Login
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

export default Signup;
