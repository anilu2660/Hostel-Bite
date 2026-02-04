import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCart } from '../context/CartContext';

const FoodCard = ({ item }) => {
    const { addToCart } = useCart();
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef(null);

    // Parallax effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Category-specific glow colors
    const glowColors = {
        breakfast: 'rgba(251, 191, 36, 0.5)',
        lunch: 'rgba(245, 130, 32, 0.5)',
        dinner: 'rgba(139, 92, 246, 0.5)',
        snacks: 'rgba(236, 72, 153, 0.5)',
        beverages: 'rgba(14, 165, 233, 0.5)',
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            whileHover={{
                y: -12,
                transition: { duration: 0.3, ease: 'easeOut' }
            }}
            className="relative group cursor-pointer"
        >
            {/* Glow effect on hover */}
            <motion.div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{
                    background: `radial-gradient(circle at center, ${glowColors[item.category] || 'rgba(245, 130, 32, 0.5)'}, transparent 70%)`,
                }}
            />

            {/* Main card */}
            <motion.div
                className="relative card-glass overflow-hidden rounded-2xl"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                {/* Image Section */}
                <div className="relative h-56 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-dark-700 dark:to-dark-600 overflow-hidden">
                    {/* Animated gradient background */}
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                        style={{
                            background: `linear-gradient(135deg, ${glowColors[item.category]}, transparent)`,
                        }}
                    />

                    {/* Actual Image or Food emoji with float animation */}
                    {item.image ? (
                        <motion.img
                            src={item.image}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        />
                    ) : (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center text-7xl"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            {item.category === 'breakfast' && '🌅'}
                            {item.category === 'lunch' && '🍛'}
                            {item.category === 'dinner' && '🌙'}
                            {item.category === 'snacks' && '🍟'}
                            {item.category === 'beverages' && '☕'}
                        </motion.div>
                    )}

                    {/* Availability Badge */}
                    <motion.div
                        className="absolute top-3 right-3 z-10"
                        whileHover={{ scale: 1.1 }}
                        style={{ transform: 'translateZ(20px)' }}
                    >
                        {item.available ? (
                            <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm">
                                Available
                            </span>
                        ) : (
                            <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm">
                                Sold Out
                            </span>
                        )}
                    </motion.div>

                    {/* Veg/Non-veg Badge */}
                    <motion.div
                        className="absolute top-3 left-3 z-10"
                        whileHover={{ scale: 1.1 }}
                        style={{ transform: 'translateZ(20px)' }}
                    >
                        {item.veg ? (
                            <div className="w-7 h-7 border-2 border-green-600 flex items-center justify-center bg-white rounded shadow-md">
                                <div className="w-3.5 h-3.5 rounded-full bg-green-600"></div>
                            </div>
                        ) : (
                            <div className="w-7 h-7 border-2 border-red-600 flex items-center justify-center bg-white rounded shadow-md">
                                <div className="w-3.5 h-3.5 rounded-full bg-red-600"></div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300">
                            {item.name}
                        </h3>
                        <motion.div
                            className="flex items-center space-x-1 text-yellow-500"
                            whileHover={{ scale: 1.1 }}
                        >
                            <span className="text-lg">⭐</span>
                            <span className="text-sm font-bold">{item.rating}</span>
                        </motion.div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="text-base">⏱️</span>
                            <span className="font-medium">{item.prepTime}</span>
                        </div>
                        <motion.div
                            className="text-3xl font-black bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.05 }}
                        >
                            ₹{item.price}
                        </motion.div>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                        whileHover={{ scale: item.available ? 1.02 : 1 }}
                        whileTap={{ scale: item.available ? 0.98 : 1 }}
                        onClick={() => item.available && addToCart(item)}
                        disabled={!item.available}
                        className={`w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 shadow-lg ${item.available
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-2xl hover:shadow-primary-500/50'
                            : 'bg-gray-300 dark:bg-dark-600 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {item.available ? (
                            <span className="flex items-center justify-center space-x-2">
                                <span>Add to Cart</span>
                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    🛒
                                </motion.span>
                            </span>
                        ) : (
                            'Not Available'
                        )}
                    </motion.button>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-secondary-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
        </motion.div>
    );
};

export default FoodCard;
