import { motion } from 'framer-motion';

const FloatingBlobs = () => {
    const blobs = [
        {
            id: 1,
            color: 'from-orange-400 via-red-500 to-pink-500',
            size: 'w-96 h-96',
            position: 'top-10 -left-32',
            duration: 18,
            delay: 0,
        },
        {
            id: 2,
            color: 'from-blue-400 via-cyan-500 to-teal-500',
            size: 'w-[28rem] h-[28rem]',
            position: 'top-1/4 -right-40',
            duration: 22,
            delay: 2,
        },
        {
            id: 3,
            color: 'from-purple-400 via-pink-500 to-rose-500',
            size: 'w-80 h-80',
            position: 'bottom-32 left-1/4',
            duration: 20,
            delay: 4,
        },
        {
            id: 4,
            color: 'from-green-400 via-emerald-500 to-teal-500',
            size: 'w-72 h-72',
            position: 'bottom-20 right-1/4',
            duration: 16,
            delay: 1,
        },
        {
            id: 5,
            color: 'from-yellow-400 via-orange-500 to-red-500',
            size: 'w-64 h-64',
            position: 'top-1/2 left-10',
            duration: 19,
            delay: 3,
        },
        {
            id: 6,
            color: 'from-indigo-400 via-purple-500 to-pink-500',
            size: 'w-56 h-56',
            position: 'top-2/3 right-20',
            duration: 21,
            delay: 5,
        },
    ];

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {blobs.map((blob) => (
                <motion.div
                    key={blob.id}
                    className={`absolute ${blob.size} ${blob.position} bg-gradient-to-br ${blob.color} rounded-full opacity-20 dark:opacity-12 blur-3xl`}
                    initial={{
                        scale: 0.8,
                        opacity: 0,
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                        x: [0, 30, -30, 0],
                        y: [0, -30, 30, 0],
                        borderRadius: [
                            '60% 40% 30% 70% / 60% 30% 70% 40%',
                            '30% 60% 70% 40% / 50% 60% 30% 60%',
                            '70% 30% 50% 50% / 30% 70% 70% 30%',
                            '60% 40% 30% 70% / 60% 30% 70% 40%'
                        ],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: blob.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: blob.delay,
                    }}
                />
            ))}

            {/* Additional smaller accent blobs */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`accent-${i}`}
                    className="absolute w-32 h-32 rounded-full blur-2xl"
                    style={{
                        background: `radial-gradient(circle, ${i % 3 === 0 ? 'rgba(245, 130, 32, 0.3)' :
                                i % 3 === 1 ? 'rgba(14, 165, 233, 0.3)' :
                                    'rgba(236, 72, 153, 0.3)'
                            }, transparent)`,
                        left: `${(i * 15) % 100}%`,
                        top: `${(i * 20) % 100}%`,
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        x: [0, Math.random() * 100 - 50, 0],
                        y: [0, Math.random() * 100 - 50, 0],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 15 + i * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingBlobs;
