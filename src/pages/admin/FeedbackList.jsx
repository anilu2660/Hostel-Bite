import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { feedbackService } from '../../services/feedbackService';
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
        <div className="p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-5xl mr-3">⭐</span>
                    Feedback Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    View and manage customer feedback and ratings
                </p>
            </motion.div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-4xl mb-2">📊</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.totalFeedback}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-4xl mb-2">⭐</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.averageRating.toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-4xl mb-2">⏳</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.statusCounts.find(s => s._id === 'pending')?.count || 0}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-4xl mb-2">✅</div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.statusCounts.find(s => s._id === 'resolved')?.count || 0}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Resolved</div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
            >
                <div className="flex flex-wrap gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Status
                        </label>
                        <select
                            value={filter.status}
                            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                            className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 outline-none"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Rating
                        </label>
                        <select
                            value={filter.rating}
                            onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
                            className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 outline-none"
                        >
                            <option value="all">All Ratings</option>
                            <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                            <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                            <option value="3">⭐⭐⭐ (3 stars)</option>
                            <option value="2">⭐⭐ (2 stars)</option>
                            <option value="1">⭐ (1 star)</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Feedback List */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
                    />
                </div>
            ) : feedback.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700"
                >
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No Feedback Found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        No feedback matches your current filters
                    </p>
                </motion.div>
            ) : (
                <div className="space-y-4">
                    {feedback.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02, x: 10 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start space-x-4">
                                    <div className="text-4xl">{getCategoryIcon(item.category)}</div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {item.user?.name || 'Anonymous'}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {item.user?.email}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                            {item.user?.hostelId && `${item.user.hostelId} - Room ${item.user.roomNumber}`}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-2xl mb-1">{getRatingStars(item.rating)}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {item.message}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getStatusColor(item.status)}`}>
                                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                        {item.category.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>

                                <select
                                    value={item.status}
                                    onChange={(e) => updateStatus(item._id, e.target.value)}
                                    className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:border-primary-500 outline-none"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackList;
