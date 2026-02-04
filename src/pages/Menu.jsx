import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/menuData';
import FoodCard from '../components/FoodCard';
import MenuBackground3D from '../components/effects/MenuBackground3D';
import FloatingBlobs from '../components/effects/FloatingBlobs';
import { pageTransition, staggerContainer, staggerItem } from '../utils/animations';
import { menuService } from '../services/menuService';
import toast from 'react-hot-toast';

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const response = await menuService.getMenuItems({ available: true });

            if (response.success) {
                setMenuItems(response.data);
            }
        } catch (error) {
            console.error('Error fetching menu items:', error);
            toast.error('Failed to load menu items');
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <motion.div
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark-900 relative overflow-hidden"
        >
            {/* 3D Background Effects */}
            <MenuBackground3D />
            <FloatingBlobs />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header with Animated Gradient */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 relative"
                >
                    {/* Gradient background blob */}
                    <div className="absolute inset-0 -z-10 flex items-center justify-center">
                        <motion.div
                            className="w-96 h-96 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-purple-500/20 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    </div>

                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                            Our Menu
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Fresh, delicious, and made with love ❤️
                    </motion.p>
                </motion.div>

                {/* Search Bar with Glass Effect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-10"
                >
                    <div className="max-w-xl mx-auto">
                        <div className="relative group">
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500"
                            />
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for delicious food..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 glass-strong rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-300 text-lg"
                                />
                                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl">
                                    🔍
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Category Filter with Enhanced Animations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-14"
                >
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category, index) => (
                            <motion.button
                                key={category.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                whileHover={{ scale: 1.08, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`relative px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden ${selectedCategory === category.id
                                        ? 'text-white shadow-2xl'
                                        : 'glass hover:shadow-xl'
                                    }`}
                            >
                                {/* Animated gradient background for active category */}
                                {selectedCategory === category.id && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}

                                {/* Glow effect on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-primary-500/50 to-secondary-500/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                                />

                                <span className="relative flex items-center space-x-2 z-10">
                                    <motion.span
                                        className="text-2xl"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {category.icon}
                                    </motion.span>
                                    <span>{category.name}</span>
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="card-glass p-6 animate-pulse">
                                <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
                                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Food Grid with Stagger Animation */
                    <AnimatePresence mode="wait">
                        {filteredItems.length > 0 ? (
                            <motion.div
                                key={selectedCategory}
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {filteredItems.map((item, index) => (
                                    <motion.div
                                        key={item._id}
                                        variants={staggerItem}
                                        custom={index}
                                        layout
                                    >
                                        <FoodCard item={item} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center py-24"
                            >
                                <motion.div
                                    className="text-8xl mb-6"
                                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                >
                                    😕
                                </motion.div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                    No items found
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                    Try adjusting your search or filter
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('all');
                                    }}
                                    className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    Reset Filters
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
};

export default Menu;
