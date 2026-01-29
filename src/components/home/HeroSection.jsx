import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, slideUp } from '../../utils/animations';
import HeroScene from '../3d/HeroScene';
import { Suspense } from 'react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 gradient-mesh opacity-50"></div>

            {/* 3D Scene Background */}
            <div className="absolute inset-0 z-0">
                <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-900 dark:to-dark-800"></div>}>
                    <HeroScene />
                </Suspense>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="space-y-8"
                >
                    {/* Main Heading */}
                    <motion.h1
                        variants={slideUp}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold"
                    >
                        <span className="text-gradient">Delicious Food,</span>
                        <br />
                        <span className="text-gray-900 dark:text-white">Delivered Fast</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        variants={slideUp}
                        className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
                    >
                        Your favorite hostel canteen meals, now just a click away.
                        Fresh, hygienic, and delivered right to your room.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={slideUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                    >
                        <Link to="/menu" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                            <span className="flex items-center justify-center space-x-2">
                                <span>Order Now</span>
                                <span>🍽️</span>
                            </span>
                        </Link>
                        <Link to="/menu" className="btn-glass text-lg px-8 py-4 w-full sm:w-auto">
                            <span className="flex items-center justify-center space-x-2">
                                <span>View Menu</span>
                                <span>📋</span>
                            </span>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={slideUp}
                        className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto pt-16"
                    >
                        <div className="card-glass p-4 sm:p-6">
                            <div className="text-3xl sm:text-4xl font-bold text-primary-500">500+</div>
                            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">Orders Daily</div>
                        </div>
                        <div className="card-glass p-4 sm:p-6">
                            <div className="text-3xl sm:text-4xl font-bold text-primary-500">4.8⭐</div>
                            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">Rating</div>
                        </div>
                        <div className="card-glass p-4 sm:p-6">
                            <div className="text-3xl sm:text-4xl font-bold text-primary-500">15min</div>
                            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">Avg Delivery</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
