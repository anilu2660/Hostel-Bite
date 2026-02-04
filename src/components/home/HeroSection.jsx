import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, slideUp } from '../../utils/animations';
import HeroScene from '../3d/HeroScene';
import { Suspense, useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
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

    return <span>{count}{suffix}</span>;
};

const MouseParallax = ({ children, sensitivity = 20 }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / sensitivity;
        const y = (e.clientY - top - height / 2) / sensitivity;
        setPosition({ x, y });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setPosition({ x: 0, y: 0 })}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
            {children}
        </motion.div>
    );
};

const HeroSection = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const yText = useTransform(scrollY, [0, 300], [0, 50]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Premium Dynamic Background */}
            <div className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#0a0a0a] transition-colors duration-500">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-[0.05]" />

                {/* Animated Orbs with Blending Modes */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        filter: ["hue-rotate(0deg)", "hue-rotate(45deg)", "hue-rotate(0deg)"]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[70vh] h-[70vh] rounded-full bg-gradient-to-r from-purple-400/30 to-blue-400/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        filter: ["hue-rotate(0deg)", "hue-rotate(-45deg)", "hue-rotate(0deg)"]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -right-[10%] w-[70vh] h-[70vh] rounded-full bg-gradient-to-r from-orange-400/30 to-pink-400/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
                />
            </div>

            {/* 3D Scene Layer */}
            <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                <Suspense fallback={null}>
                    <HeroScene />
                </Suspense>
            </motion.div>

            {/* Main Content */}
            <motion.div
                style={{ y: yText, opacity }}
                className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/20 backdrop-blur-sm">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        <span className="text-sm font-bold text-purple-700 dark:text-purple-300 tracking-wide uppercase">
                            #1 Food Delivery in Campus
                        </span>
                    </span>
                </motion.div>

                {/* Hero Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 relative z-10"
                >
                    <span className="block text-gray-900 dark:text-white drop-shadow-sm">
                        Taste the
                    </span>
                    <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent transform -rotate-2 inline-block origin-center hover:rotate-0 transition-transform duration-500 cursor-default">
                        Magic
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
                >
                    Premium canteen meals delivered straight to your hostel room.
                    <span className="block mt-2 text-purple-600 dark:text-purple-400">Fresh. Fast. Fantastic.</span>
                </motion.p>

                {/* CTA Buttons - Premium Styling */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-200" />
                        <Link
                            to="/menu"
                            className="relative flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white rounded-xl leading-none"
                        >
                            <span className="flex items-center space-x-3">
                                <span className="text-white dark:text-gray-900 font-bold text-lg">Order Now</span>
                                <span className="text-xl">🍕</span>
                            </span>
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/menu"
                            className="flex items-center justify-center px-8 py-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                        >
                            <span className="mr-2">View Menu</span>
                            <span>📋</span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Floating Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute bottom-10 left-0 right-0 hidden lg:flex justify-center gap-8 pointer-events-none"
                >
                    {[
                        { label: 'Happy Students', value: 2000, suffix: '+', icon: '👨‍🎓' },
                        { label: 'Meals Served', value: 50000, suffix: '+', icon: '🍱' },
                        { label: 'Avg Delivery', value: 15, suffix: 'min', icon: '⚡' },
                    ].map((stat, i) => (
                        <MouseParallax key={i} sensitivity={30 + i * 10}>
                            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-2xl flex items-center gap-4 min-w-[200px] pointer-events-auto hover:bg-white dark:hover:bg-gray-800 transition-colors">
                                <div className="text-3xl bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">{stat.icon}</div>
                                <div>
                                    <div className="text-2xl font-black text-gray-900 dark:text-white">
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            </div>
                        </MouseParallax>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Scroll Down</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-8 rounded-full bg-gradient-to-b from-purple-500 to-transparent"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
