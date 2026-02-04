import { Outlet, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const AdminLayout = () => {
    const { user, isAdmin, logout } = useAuth();

    if (!user || !isAdmin) {
        return <Navigate to="/login" />;
    }

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Manage Menu', path: '/admin/menu', icon: '🍽️' },
        { name: 'Orders', path: '/admin/orders', icon: '📦' },
        { name: 'Feedback', path: '/admin/feedback', icon: '⭐' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20">
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 min-h-screen fixed left-0 top-20">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gradient mb-6">Admin Panel</h2>
                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors duration-300 group"
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-500">
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-700">
                            <button
                                onClick={logout}
                                className="w-full btn-outline"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
