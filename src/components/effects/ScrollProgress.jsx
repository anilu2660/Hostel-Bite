import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
            style={{
                background: 'linear-gradient(90deg, #f97316, #ec4899, #06b6d4)',
                scaleX: scrollProgress / 100,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scrollProgress / 100 }}
            transition={{ duration: 0.1 }}
        />
    );
};

export default ScrollProgress;
