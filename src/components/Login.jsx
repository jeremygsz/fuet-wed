import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';

export default function Login({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = onLogin(password);

        if (!success) {
            setError(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="login-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="login-card"
            >
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.1, 1.1, 1.1, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                    }}
                >
                    <Heart className="login-icon" size={64} fill="#EC950C" color="#EC950C" />
                </motion.div>

                <h1>Notre Mariage</h1>
                <p className="login-subtitle">Entrez le mot de passe pour accéder aux détails</p>

                <form onSubmit={handleSubmit}>
                    <motion.div
                        className="input-wrapper"
                        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <Lock size={20} className="input-icon" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mot de passe"
                            className={error ? 'error' : ''}
                        />
                    </motion.div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="error-message"
                        >
                            Mot de passe incorrect
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="login-button"
                    >
                        Entrer
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
