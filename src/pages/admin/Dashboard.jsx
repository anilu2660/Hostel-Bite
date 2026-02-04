import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';
import { useState, useEffect } from 'react';
import { statsService } from '../../services/statsService';
import { orderService } from '../../services/orderService';
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
            bgColor: 'from-blue-500/10 to-cyan-500/10',
            shadowColor: 'shadow-blue-500/50'
        },
        {
            label: 'Revenue Today',
            value: stats.revenueToday || 0,
            icon: '💰',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-500/10 to-emerald-500/10',
            prefix: '₹',
            shadowColor: 'shadow-green-500/50'
        },
        {
            label: 'Active Orders',
            value: stats.activeOrders || 0,
            icon: '🔥',
            color: 'from-orange-500 to-red-500',
            bgColor: 'from-orange-500/10 to-red-500/10',
            shadowColor: 'shadow-orange-500/50'
        },
        {
            label: 'Total Menu Items',
            value: stats.totalMenuItems || 0,
            icon: '🍽️',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'from-purple-500/10 to-pink-500/10',
            shadowColor: 'shadow-purple-500/50'
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
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 100 - 50, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        className="absolute w-2 h-2 bg-purple-500 rounded-full blur-sm"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 relative z-10"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-5xl font-black mb-2 flex items-center space-x-3">
                            <motion.span
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="text-6xl"
                            >
                                📊
                            </motion.span>
                            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
                                Dashboard
                            </span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Welcome back! Here's what's happening today.
                        </p>
                    </div>

                    {/* Time Display */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 px-6 py-3 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {new Date().toLocaleTimeString()}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Enhanced Stats Grid with 3D Effects */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 p-6 rounded-2xl animate-pulse">
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
                            whileHover={{
                                y: -15,
                                scale: 1.03,
                                rotateY: 5,
                                rotateX: 5,
                            }}
                            className="relative group cursor-pointer"
                            style={{
                                transformStyle: 'preserve-3d',
                                perspective: '1000px',
                            }}
                        >
                            {/* Animated Glow Effect */}
                            <motion.div
                                className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`}
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                            />

                            {/* Card */}
                            <div className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">
                                {/* Animated Background Pattern */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor}`}
                                    animate={{
                                        backgroundPosition: ['0% 0%', '100% 100%'],
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                    }}
                                />

                                {/* Floating Shapes */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 180, 360],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                    }}
                                    className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-r ${stat.color} rounded-full opacity-10 blur-2xl`}
                                />

                                <div className="relative z-10">
                                    {/* Icon with 3D Effect */}
                                    <motion.div
                                        whileHover={{
                                            rotate: [0, -10, 10, -10, 0],
                                            scale: 1.2,
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-center justify-between mb-4"
                                    >
                                        <motion.div
                                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-4xl shadow-2xl ${stat.shadowColor}`}
                                            animate={{
                                                boxShadow: [
                                                    '0 10px 30px rgba(0,0,0,0.1)',
                                                    '0 20px 40px rgba(0,0,0,0.2)',
                                                    '0 10px 30px rgba(0,0,0,0.1)',
                                                ],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                            }}
                                        >
                                            {stat.icon}
                                        </motion.div>

                                        {/* Pulse Indicator */}
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [1, 0.5, 1],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className={`w-4 h-4 rounded-full bg-gradient-to-r ${stat.color} shadow-lg`}
                                        />
                                    </motion.div>

                                    {/* Value with Gradient */}
                                    <motion.div
                                        className={`text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: index * 0.1 }}
                                    >
                                        <AnimatedNumber end={stat.value} prefix={stat.prefix || ''} />
                                    </motion.div>

                                    {/* Label */}
                                    <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wide">
                                        {stat.label}
                                    </div>

                                    {/* Progress Bar */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 1, delay: index * 0.2 }}
                                        className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                                    >
                                        <motion.div
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className={`h-full w-1/2 bg-gradient-to-r ${stat.color}`}
                                        />
                                    </motion.div>
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
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 p-8 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center space-x-3">
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-4xl"
                            >
                                📋
                            </motion.span>
                            <span>Recent Orders</span>
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/admin/orders')}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold shadow-xl hover:shadow-purple-500/50 transition-shadow flex items-center space-x-2"
                        >
                            <span>View All</span>
                            <span>→</span>
                        </motion.button>
                    </div>

                    {/* Table */}
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : recentOrders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-6xl mb-4"
                            >
                                📦
                            </motion.div>
                            <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold">No orders yet</p>
                        </motion.div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                                        <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                                        <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Items</th>
                                        <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Total</th>
                                        <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
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
                                                whileHover={{
                                                    backgroundColor: 'rgba(139, 92, 246, 0.05)',
                                                    scale: 1.01,
                                                }}
                                                className="border-b border-gray-100 dark:border-gray-800 transition-all cursor-pointer"
                                                onClick={() => navigate('/admin/orders')}
                                            >
                                                <td className="py-4 px-4">
                                                    <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                        {order.orderNumber}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center space-x-3">
                                                        <motion.div
                                                            whileHover={{ rotate: 360 }}
                                                            transition={{ duration: 0.5 }}
                                                            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg"
                                                        >
                                                            {(order.user?.name || 'U').charAt(0).toUpperCase()}
                                                        </motion.div>
                                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                            {order.user?.name || 'Customer'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="text-sm font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                        ₹{order.totalAmount}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <motion.span
                                                        whileHover={{ scale: 1.1 }}
                                                        className={`inline-flex items-center space-x-1 px-4 py-2 rounded-full text-xs font-bold ${statusBadge.bg} ${statusBadge.text} shadow-lg`}
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
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
