import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';

const Dashboard = () => {
    const stats = [
        { label: 'Total Orders Today', value: '156', icon: '📦', color: 'from-blue-500 to-blue-600' },
        { label: 'Revenue Today', value: '₹12,450', icon: '💰', color: 'from-green-500 to-green-600' },
        { label: 'Active Orders', value: '23', icon: '🔥', color: 'from-orange-500 to-orange-600' },
        { label: 'Total Menu Items', value: '22', icon: '🍽️', color: 'from-purple-500 to-purple-600' }
    ];

    const recentOrders = [
        { id: 'ORD-001', customer: 'John Doe', items: 'Chicken Biryani x1', total: 120, status: 'preparing' },
        { id: 'ORD-002', customer: 'Jane Smith', items: 'Samosa x2, Chai x1', total: 40, status: 'ready' },
        { id: 'ORD-003', customer: 'Mike Johnson', items: 'Veg Thali x1', total: 90, status: 'delivered' },
        { id: 'ORD-004', customer: 'Sarah Williams', items: 'Paneer Butter Masala x1', total: 80, status: 'preparing' },
        { id: 'ORD-005', customer: 'Tom Brown', items: 'Cold Coffee x1', total: 40, status: 'ready' }
    ];

    const getStatusBadge = (status) => {
        const badges = {
            preparing: 'bg-blue-500 text-white',
            ready: 'bg-green-500 text-white',
            delivered: 'bg-gray-500 text-white'
        };
        return badges[status] || 'bg-gray-500 text-white';
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Dashboard
            </h1>

            {/* Stats Grid */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={staggerItem}
                        whileHover={{ y: -5 }}
                        className="card-glass p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Recent Orders */}
            <div className="card-glass p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Recent Orders
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-dark-700">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Order ID</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Customer</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Items</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Total</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{order.customer}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{order.items}</td>
                                    <td className="py-3 px-4 text-sm font-semibold text-primary-500">₹{order.total}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
