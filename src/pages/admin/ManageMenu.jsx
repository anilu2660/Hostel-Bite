import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData } from '../../data/menuData';
import { modalVariants } from '../../utils/animations';

const ManageMenu = () => {
    const [items, setItems] = useState(menuData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const toggleAvailability = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, available: !item.available } : item
        ));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Manage Menu
                </h1>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setIsModalOpen(true);
                    }}
                    className="btn-primary"
                >
                    + Add New Item
                </button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        className="card-glass p-6"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.category}
                                </p>
                            </div>
                            <div className="flex items-center space-x-1">
                                {item.veg ? (
                                    <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center rounded">
                                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 border-2 border-red-600 flex items-center justify-center rounded">
                                        <div className="w-2 h-2 rounded-full bg-red-600"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {item.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-primary-500">₹{item.price}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">⏱️ {item.prepTime}</span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-700">
                            <button
                                onClick={() => toggleAvailability(item.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${item.available
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-gray-300 dark:bg-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400'
                                    }`}
                            >
                                {item.available ? 'Available' : 'Unavailable'}
                            </button>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                            <motion.div
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="card-glass p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    {editingItem ? 'Edit Item' : 'Add New Item'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    This is a UI-only demo. Form functionality would be implemented with backend integration.
                                </p>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full btn-primary"
                                >
                                    Close
                                </button>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageMenu;
