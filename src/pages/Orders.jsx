import { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Orders = () => {
    const { user } = useAuth();
    const [orders] = useState([
        {
            id: 1,
            orderNumber: 'ORD-2024-001',
            date: '2024-01-29',
            time: '12:30 PM',
            items: [
                { name: 'Chicken Biryani', quantity: 1, price: 120 },
                { name: 'Lassi', quantity: 1, price: 35 }
            ],
            total: 155,
            status: 'delivered',
            deliveryTime: '12:45 PM'
        },
        {
            id: 2,
            orderNumber: 'ORD-2024-002',
            date: '2024-01-29',
            time: '3:15 PM',
            items: [
                { name: 'Samosa', quantity: 2, price: 30 },
                { name: 'Chai', quantity: 1, price: 10 }
            ],
            total: 40,
            status: 'ready',
            deliveryTime: 'Ready for pickup'
        },
        {
            id: 3,
            orderNumber: 'ORD-2024-003',
            date: '2024-01-29',
            time: '7:00 PM',
            items: [
                { name: 'Veg Thali', quantity: 1, price: 90 }
            ],
            total: 90,
            status: 'preparing',
            estimatedTime: '15 mins'
        }
    ]);

    if (!user) {
        return <Navigate to="/login" />;
    }

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-500 text-white',
            preparing: 'bg-blue-500 text-white pulse-glow',
            ready: 'bg-green-500 text-white',
            delivered: 'bg-gray-500 text-white'
        };

        const labels = {
            pending: '⏳ Pending',
            preparing: '👨‍🍳 Preparing',
            ready: '✅ Ready',
            delivered: '📦 Delivered'
        };

        return (
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badges[status]}`}>
                {labels[status]}
            </span>
        );
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

                {/* Orders List */}
                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card-glass p-6"
                            >
                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {order.orderNumber}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {order.date} at {order.time}
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

                                {/* Order Footer */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-dark-700">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {order.status === 'delivered' && `Delivered at ${order.deliveryTime}`}
                                        {order.status === 'ready' && order.deliveryTime}
                                        {order.status === 'preparing' && `Estimated: ${order.estimatedTime}`}
                                    </div>
                                    <div className="text-xl font-bold text-primary-500">
                                        Total: ₹{order.total}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No orders yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Start ordering delicious food from our menu
                        </p>
                        <a href="/menu" className="btn-primary">
                            Browse Menu
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Orders;
