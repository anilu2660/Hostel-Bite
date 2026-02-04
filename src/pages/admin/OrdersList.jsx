import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
            pending: 'bg-yellow-500',
            preparing: 'bg-blue-500 pulse-glow',
            ready: 'bg-green-500',
            delivered: 'bg-gray-500',
            cancelled: 'bg-red-500'
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

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Orders Management
                </h1>

                {/* Filter */}
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Filter:
                    </label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="input-field"
                    >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="card-glass p-6 animate-pulse">
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                        </div>
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {filter === 'all'
                            ? 'Orders will appear here when customers place them'
                            : `Change the filter to see other orders`
                        }
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card-glass p-6 hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Order #{order.orderNumber}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {order.user?.name || 'Customer'} • {order.user?.email || 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        📍 {order.deliveryAddress?.hostelId || 'N/A'}, Room {order.deliveryAddress?.roomNumber || 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        🕐 Ordered on {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                                    </p>
                                </div>

                                {/* Status Selector */}
                                <div className="mt-4 md:mt-0">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Order Status
                                    </label>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        className="input-field min-w-[150px]"
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                    Order Items:
                                </h4>
                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center text-sm bg-gray-50 dark:bg-dark-800 p-3 rounded-lg">
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                {item.name} <span className="text-gray-500">x{item.quantity}</span>
                                            </span>
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                ₹{item.price * item.quantity}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Notes */}
                            {order.notes && (
                                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        📝 Customer Notes:
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {order.notes}
                                    </p>
                                </div>
                            )}

                            {/* Payment Info */}
                            {order.paymentId && (
                                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        💳 Payment Details:
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Payment ID: {order.paymentId}
                                    </p>
                                </div>
                            )}

                            {/* Order Footer */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-200 dark:border-dark-700 gap-3">
                                <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getStatusColor(order.status)} inline-block w-fit`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                                    <p className="text-2xl font-bold text-primary-500">
                                        ₹{order.totalAmount}
                                    </p>
                                </div>
                            </div>

                            {/* Timestamps */}
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                                <p>Created: {formatDate(order.createdAt)} at {formatTime(order.createdAt)}</p>
                                {order.updatedAt !== order.createdAt && (
                                    <p>Last Updated: {formatDate(order.updatedAt)} at {formatTime(order.updatedAt)}</p>
                                )}
                                {order.deliveredAt && (
                                    <p>Delivered: {formatDate(order.deliveredAt)} at {formatTime(order.deliveredAt)}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersList;
