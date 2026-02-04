import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import toast from 'react-hot-toast';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await orderService.getUserOrders();

            if (response.success) {
                // Sort orders by date (newest first)
                const sortedOrders = response.data.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setOrders(sortedOrders);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError(err.response?.data?.message || 'Failed to load orders');
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <Navigate to="/login" />;
    }

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-500 text-white',
            preparing: 'bg-blue-500 text-white pulse-glow',
            ready: 'bg-green-500 text-white',
            delivered: 'bg-gray-500 text-white',
            cancelled: 'bg-red-500 text-white'
        };

        const labels = {
            pending: '⏳ Pending',
            preparing: '👨‍🍳 Preparing',
            ready: '✅ Ready',
            delivered: '📦 Delivered',
            cancelled: '❌ Cancelled'
        };

        return (
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badges[status] || badges.pending}`}>
                {labels[status] || status}
            </span>
        );
    };

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

    return (
        <motion.div
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark-900"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                        Your <span className="text-gradient">Orders</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Track and manage your food orders
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card-glass p-6 animate-pulse">
                                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    /* Error State */
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Failed to load orders
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {error}
                        </p>
                        <button
                            onClick={fetchOrders}
                            className="btn-primary"
                        >
                            Try Again
                        </button>
                    </div>
                ) : orders.length > 0 ? (
                    /* Orders List */
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card-glass p-6 hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Order #{order.orderNumber}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                                        </p>
                                    </div>
                                    <div className="mt-3 sm:mt-0">
                                        {getStatusBadge(order.status)}
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-2 mb-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {item.name}
                                                </span>
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                ₹{item.price * item.quantity}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Delivery Address */}
                                {order.deliveryAddress && (
                                    <div className="mb-4 p-3 bg-gray-100 dark:bg-dark-800 rounded-lg">
                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            📍 Delivery Address
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Hostel: {order.deliveryAddress.hostelId}, Room: {order.deliveryAddress.roomNumber}
                                        </p>
                                    </div>
                                )}

                                {/* Notes */}
                                {order.notes && (
                                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            📝 Notes
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {order.notes}
                                        </p>
                                    </div>
                                )}

                                {/* Order Footer */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-dark-700">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {order.status === 'delivered' && order.deliveredAt &&
                                            `Delivered at ${formatTime(order.deliveredAt)}`
                                        }
                                        {order.status === 'ready' && 'Ready for pickup'}
                                        {order.status === 'preparing' && 'Being prepared'}
                                        {order.status === 'pending' && 'Waiting for confirmation'}
                                    </div>
                                    <div className="text-xl font-bold text-primary-500">
                                        Total: ₹{order.totalAmount}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20">
                        <motion.div
                            className="text-6xl mb-4"
                            animate={{
                                rotate: [0, -10, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        >
                            📦
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No orders yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Start ordering delicious food from our menu
                        </p>
                        <a href="/menu" className="btn-primary inline-block">
                            Browse Menu
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Orders;
