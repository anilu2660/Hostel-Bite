import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, slideUp } from '../../utils/animations';
import HeroScene from '../3d/HeroScene';
import { Suspense, useState, useEffect } from 'react';

const AnimatedCounter = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <span>{count}</span>;
};

const HeroSection = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const y2 = useTransform(scrollY, [0, 300], [0, -50]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Enhanced Gradient Background with Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-pink-900/30">
                {/* Animated Gradient Orbs */}
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
                    className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 blur-3xl"
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
                    className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-30 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"
                />
            </div>

            {/* 3D Scene Background with Parallax */}
            <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                <Suspense fallback={
                    <div className="w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-900 dark:to-dark-800 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
                        />
                    </div>
                }>
                    <HeroScene />
                </Suspense>
            </motion.div>

            {/* Content with Parallax */}
            <motion.div
                style={{ y: y2, opacity }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="space-y-8"
                >
                    {/* Main Heading with 3D Effect */}
                    <motion.h1
                        variants={slideUp}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold"
                        style={{ textShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent"
                        >
                            Delicious Food,
                        </motion.span>
                        <br />
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="inline-block text-gray-900 dark:text-white"
                        >
                            Delivered Fast
                        </motion.span>
                    </motion.h1>

                    {/* Subheading with Fade In */}
                    <motion.p
                        variants={slideUp}
                        className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Your favorite hostel canteen meals, now just a click away.
                        <br className="hidden sm:block" />
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">Fresh, hygienic, and delivered right to your room.</span>
                    </motion.p>

                    {/* Enhanced CTA Buttons with 3D Effects */}
                    <motion.div
                        variants={slideUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/menu"
                                className="relative group text-lg px-10 py-5 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-2xl shadow-purple-500/50 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center justify-center space-x-2">
                                    <span>Order Now</span>
                                    <motion.span
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                    >
                                        🍽️
                                    </motion.span>
                                </span>
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/menu"
                                className="text-lg px-10 py-5 w-full sm:w-auto rounded-2xl backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 border-2 border-white/50 dark:border-gray-700/50 text-gray-900 dark:text-white font-bold shadow-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300"
                            >
                                <span className="flex items-center justify-center space-x-2">
                                    <span>View Menu</span>
                                    <span>📋</span>
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Stats with Animated Counters and 3D Cards */}
                    <motion.div
                        variants={slideUp}
                        className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto pt-16"
                    >
                        {[
                            { value: 500, suffix: '+', label: 'Orders Daily', icon: '📦', color: 'from-blue-500 to-cyan-500' },
                            { value: 4.8, suffix: '⭐', label: 'Rating', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
                            { value: 15, suffix: 'min', label: 'Avg Delivery', icon: '⚡', color: 'from-green-500 to-emerald-500' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                whileHover={{ y: -10, rotateX: 5, scale: 1.05 }}
                                className="relative group"
                                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                                <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-4 sm:p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl">
                                    <div className="text-4xl mb-2">{stat.icon}</div>
                                    <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                        {stat.value === 4.8 ? stat.value : <AnimatedCounter end={stat.value} />}
                                        {stat.suffix}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex flex-wrap items-center justify-center gap-6 pt-8"
                    >
                        {[
                            { icon: '✓', text: 'Hygienic' },
                            { icon: '🔒', text: 'Secure Payment' },
                            { icon: '🚀', text: 'Fast Delivery' },
                            { icon: '💯', text: 'Quality Food' }
                        ].map((badge, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-white/50 dark:border-gray-700/50"
                            >
                                <span className="text-green-500 font-bold">{badge.icon}</span>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{badge.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <div className="relative">
                    <div className="w-8 h-12 border-3 border-purple-500 dark:border-purple-400 rounded-full flex items-start justify-center p-2 backdrop-blur-md bg-white/30 dark:bg-gray-900/30">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
                        />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50" />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
