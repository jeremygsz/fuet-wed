import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Hero() {
    const floatingAnimation = {
        y: [0, -20, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <section className="hero">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="hero-content"
            >
                <motion.div
                    animate={floatingAnimation}
                    className="hero-hearts"
                >
                    <Heart size={48} fill="#EC950C" color="#EC950C" className="heart-1" />
                    <Heart size={64} fill="#EC950C" color="#EC950C" className="heart-main" />
                    <Heart size={48} fill="#EC950C" color="#EC950C" className="heart-2" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="hero-title"
                >
                    Nous nous marions !
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="hero-subtitle"
                >
                    Célébrons ensemble ces moments inoubliables
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="hero-date"
                >
                    Été 2025
                </motion.div>
            </motion.div>

            {/* Particules flottantes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="floating-particle"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight
                    }}
                    animate={{
                        y: [null, Math.random() * -100, Math.random() * 100],
                        x: [null, Math.random() * 50 - 25],
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </section>
    );
}
