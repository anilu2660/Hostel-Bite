import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorks from '../components/home/HowItWorks';
import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';

const Home = () => {
    return (
        <motion.div
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="page-transition"
        >
            <HeroSection />
            <FeaturesSection />
            <HowItWorks />
        </motion.div>
    );
};

export default Home;
