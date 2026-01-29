import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full glass p-1 transition-colors duration-300"
            aria-label="Toggle theme"
        >
            <motion.div
                className="w-5 h-5 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 shadow-lg flex items-center justify-center"
                animate={{
                    x: theme === 'dark' ? 24 : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                {theme === 'dark' ? (
                    <span className="text-xs">🌙</span>
                ) : (
                    <span className="text-xs">☀️</span>
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
