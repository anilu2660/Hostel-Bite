import { useState } from 'react';
import { motion } from 'framer-motion';

const OrdersList = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            orderNumber: 'ORD-2024-001',
            customer: 'John Doe',
            room: 'H-101, Room 205',
            items: [
                { name: 'Chicken Biryani', quantity: 1, price: 120 },
                { name: 'Lassi', quantity: 1, price: 35 }
            ],
            total: 155,
            status: 'preparing',
            time: '12:30 PM'
        },
        {
            id: 2,
            orderNumber: 'ORD-2024-002',
            customer: 'Jane Smith',
            room: 'H-102, Room 310',
            items: [
                { name: 'Samosa', quantity: 2, price: 30 },
                { name: 'Chai', quantity: 1, price: 10 }
            ],
            total: 40,
            status: 'ready',
            time: '3:15 PM'
        },
        {
            id: 3,
            orderNumber: 'ORD-2024-003',
            customer: 'Mike Johnson',
            room: 'H-103, Room 115',
            items: [
                { name: 'Veg Thali', quantity: 1, price: 90 }
            ],
            total: 90,
            status: 'pending',
            time: '7:00 PM'
        }
    ]);

    const updateOrderStatus = (id, newStatus) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-500',
            preparing: 'bg-blue-500',
            ready: 'bg-green-500',
            delivered: 'bg-gray-500'
        };
        return colors[status] || 'bg-gray-500';
    };

    const statusOptions = ['pending', 'preparing', 'ready', 'delivered'];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Orders Management
            </h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <motion.div
                        key={order.id}
                        layout
                        className="card-glass p-6"
                    >
                        {/* Order Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-gray-200 dark:border-dark-700">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {order.orderNumber}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {order.customer} • {order.room}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                    Ordered at {order.time}
                                </p>
                            </div>

                            {/* Status Selector */}
                            <div className="mt-4 md:mt-0">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Order Status
                                </label>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    className="input-field"
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
                                    <div key={index} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700 dark:text-gray-300">
                                            {item.name} x{item.quantity}
                                        </span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            ₹{item.price * item.quantity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Total */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-dark-700">
                            <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <span className="text-2xl font-bold text-primary-500">
                                Total: ₹{order.total}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OrdersList;
