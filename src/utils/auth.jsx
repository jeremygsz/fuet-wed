// Récupérer les mots de passe depuis les variables d'environnement
const getValidPasswords = () => {
    const passwordsEnv = import.meta.env.VITE_WEDDING_PASSWORDS;

    if (!passwordsEnv) {
        console.warn('⚠️ Aucun mot de passe configuré dans .env');
        return [];
    }

    return passwordsEnv.split(',').map(pwd => pwd.trim());
};

const VALID_PASSWORDS = getValidPasswords();

const AUTH_KEY = 'wedding_auth';
const VALIDITY_DAYS = 7;

export const checkAuth = () => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) return false;

    const { timestamp } = JSON.parse(auth);
    const expirationDate = new Date(timestamp);
    expirationDate.setDate(expirationDate.getDate() + VALIDITY_DAYS);

    return new Date() < expirationDate;
};

export const login = (password) => {
    if (VALID_PASSWORDS.includes(password.toLowerCase())) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({
            timestamp: new Date().toISOString()
        }));
        return true;
    }
    return false;
};

export const logout = () => {
    localStorage.removeItem(AUTH_KEY);
};
