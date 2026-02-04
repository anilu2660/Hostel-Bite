import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';
import { orderService } from '../../services/orderService';
import toast from 'react-hot-toast';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchOrders, 30000);
        return () => clearInterval(interval);
    }, [filter]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const filters = filter !== 'all' ? { status: filter } : {};
            const response = await orderService.getAllOrders(filters);

            if (response.success) {
                // Sort by date (newest first)
                const sortedOrders = response.data.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setOrders(sortedOrders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (id, newStatus) => {
        try {
            const response = await orderService.updateOrderStatus(id, newStatus);

            if (response.success) {
                toast.success(`Order status updated to ${newStatus}`);
                fetchOrders(); // Refresh the list
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error(error.response?.data?.message || 'Failed to update order status');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-gradient-to-r from-yellow-500 to-orange-500',
            preparing: 'bg-gradient-to-r from-blue-500 to-cyan-500',
            ready: 'bg-gradient-to-r from-green-500 to-emerald-500',
            delivered: 'bg-gradient-to-r from-gray-500 to-gray-600',
            cancelled: 'bg-gradient-to-r from-red-500 to-red-600'
        };
        return colors[status] || 'bg-gray-500';
    };

    const statusOptions = ['pending', 'preparing', 'ready', 'delivered', 'cancelled'];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Stats calculation
    const getStats = () => {
        const total = orders.length;
        const pending = orders.filter(o => o.status === 'pending').length;
        const preparing = orders.filter(o => o.status === 'preparing').length;
        const revenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
        return { total, pending, preparing, revenue };
    };

    const stats = getStats();

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
                        className="absolute w-2 h-2 bg-green-500/20 rounded-full blur-sm"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="flex flex-col gap-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent flex items-center gap-3">
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                📦
                            </motion.span>
                            Orders Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Track and manage items orders in real-time
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-2">
                        {['all', 'pending', 'preparing', 'ready', 'delivered', 'cancelled'].map((option) => (
                            <button
                                key={option}
                                onClick={() => setFilter(option)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-300 ${filter === option
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="card-glass p-4 border-l-4 border-blue-500">
                        <p className="text-xs text-gray-500 uppercase font-bold">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                    </div>
                    <div className="card-glass p-4 border-l-4 border-yellow-500">
                        <p className="text-xs text-gray-500 uppercase font-bold">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>
                    <div className="card-glass p-4 border-l-4 border-purple-500">
                        <p className="text-xs text-gray-500 uppercase font-bold">Preparing</p>
                        <p className="text-2xl font-bold text-purple-600">{stats.preparing}</p>
                    </div>
                    <div className="card-glass p-4 border-l-4 border-green-500">
                        <p className="text-xs text-gray-500 uppercase font-bold">Revenue</p>
                        <p className="text-2xl font-bold text-green-600">₹{stats.revenue}</p>
                    </div>
                </div>

                {/* Orders List */}
                {loading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card-glass p-6 animate-pulse">
                                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                            </div>
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-700/50"
                    >
                        <div className="text-8xl mb-4 animate-bounce">📦</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {filter === 'all'
                                ? 'Orders will appear here when customers place them'
                                : `Change the filter to see other orders`
                            }
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        <AnimatePresence>
                            {orders.map((order) => (
                                <motion.div
                                    key={order._id}
                                    variants={staggerItem}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    whileHover={{ scale: 1.01 }}
                                    className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
                                >
                                    {/* Order Header */}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800 gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                                {(order.user?.name || 'C').charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                    Order #{order.orderNumber}
                                                    {order.status === 'pending' && (
                                                        <span className="flex h-3 w-3 relative">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                                                        </span>
                                                    )}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                    {order.user?.name} • {order.user?.email}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                    <span>📍 Room {order.deliveryAddress?.roomNumber}</span>
                                                    <span>•</span>
                                                    <span>{formatDate(order.createdAt)}, {formatTime(order.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Control */}
                                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-2 rounded-xl">
                                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 pl-2">Status:</span>
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide cursor-pointer outline-none transition-colors ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                                                            order.status === 'ready' ? 'bg-purple-100 text-purple-700' :
                                                                order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                                    'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Order Items */}
                                        <div className="md:col-span-2 space-y-3">
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                                Order Items ({order.items.length})
                                            </h4>
                                            <div className="space-y-2">
                                                {order.items.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="w-6 h-6 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                                                {item.quantity}x
                                                            </span>
                                                            <span className="font-medium text-gray-900 dark:text-white">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        <span className="font-bold text-gray-700 dark:text-gray-300">
                                                            ₹{item.price * item.quantity}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Order Details Side */}
                                        <div className="space-y-4">
                                            {/* Notes */}
                                            {order.notes && (
                                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                                                    <h4 className="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase mb-1">
                                                        📝 Note
                                                    </h4>
                                                    <p className="text-sm text-yellow-800 dark:text-yellow-300 italic">
                                                        "{order.notes}"
                                                    </p>
                                                </div>
                                            )}

                                            {/* Payment Info */}
                                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Payment Details</h4>
                                                <div className="flex justify-between items-center text-sm mb-1">
                                                    <span className="text-gray-600 dark:text-gray-400">Method</span>
                                                    <span className="font-medium text-gray-900 dark:text-white">Razorpay</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm mb-1">
                                                    <span className="text-gray-600 dark:text-gray-400">Transaction ID</span>
                                                    <span className="font-mono text-xs text-gray-500">{order.paymentId || 'N/A'}</span>
                                                </div>
                                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                                    <span className="font-bold text-gray-900 dark:text-white">Total</span>
                                                    <span className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                        ₹{order.totalAmount}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer / Progression Bar */}
                                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                            <span>Progress</span>
                                            <span>{Math.round((statusOptions.indexOf(order.status) + 1) / 5 * 100)}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full ${getStatusColor(order.status)}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(statusOptions.indexOf(order.status) + 1) / 5 * 100}%` }}
                                                transition={{ duration: 1 }}
                                            />
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

export default OrdersList;
