import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorGlow = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <>
            {/* Main cursor glow */}
            <motion.div
                className="pointer-events-none fixed z-50 mix-blend-screen"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Secondary glow */}
            <motion.div
                className="pointer-events-none fixed z-50 mix-blend-screen"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
            />
        </>
    );
};

export default CursorGlow;
