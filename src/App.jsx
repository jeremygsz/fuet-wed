import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import { checkAuth, login } from './utils/auth.jsx';
import { LogOut } from 'lucide-react';
import './styles/App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(checkAuth());
    }, []);

    const handleLogin = (password) => {
        const success = login(password);
        if (success) {
            setIsAuthenticated(true);
        }
        return success;
    };

    const handleLogout = () => {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            localStorage.removeItem('wedding_auth');
            setIsAuthenticated(false);
        }
    };

    return (
        <div className="app">
            <AnimatePresence mode="wait">
                {!isAuthenticated ? (
                    <Login key="login" onLogin={handleLogin} />
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.button
                            className="logout-button"
                            onClick={handleLogout}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <LogOut size={20} />
                        </motion.button>

                        <Hero />
                        <Timeline />

                        <footer className="footer">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                Nous avons hâte de célébrer avec vous ! 💕
                            </motion.p>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
