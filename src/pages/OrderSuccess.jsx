import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { orderService } from '../services/orderService';

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(true);

    const orderId = searchParams.get('orderId');

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        }

        // Stop confetti after 5 seconds
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await orderService.getOrder(orderId);
            if (response.success) {
                setOrder(response.data);
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
            {/* Confetti */}
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}

            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl w-full"
                >
                    {/* Success Icon with 3D Effect */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.2
                        }}
                        className="flex justify-center mb-8"
                    >
                        <div className="relative">
                            {/* Glow effect */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-2xl"
                            />

                            {/* Icon */}
                            <motion.div
                                animate={{
                                    rotateY: [0, 360],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="relative w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="w-16 h-16 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <motion.path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </motion.svg>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Order Placed Successfully! 🎉
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Thank you for your order! Your delicious food is on its way.
                        </p>
                    </motion.div>

                    {/* Order Details Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 mb-8"
                    >
                        {/* Order Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Order Number */}
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                                <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Order Number</div>
                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                        {order?.orderNumber || 'N/A'}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Payment ID */}
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                                <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Payment ID</div>
                                    <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                                        {order?.payment?.razorpayPaymentId?.substring(0, 20) || 'N/A'}...
                                    </div>
                                </div>
                            </motion.div>

                            {/* Total Amount */}
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                                <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Amount</div>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        ₹{order?.totalAmount || 0}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="text-3xl mr-3">🍽️</span>
                                Your Order Items
                            </h3>

                            <div className="space-y-4">
                                {order?.items?.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                        whileHover={{ scale: 1.02, x: 10 }}
                                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg"
                                    >
                                        {/* Item Image */}
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className="relative"
                                        >
                                            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-xl">
                                                {item.menuItem?.image ? (
                                                    <img
                                                        src={item.menuItem.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-4xl">
                                                        🍔
                                                    </div>
                                                )}
                                            </div>
                                            {/* Quantity badge */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 1 + index * 0.1, type: "spring" }}
                                                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                                            >
                                                {item.quantity}
                                            </motion.div>
                                        </motion.div>

                                        {/* Item Details */}
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                ₹{item.price} × {item.quantity}
                                            </p>
                                        </div>

                                        {/* Item Total */}
                                        <div className="text-right">
                                            <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                                ₹{item.price * item.quantity}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800"
                        >
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                <span className="text-2xl mr-2">📍</span>
                                Delivery Address
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Hostel:</span> {order?.deliveryAddress?.hostelId || 'N/A'}
                                <br />
                                <span className="font-semibold">Room:</span> {order?.deliveryAddress?.roomNumber || 'N/A'}
                            </p>
                            {order?.notes && (
                                <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-semibold">Note:</span> {order.notes}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/orders')}
                            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all duration-300"
                        >
                            View All Orders
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/menu')}
                            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-bold text-lg shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300"
                        >
                            Order More Food
                        </motion.button>
                    </motion.div>

                    {/* Estimated Time */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6 }}
                        className="text-center mt-8"
                    >
                        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-full border border-orange-200 dark:border-orange-800">
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="text-2xl"
                            >
                                ⏱️
                            </motion.span>
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">
                                Estimated delivery: 20-30 minutes
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderSuccess;
