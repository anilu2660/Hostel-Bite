import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants } from '../../utils/animations';
import { menuService } from '../../services/menuService';
import toast from 'react-hot-toast';

const ManageMenu = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitting, setSubmitting] = useState(false);

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

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Manage Menu
                </h1>
                <button
                    onClick={openAddModal}
                    className="btn-primary"
                >
                    + Add New Item
                </button>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="card-glass p-6 animate-pulse">
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                        </div>
                    ))}
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🍽️</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        No menu items yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start by adding your first menu item
                    </p>
                    <button onClick={openAddModal} className="btn-primary">
                        Add First Item
                    </button>
                </div>
            ) : (
                /* Menu Items Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <motion.div
                            key={item._id}
                            layout
                            className="card-glass p-6"
                        >
                            {/* Item Image */}
                            {item.image && (
                                <div className="mb-4 rounded-lg overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-40 object-cover"
                                    />
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
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

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                {item.description}
                            </p>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-primary-500">₹{item.price}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">⏱️ {item.prepTime}</span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-700">
                                <button
                                    onClick={() => toggleAvailability(item._id)}
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
                                        onClick={() => handleDelete(item._id)}
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
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                            <motion.div
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="card-glass p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    {editingItem ? 'Edit Item' : 'Add New Item'}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Image Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Item Image
                                        </label>
                                        <div className="flex items-center space-x-4">
                                            {formData.imagePreview && (
                                                <img
                                                    src={formData.imagePreview}
                                                    alt="Preview"
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="input-field"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Max size: 2MB. Formats: JPG, PNG, WebP</p>
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Item Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            minLength={3}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="input-field"
                                            placeholder="e.g., Chicken Biryani"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Description *
                                        </label>
                                        <textarea
                                            required
                                            minLength={10}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="input-field"
                                            rows={3}
                                            placeholder="Describe the dish..."
                                        />
                                    </div>

                                    {/* Price and Category */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Price (₹) *
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min={1}
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="input-field"
                                                placeholder="120"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Category *
                                            </label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="input-field"
                                            >
                                                <option value="breakfast">Breakfast</option>
                                                <option value="lunch">Lunch</option>
                                                <option value="dinner">Dinner</option>
                                                <option value="snacks">Snacks</option>
                                                <option value="beverages">Beverages</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Prep Time */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Preparation Time *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.prepTime}
                                            onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                                            className="input-field"
                                            placeholder="e.g., 15 mins"
                                        />
                                    </div>

                                    {/* Toggles */}
                                    <div className="flex items-center space-x-6">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.veg}
                                                onChange={(e) => setFormData({ ...formData, veg: e.target.checked })}
                                                className="w-4 h-4 text-primary-500 rounded"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Vegetarian</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.available}
                                                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                                                className="w-4 h-4 text-primary-500 rounded"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Available</span>
                                        </label>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {submitting ? 'Saving...' : (editingItem ? 'Update Item' : 'Add Item')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 btn-outline"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageMenu;
