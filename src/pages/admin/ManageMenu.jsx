import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants, staggerContainer, staggerItem } from '../../utils/animations';
import { menuService } from '../../services/menuService';
import toast from 'react-hot-toast';

const ManageMenu = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'breakfast',
        prepTime: '',
        veg: true,
        available: true,
        image: '',
        imagePreview: ''
    });

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const response = await menuService.getMenuItems();
            if (response.success) {
                setItems(response.data);
            }
        } catch (error) {
            console.error('Error fetching menu items:', error);
            toast.error('Failed to load menu items');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            prepTime: item.prepTime,
            veg: item.veg,
            available: item.available,
            image: item.image || '',
            imagePreview: item.image || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const response = await menuService.deleteMenuItem(id);
            if (response.success) {
                toast.success('Item deleted successfully');
                fetchMenuItems();
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error(error.response?.data?.message || 'Failed to delete item');
        }
    };

    const toggleAvailability = async (id) => {
        try {
            const response = await menuService.toggleAvailability(id);
            if (response.success) {
                toast.success('Availability updated');
                fetchMenuItems();
            }
        } catch (error) {
            console.error('Error toggling availability:', error);
            toast.error('Failed to update availability');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image size should be less than 2MB');
            return;
        }

        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({
                ...formData,
                image: reader.result,
                imagePreview: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const submitData = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                category: formData.category,
                prepTime: formData.prepTime,
                veg: formData.veg,
                available: formData.available,
                image: formData.image
            };

            let response;
            if (editingItem) {
                response = await menuService.updateMenuItem(editingItem._id, submitData);
                toast.success('Item updated successfully');
            } else {
                response = await menuService.createMenuItem(submitData);
                toast.success('Item added successfully');
            }

            if (response.success) {
                setIsModalOpen(false);
                resetForm();
                fetchMenuItems();
            }
        } catch (error) {
            console.error('Error saving item:', error);
            toast.error(error.response?.data?.message || 'Failed to save item');
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: 'breakfast',
            prepTime: '',
            veg: true,
            available: true,
            image: '',
            imagePreview: ''
        });
        setEditingItem(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const filteredItems = filterCategory === 'all'
        ? items
        : items.filter(item => item.category === filterCategory);

    const categories = ['all', 'breakfast', 'lunch', 'dinner', 'snacks', 'beverages'];

    return (
        <div className="relative">
            {/* Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        className="absolute w-2 h-2 bg-orange-500/20 rounded-full blur-sm"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 relative z-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent flex items-center gap-3">
                        <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🍽️
                        </motion.span>
                        Manage Menu
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Add, edit, or remove items from your menu
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openAddModal}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg hover:shadow-orange-500/50 transition-shadow flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Add New Item
                </motion.button>
            </div>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-2 relative z-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-300 ${filterCategory === cat
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="card-glass p-6 animate-pulse">
                            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-4"></div>
                            <div className="flex justify-between">
                                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : items.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-700/50"
                >
                    <div className="text-8xl mb-4 animate-bounce">🍽️</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        No menu items found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start by adding your first menu item or check your filters
                    </p>
                    <button onClick={openAddModal} className="btn-primary">
                        Add First Item
                    </button>
                </motion.div>
            ) : (
                /* Menu Items Grid */
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
                >
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item._id}
                                variants={staggerItem}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl overflow-hidden"
                            >
                                {/* Item Image */}
                                <div className="relative h-48 overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl">
                                            🍽️
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                        <span className="text-white font-bold bg-primary-500/80 backdrop-blur px-3 py-1 rounded-full text-sm">
                                            {item.category}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 bg-white/20 backdrop-blur hover:bg-white/40 rounded-full text-white transition-colors"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="p-2 bg-red-500/20 backdrop-blur hover:bg-red-500/40 rounded-full text-white transition-colors"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                            {item.name}
                                        </h3>
                                        {item.veg ? (
                                            <div title="Vegetarian" className="w-5 h-5 border-2 border-green-500 flex items-center justify-center rounded-sm">
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                                            </div>
                                        ) : (
                                            <div title="Non-Vegetarian" className="w-5 h-5 border-2 border-red-500 flex items-center justify-center rounded-sm">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 h-10">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                            ₹{item.price}
                                        </span>
                                        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                            ⏱️ {item.prepTime}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => toggleAvailability(item._id)}
                                        className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${item.available
                                                ? 'bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500 hover:text-white'
                                                : 'bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500 hover:text-white'
                                            }`}
                                    >
                                        {item.available ? '✅ Available' : '❌ Unavailable'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                            <motion.div
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="bg-white dark:bg-gray-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                            {editingItem ? 'Edit Item' : 'Add New Item'}
                                        </h2>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                        >
                                            ❌
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Image Upload */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                                                Item Image
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-6 text-center hover:border-orange-500 transition-colors relative group bg-gray-50 dark:bg-gray-800/50">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                {formData.imagePreview ? (
                                                    <div className="relative">
                                                        <img
                                                            src={formData.imagePreview}
                                                            alt="Preview"
                                                            className="h-48 w-full object-contain rounded-lg mx-auto"
                                                        />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white font-bold">
                                                            Click to change image
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2 py-4">
                                                        <div className="text-4xl">📸</div>
                                                        <p className="text-gray-500">Click or Drag to upload image</p>
                                                        <p className="text-xs text-gray-400">Max 2MB (JPG, PNG, WebP)</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Name */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                    Item Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    minLength={3}
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 outline-none transition-colors"
                                                    placeholder="e.g., Chicken Biryani"
                                                />
                                            </div>

                                            {/* Price */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                    Price (₹) *
                                                </label>
                                                <input
                                                    type="number"
                                                    required
                                                    min={1}
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 outline-none transition-colors"
                                                    placeholder="120"
                                                />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                Description *
                                            </label>
                                            <textarea
                                                required
                                                minLength={10}
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 outline-none transition-colors"
                                                rows={3}
                                                placeholder="Describe the dish..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Category */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                    Category *
                                                </label>
                                                <select
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 outline-none transition-colors capitalize"
                                                >
                                                    {categories.filter(c => c !== 'all').map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Prep Time */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                    Preparation Time *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.prepTime}
                                                    onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 outline-none transition-colors"
                                                    placeholder="e.g., 15 mins"
                                                />
                                            </div>
                                        </div>

                                        {/* Toggles */}
                                        <div className="flex items-center space-x-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                                            <label className="flex items-center space-x-3 cursor-pointer group">
                                                <div className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors ${formData.veg ? 'border-green-500 bg-green-500' : 'border-gray-400'}`}>
                                                    {formData.veg && <span className="text-white text-xs">✓</span>}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.veg}
                                                    onChange={(e) => setFormData({ ...formData, veg: e.target.checked })}
                                                    className="hidden"
                                                />
                                                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-500 transition-colors">Vegetarian</span>
                                            </label>

                                            <label className="flex items-center space-x-3 cursor-pointer group">
                                                <div className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors ${formData.available ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}>
                                                    {formData.available && <span className="text-white text-xs">✓</span>}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.available}
                                                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                                                    className="hidden"
                                                />
                                                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">Available</span>
                                            </label>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex space-x-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                                            >
                                                {submitting ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Saving...
                                                    </span>
                                                ) : (editingItem ? 'Update Item' : 'Add Item')}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageMenu;
