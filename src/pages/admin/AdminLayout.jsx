import { Outlet, Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const AdminLayout = () => {
    const { user, isAdmin, logout } = useAuth();
    const location = useLocation();
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    if (!user || !isAdmin) {
        return <Navigate to="/login" />;
    }

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊', gradient: 'from-blue-500 to-cyan-500' },
        { name: 'Manage Menu', path: '/admin/menu', icon: '🍽️', gradient: 'from-orange-500 to-red-500' },
        { name: 'Orders', path: '/admin/orders', icon: '📦', gradient: 'from-green-500 to-emerald-500' },
        { name: 'Feedback', path: '/admin/feedback', icon: '⭐', gradient: 'from-purple-500 to-pink-500' }
    ];

    const isActive = (path) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-dark-900 dark:via-purple-900/10 dark:to-pink-900/10 pt-20 relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 blur-3xl"
                />
            </div>

            <div className="flex relative z-10">
                {/* Enhanced Sidebar */}
                <motion.aside
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    className="w-72 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-r border-white/50 dark:border-gray-700/50 min-h-screen fixed left-0 top-20 shadow-2xl"
                >
                    <div className="p-6 h-full flex flex-col">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <div className="flex items-center space-x-3 mb-2">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg"
                                >
                                    👨‍💼
                                </motion.div>
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                        Admin Panel
                                    </h2>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Management Dashboard</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Navigation */}
                        <nav className="space-y-2 flex-1">
                            {menuItems.map((item, index) => {
                                const active = isActive(item.path);
                                return (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={item.path}
                                            className="relative group block"
                                        >
                                            {/* Glow Effect */}
                                            {active && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl blur opacity-30`}
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}

                                            {/* Menu Item */}
                                            <motion.div
                                                whileHover={{ scale: 1.02, x: 5 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`relative flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${active
                                                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                                                        : 'bg-gray-50/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                    }`}
                                            >
                                                <motion.span
                                                    animate={active ? { rotate: [0, 10, -10, 0] } : {}}
                                                    transition={{ duration: 0.5 }}
                                                    className="text-2xl"
                                                >
                                                    {item.icon}
                                                </motion.span>
                                                <span className="font-semibold">
                                                    {item.name}
                                                </span>
                                                {active && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="ml-auto w-2 h-2 rounded-full bg-white"
                                                    />
                                                )}
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        {/* User Info & Logout */}
                        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                            {/* User Card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="mb-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                                        {user.name?.charAt(0) || 'A'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Logout Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={logout}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-red-500/50 transition-shadow flex items-center justify-center space-x-2"
                            >
                                <span>🚪</span>
                                <span>Logout</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.aside>

                {/* Main Content */}
                <main className="flex-1 ml-72 min-h-screen flex flex-col">
                    <div className="flex-1 p-8">
                        <Outlet />
                    </div>

                    {/* Enhanced Footer */}
                    <motion.footer
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-t border-white/50 dark:border-gray-700/50 mt-auto"
                    >
                        <div className="px-8 py-6">
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                                {/* Left Side */}
                                <div className="flex items-center space-x-4">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg"
                                    >
                                        🍽️
                                    </motion.div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            HostelBite Admin
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            © 2024 All rights reserved
                                        </p>
                                    </div>
                                </div>

                                {/* Center - Quick Stats */}
                                <div className="flex items-center space-x-6">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="text-center"
                                    >
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Status</p>
                                        <div className="flex items-center space-x-1">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="w-2 h-2 rounded-full bg-green-500"
                                            />
                                            <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                                                Online
                                            </p>
                                        </div>
                                    </motion.div>

                                    <div className="h-8 w-px bg-gray-300 dark:bg-gray-700" />

                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="text-center"
                                    >
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Version</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            v2.0.0
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Right Side - Links */}
                                <div className="flex items-center space-x-4 text-sm">
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        href="mailto:support@hostelbite.com"
                                        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                    >
                                        📧 Support
                                    </motion.a>
                                    <span className="text-gray-300 dark:text-gray-700">•</span>
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        href="#"
                                        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                    >
                                        📚 Docs
                                    </motion.a>
                                    <span className="text-gray-300 dark:text-gray-700">•</span>
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        href="#"
                                        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                    >
                                        ⚙️ Settings
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.footer>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
