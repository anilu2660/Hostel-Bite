import { motion } from 'framer-motion';
import { fadeIn, slideLeft, slideRight } from '../../utils/animations';

const steps = [
    {
        number: '01',
        title: 'Browse Menu',
        description: 'Explore our delicious menu with detailed descriptions and prices',
        icon: '📱'
    },
    {
        number: '02',
        title: 'Add to Cart',
        description: 'Select your favorite items and customize your order',
        icon: '🛒'
    },
    {
        number: '03',
        title: 'Place Order',
        description: 'Confirm your order and make payment digitally',
        icon: '✅'
    },
    {
        number: '04',
        title: 'Track & Receive',
        description: 'Track your order in real-time and receive at your room',
        icon: '🚀'
    }
];

const HowItWorks = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-dark-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                        How It <span className="text-gradient">Works</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Four simple steps to satisfy your cravings
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="space-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                } items-center gap-8`}
                        >
                            {/* Content */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-block mb-4">
                                    <span className="text-6xl md:text-8xl font-display font-bold text-primary-500 opacity-20">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    {step.description}
                                </p>
                            </div>

                            {/* Icon */}
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full glass-strong flex items-center justify-center text-7xl md:text-8xl shadow-2xl"
                            >
                                {step.icon}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Timeline Line (Desktop only) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-secondary-500 opacity-20 transform -translate-x-1/2"></div>
            </div>
        </section>
    );
};

export default HowItWorks;
