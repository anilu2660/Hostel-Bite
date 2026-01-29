import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-500 via-pink-500 to-cyan-500"
            initial={{ opacity: 1 }}
            animate={{ opacity: progress >= 100 ? 0 : 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ pointerEvents: progress >= 100 ? 'none' : 'auto' }}
        >
            <div className="text-center">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
                    className="mb-8"
                >
                    <div className="text-8xl mb-4">🍽️</div>
                    <h1 className="text-5xl font-bold text-white font-['Outfit']">
                        HostelBite
                    </h1>
                </motion.div>

                {/* Progress Bar */}
                <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Loading Text */}
                <motion.p
                    className="mt-4 text-white text-lg"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading delicious food...
                </motion.p>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
