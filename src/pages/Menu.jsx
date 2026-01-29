import { useState } from 'react';
import { motion } from 'framer-motion';
import { menuData, categories } from '../data/menuData';
import FoodCard from '../components/FoodCard';
import { pageTransition, staggerContainer, staggerItem } from '../utils/animations';

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = menuData.filter(item => {
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
            className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark-900"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                        Our <span className="text-gradient">Menu</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Fresh, delicious, and made with love
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for food..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-12"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                🔍
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category.id
                                        ? 'gradient-primary text-white shadow-lg'
                                        : 'glass hover:shadow-lg'
                                    }`}
                            >
                                <span className="flex items-center space-x-2">
                                    <span>{category.icon}</span>
                                    <span>{category.name}</span>
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Food Grid */}
                {filteredItems.length > 0 ? (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredItems.map((item) => (
                            <motion.div key={item.id} variants={staggerItem}>
                                <FoodCard item={item} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">😕</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No items found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your search or filter
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Menu;
