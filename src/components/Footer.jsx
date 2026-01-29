import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-dark-800 p-1.5 shadow-lg">
                                <img src="/logo.png" alt="HostelBite Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-2xl font-display font-bold text-gradient">
                                HostelBite
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                            Your favorite hostel canteen, now just a click away. Fresh, hygienic, and delicious food delivered right to your room.
                        </p>
                        <div className="flex space-x-4">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="#"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors duration-300"
                            >
                                <span className="text-xl">📘</span>
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="#"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors duration-300"
                            >
                                <span className="text-xl">📷</span>
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="#"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors duration-300"
                            >
                                <span className="text-xl">🐦</span>
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/menu" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-300">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-300">
                                    Orders
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact</h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li className="flex items-center space-x-2">
                                <span>⏰</span>
                                <span>7:00 AM - 10:00 PM</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span>📞</span>
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span>📧</span>
                                <span>info@hostelbite.com</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span>📍</span>
                                <span>Hostel Campus</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-700 text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; {currentYear} HostelBite. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
