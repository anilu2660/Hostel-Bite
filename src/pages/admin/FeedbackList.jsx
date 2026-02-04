import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { feedbackService } from '../../services/feedbackService';
import { staggerContainer, staggerItem } from '../../utils/animations';
import toast from 'react-hot-toast';

const FeedbackList = () => {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ status: 'all', rating: 'all' });
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchFeedback();
        fetchStats();
        // Auto-refresh every 30 seconds
        const interval = setInterval(() => {
            fetchFeedback();
            fetchStats();
        }, 30000);
        return () => clearInterval(interval);
    }, [filter]);

    const fetchFeedback = async () => {
        try {
            setLoading(true);
            const filters = {};
            if (filter.status !== 'all') filters.status = filter.status;
            if (filter.rating !== 'all') filters.rating = filter.rating;

            const response = await feedbackService.getAllFeedback(filters);
            if (response.success) {
                setFeedback(response.data);
            }
        } catch (error) {
            console.error('Error fetching feedback:', error);
            toast.error('Failed to load feedback');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await feedbackService.getFeedbackStats();
            if (response.success) {
                setStats(response.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await feedbackService.updateFeedbackStatus(id, { status: newStatus });
            if (response.success) {
                toast.success(`Status updated to ${newStatus}`);
                fetchFeedback();
                fetchStats();
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    const getRatingStars = (rating) => {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const getCategoryIcon = (category) => {
        const icons = {
            food_quality: '🍽️',
            service: '👨‍🍳',
            delivery: '🚚',
            app_experience: '📱',
            other: '💬',
        };
        return icons[category] || '💬';
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'from-yellow-500 to-orange-500',
            reviewed: 'from-blue-500 to-cyan-500',
            resolved: 'from-green-500 to-emerald-500',
        };
        return colors[status] || 'from-gray-500 to-gray-600';
    };

    return (
        <div className="relative">
            {/* Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        className="absolute w-2 h-2 bg-purple-500/20 rounded-full blur-sm"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent flex items-center gap-3">
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                ⭐
                            </motion.span>
                            Feedback Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Insights from your customers
                        </p>
                    </div>

                    {/* Stats Summary */}
                    {stats && (
                        <div className="flex gap-4">
                            <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 p-3 rounded-2xl border border-white/50 dark:border-gray-700/50 flex items-center gap-3">
                                <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-600 dark:text-yellow-400">
                                    ⭐ {stats.averageRating.toFixed(1)}
                                </div>
                                <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Average Rating
                                </div>
                            </div>
                            <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 p-3 rounded-2xl border border-white/50 dark:border-gray-700/50 flex items-center gap-3">
                                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400">
                                    💬 {stats.totalFeedback}
                                </div>
                                <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Total Reviews
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap gap-4 backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 p-4 rounded-2xl border border-white/50 dark:border-gray-700/50">
                    <select
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="resolved">Resolved</option>
                    </select>

                    <select
                        value={filter.rating}
                        onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
                        className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium"
                    >
                        <option value="all">All Ratings</option>
                        <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                        <option value="3">⭐⭐⭐ (3 Stars)</option>
                        <option value="2">⭐⭐ (2 Stars)</option>
                        <option value="1">⭐ (1 Star)</option>
                    </select>
                </div>

                {/* Feedback Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="card-glass p-6 animate-pulse bg-white/40 dark:bg-gray-900/40 rounded-3xl h-64"></div>
                        ))}
                    </div>
                ) : feedback.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-700/50"
                    >
                        <div className="text-8xl mb-4">📭</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            No Feedback Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your filters
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <AnimatePresence>
                            {feedback.map((item) => (
                                <motion.div
                                    key={item._id}
                                    variants={staggerItem}
                                    layout
                                    whileHover={{ y: -5, scale: 1.01 }}
                                    className="relative group backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-6 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-xl overflow-hidden"
                                >
                                    {/* Gradient Border Effect on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        {/* User Info & Rating Header */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center text-2xl shadow-inner">
                                                    {getCategoryIcon(item.category)}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                                        {item.user?.name || 'Anonymous'}
                                                    </h3>
                                                    <div className="text-yellow-500 text-sm tracking-widest">
                                                        {getRatingStars(item.rating)}
                                                    </div>
                                                </div>
                                            </div>

                                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getStatusColor(item.status)} shadow-lg`}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Message Bubble */}
                                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 mb-6 relative">
                                            <div className="absolute top-0 left-6 w-4 h-4 bg-gray-50 dark:bg-gray-800/50 transform -translate-y-1/2 rotate-45"></div>
                                            <p className="text-gray-700 dark:text-gray-300 italic relative z-10 leading-relaxed">
                                                "{item.message}"
                                            </p>
                                        </div>

                                        {/* Footer Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <div className="text-xs text-gray-500 font-medium">
                                                {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500 font-medium">Mark as:</span>
                                                <div className="flex gap-1">
                                                    {['pending', 'reviewed', 'resolved'].map((status) => (
                                                        <button
                                                            key={status}
                                                            onClick={() => updateStatus(item._id, status)}
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${item.status === status
                                                                    ? `bg-gradient-to-r ${getStatusColor(status)} text-white shadow-md scale-110`
                                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                                }`}
                                                            title={status.charAt(0).toUpperCase() + status.slice(1)}
                                                        >
                                                            {status === 'pending' && '⏳'}
                                                            {status === 'reviewed' && '👀'}
                                                            {status === 'resolved' && '✅'}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default FeedbackList;
