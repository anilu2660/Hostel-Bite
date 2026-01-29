import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { hoverScale, tapScale } from '../utils/animations';

const FoodCard = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="card-glass overflow-hidden group cursor-pointer"
        >
            {/* Image Section */}
            <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-dark-700 dark:to-dark-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {item.category === 'breakfast' && '🌅'}
                    {item.category === 'lunch' && '🍛'}
                    {item.category === 'dinner' && '🌙'}
                    {item.category === 'snacks' && '🍟'}
                    {item.category === 'beverages' && '☕'}
                </div>

                {/* Availability Badge */}
                <div className="absolute top-3 right-3">
                    {item.available ? (
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                            Available
                        </span>
                    ) : (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                            Sold Out
                        </span>
                    )}
                </div>

                {/* Veg/Non-veg Badge */}
                <div className="absolute top-3 left-3">
                    {item.veg ? (
                        <div className="w-6 h-6 border-2 border-green-600 flex items-center justify-center bg-white rounded">
                            <div className="w-3 h-3 rounded-full bg-green-600"></div>
                        </div>
                    ) : (
                        <div className="w-6 h-6 border-2 border-red-600 flex items-center justify-center bg-white rounded">
                            <div className="w-3 h-3 rounded-full bg-red-600"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-yellow-500">
                        <span>⭐</span>
                        <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {item.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>⏱️</span>
                        <span>{item.prepTime}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary-500">
                        ₹{item.price}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                    whileHover={hoverScale}
                    whileTap={tapScale}
                    onClick={() => addToCart(item)}
                    disabled={!item.available}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${item.available
                            ? 'btn-primary'
                            : 'bg-gray-300 dark:bg-dark-600 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {item.available ? (
                        <span className="flex items-center justify-center space-x-2">
                            <span>Add to Cart</span>
                            <span>🛒</span>
                        </span>
                    ) : (
                        'Not Available'
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default FoodCard;
