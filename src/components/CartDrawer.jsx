import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { drawerVariants } from '../utils/animations';

const CartDrawer = () => {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        updateQuantity,
        removeFromCart,
        getTotalPrice,
        clearCart
    } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-dark-900 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Your Cart
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-300"
                            >
                                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="text-6xl mb-4">🛒</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Add some delicious items to get started!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="card-glass p-4"
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-dark-700 dark:to-dark-600 flex items-center justify-center text-2xl flex-shrink-0">
                                                    {item.category === 'breakfast' && '🌅'}
                                                    {item.category === 'lunch' && '🍛'}
                                                    {item.category === 'dinner' && '🌙'}
                                                    {item.category === 'snacks' && '🍟'}
                                                    {item.category === 'beverages' && '☕'}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        ₹{item.price} each
                                                    </p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center space-x-3 mt-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors duration-300"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="font-semibold text-gray-900 dark:text-white w-8 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors duration-300"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end space-y-2">
                                                    <p className="font-bold text-primary-500">
                                                        ₹{item.price * item.quantity}
                                                    </p>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-600 transition-colors duration-300"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200 dark:border-dark-700 p-6 space-y-4">
                                <div className="flex items-center justify-between text-lg font-semibold">
                                    <span className="text-gray-900 dark:text-white">Total:</span>
                                    <span className="text-2xl text-primary-500">₹{getTotalPrice()}</span>
                                </div>

                                <button className="w-full btn-primary py-4 text-lg">
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="w-full btn-outline py-3"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
