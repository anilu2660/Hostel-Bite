import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';

const features = [
    {
        icon: '⚡',
        title: 'Fast Ordering',
        description: 'Order in seconds with our intuitive interface. No hassle, no waiting.'
    },
    {
        icon: '🧼',
        title: 'Hygienic Food',
        description: 'Prepared in clean kitchens with highest quality standards.'
    },
    {
        icon: '💳',
        title: 'Cashless System',
        description: 'Pay digitally with UPI, cards, or hostel wallet. Completely contactless.'
    },
    {
        icon: '📱',
        title: 'Real-Time Status',
        description: 'Track your order from kitchen to your room in real-time.'
    },
    {
        icon: '🎯',
        title: 'Room Delivery',
        description: 'Get your food delivered right to your hostel room door.'
    },
    {
        icon: '⭐',
        title: 'Quality Assured',
        description: 'Fresh ingredients, delicious taste, every single time.'
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-20 bg-white dark:bg-dark-900">
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
                        Why Choose <span className="text-gradient">HostelBite</span>?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        We're revolutionizing hostel dining with technology and care
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="card-glass p-8 text-center group cursor-pointer"
                        >
                            {/* Icon */}
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="text-6xl mb-4 inline-block"
                            >
                                {feature.icon}
                            </motion.div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors duration-300">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
