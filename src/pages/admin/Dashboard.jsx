import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';
import { useState, useEffect } from 'react';
import { statsService } from '../../services/statsService';
import { orderService } from '../../services/orderService';
import { menuService } from '../../services/menuService';
import { useNavigate } from 'react-router-dom';

const AnimatedNumber = ({ end, duration = 2, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalOrdersToday: 0,
        revenueToday: 0,
        activeOrders: 0,
        totalMenuItems: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        fetchDashboardData();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchDashboardData, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch stats
            const statsResponse = await statsService.getDashboardStats();
            if (statsResponse.success) {
                setStats(statsResponse.data);
            }

            // Fetch recent orders
            const ordersResponse = await orderService.getAllOrders();
            if (ordersResponse.success) {
                // Get latest 5 orders
                const latest = ordersResponse.data
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);
                setRecentOrders(latest);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statsCards = [
        {
            label: 'Total Orders Today',
            value: stats.totalOrdersToday || 0,
            icon: '📦',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'from-blue-500/20 to-cyan-500/20'
        },
        {
            label: 'Revenue Today',
            value: stats.revenueToday || 0,
            icon: '💰',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-500/20 to-emerald-500/20',
            prefix: '₹'
        },
        {
            label: 'Active Orders',
            value: stats.activeOrders || 0,
            icon: '🔥',
            color: 'from-orange-500 to-red-500',
            bgColor: 'from-orange-500/20 to-red-500/20'
        },
        {
            label: 'Total Menu Items',
            value: stats.totalMenuItems || 0,
            icon: '🍽️',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'from-purple-500/20 to-pink-500/20'
        }
    ];

    const getStatusBadge = (status) => {
        const badges = {
            pending: { bg: 'bg-gradient-to-r from-yellow-500 to-orange-500', text: 'text-white', icon: '⏳' },
            preparing: { bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', text: 'text-white', icon: '👨‍🍳' },
            ready: { bg: 'bg-gradient-to-r from-green-500 to-emerald-500', text: 'text-white', icon: '✅' },
            delivered: { bg: 'bg-gradient-to-r from-gray-500 to-gray-600', text: 'text-white', icon: '🎉' },
            cancelled: { bg: 'bg-gradient-to-r from-red-500 to-red-600', text: 'text-white', icon: '❌' }
        };
        return badges[status] || badges.pending;
    };

    return (
        <div className="relative">
            {/* Background Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -50, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 blur-3xl"
                />
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 relative z-10"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                    Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
            </motion.div>

            {/* Enhanced Stats Grid with 3D Effects */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="card-glass p-6 animate-pulse">
                            <div className="h-14 w-14 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10"
                >
                    {statsCards.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="relative group"
                            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                        >
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />

                            {/* Card */}
                            <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
                                {/* Background Pattern */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`} />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.2 }}
                                        transition={{ duration: 0.6 }}
                                        className="flex items-center justify-between mb-4"
                                    >
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl shadow-lg`}>
                                            {stat.icon}
                                        </div>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color}`}
                                        />
                                    </motion.div>

                                    {/* Value */}
                                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                                        <AnimatedNumber end={stat.value} prefix={stat.prefix || ''} />
                                    </div>

                                    {/* Label */}
                                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Recent Orders with Enhanced Design */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative z-10"
            >
                <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                            <span>Recent Orders</span>
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                📋
                            </motion.span>
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/admin/orders')}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg hover:shadow-purple-500/50 transition-shadow"
                        >
                            View All
                        </motion.button>
                    </div>

                    {/* Table */}
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                            ))}
                        </div>
                    ) : recentOrders.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-2">📦</div>
                            <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Order ID</th>
                                        <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Customer</th>
                                        <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Items</th>
                                        <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Total</th>
                                        <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order, index) => {
                                        const statusBadge = getStatusBadge(order.status);
                                        return (
                                            <motion.tr
                                                key={order._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.05)' }}
                                                className="border-b border-gray-100 dark:border-gray-800 transition-colors cursor-pointer"
                                                onClick={() => navigate('/admin/orders')}
                                            >
                                                <td className="py-4 px-4">
                                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                                        {order.orderNumber}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                                                            {(order.user?.name || 'U').charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {order.user?.name || 'Customer'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                                                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                        ₹{order.totalAmount}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <motion.span
                                                        whileHover={{ scale: 1.05 }}
                                                        className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold ${statusBadge.bg} ${statusBadge.text} shadow-lg`}
                                                    >
                                                        <span>{statusBadge.icon}</span>
                                                        <span className="capitalize">{order.status}</span>
                                                    </motion.span>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
