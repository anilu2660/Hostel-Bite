import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { feedbackService } from '../services/feedbackService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Contact = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        rating: 0,
        category: 'other',
        message: '',
    });
    const [hoveredStar, setHoveredStar] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const categories = [
        { value: 'food_quality', label: '🍽️ Food Quality', icon: '🍽️' },
        { value: 'service', label: '👨‍🍳 Service', icon: '👨‍🍳' },
        { value: 'delivery', label: '🚚 Delivery', icon: '🚚' },
        { value: 'app_experience', label: '📱 App Experience', icon: '📱' },
        { value: 'other', label: '💬 Other', icon: '💬' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please login to submit feedback');
            return;
        }

        if (formData.rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        if (!formData.message.trim()) {
            toast.error('Please enter your feedback');
            return;
        }

        setLoading(true);

        try {
            const result = await feedbackService.submitFeedback(formData);

            if (result.success) {
                setSuccess(true);
                setFormData({ rating: 0, category: 'other', message: '' });
                toast.success('Thank you for your feedback!');

                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (error) {
            console.error('Feedback error:', error);
            toast.error(error.response?.data?.message || 'Failed to submit feedback');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-dark-900 dark:via-purple-900/20 dark:to-pink-900/20 pt-20 pb-12">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20 blur-3xl"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        animate={{
                            rotateY: [0, 360],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="inline-block text-8xl mb-6"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        📧
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                        Get In Touch
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We'd love to hear from you! Share your feedback and help us improve.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <motion.div
                            whileHover={{ y: -10, rotateY: 5 }}
                            className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 h-full"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="text-4xl mr-3">🍽️</span>
                                HostelBite
                            </h2>

                            <div className="space-y-6">
                                {/* Official Email */}
                                <motion.div
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800"
                                >
                                    <div className="text-3xl">📧</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email Us</h3>
                                        <a
                                            href="mailto:support@hostelbite.com"
                                            className="text-purple-600 dark:text-purple-400 hover:underline"
                                        >
                                            support@hostelbite.com
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Support Hours */}
                                <motion.div
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
                                >
                                    <div className="text-3xl">⏰</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Support Hours</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Monday - Sunday<br />
                                            8:00 AM - 10:00 PM
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Location */}
                                <motion.div
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800"
                                >
                                    <div className="text-3xl">📍</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Campus Hostel Canteen<br />
                                            Amity University Mumbai Campus
                                            Panvel, Maharashtra 410206
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotateZ: 2 }}
                                        className="text-center p-4 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200 dark:border-orange-800"
                                    >
                                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                            1000+
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Happy Students</div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotateZ: -2 }}
                                        className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800"
                                    >
                                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            24/7
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Service</div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Feedback Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <motion.div
                            whileHover={{ y: -10, rotateY: -5 }}
                            className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="text-4xl mr-3">⭐</span>
                                Share Your Feedback
                            </h2>

                            <AnimatePresence mode="wait">
                                {success ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="text-center py-12"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1, rotate: 360 }}
                                            transition={{ type: "spring", delay: 0.2 }}
                                            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-5xl"
                                        >
                                            ✅
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Thank You!
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Your feedback has been submitted successfully.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        {/* Rating Stars */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                                Rate Your Experience
                                            </label>
                                            <div className="flex items-center justify-center space-x-2 py-4">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <motion.button
                                                        key={star}
                                                        type="button"
                                                        whileHover={{ scale: 1.3, rotate: 15 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => setFormData({ ...formData, rating: star })}
                                                        onMouseEnter={() => setHoveredStar(star)}
                                                        onMouseLeave={() => setHoveredStar(0)}
                                                        className="focus:outline-none"
                                                    >
                                                        <span
                                                            className={`text-5xl transition-all duration-200 ${star <= (hoveredStar || formData.rating)
                                                                ? 'text-yellow-400 drop-shadow-lg'
                                                                : 'text-gray-300 dark:text-gray-600'
                                                                }`}
                                                        >
                                                            ⭐
                                                        </span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                            {formData.rating > 0 && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-center text-sm text-gray-600 dark:text-gray-400"
                                                >
                                                    {formData.rating === 5 && "Excellent! 🎉"}
                                                    {formData.rating === 4 && "Great! 👍"}
                                                    {formData.rating === 3 && "Good 👌"}
                                                    {formData.rating === 2 && "Fair 😐"}
                                                    {formData.rating === 1 && "Poor 😞"}
                                                </motion.p>
                                            )}
                                        </div>

                                        {/* Category Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                                Feedback Category
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {categories.map((cat) => (
                                                    <motion.button
                                                        key={cat.value}
                                                        type="button"
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => setFormData({ ...formData, category: cat.value })}
                                                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${formData.category === cat.value
                                                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                                                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                                            }`}
                                                    >
                                                        <span className="text-2xl block mb-1">{cat.icon}</span>
                                                        <span className="text-xs font-medium">{cat.label.split(' ')[1]}</span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Your Feedback
                                            </label>
                                            <motion.textarea
                                                whileFocus={{ scale: 1.02 }}
                                                id="message"
                                                rows="5"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 outline-none resize-none"
                                                placeholder="Tell us about your experience..."
                                                maxLength={1000}
                                            />
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                                                {formData.message.length}/1000
                                            </p>
                                        </div>

                                        {/* Submit Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={loading || !user}
                                            className="w-full py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        ⏳
                                                    </motion.span>
                                                    <span>Submitting...</span>
                                                </span>
                                            ) : !user ? (
                                                'Please Login to Submit Feedback'
                                            ) : (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <span>Submit Feedback</span>
                                                    <span>→</span>
                                                </span>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
