// Middleware d'authentification simple (JWT)
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token d\'accès requis'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Token invalide'
            });
        }
        req.user = user;
        next();
    });
};

// Middleware de validation des données
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateUser = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email et mot de passe requis'
        });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Format d\'email invalide'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Le mot de passe doit contenir au moins 6 caractères'
        });
    }

    next();
};

// Middleware de logging des requêtes
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
};

// Middleware de limitation de taux (rate limiting) simple
const rateLimitMap = new Map();

const simpleRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
    return (req, res, next) => {
        const clientIP = req.ip;
        const now = Date.now();

        if (!rateLimitMap.has(clientIP)) {
            rateLimitMap.set(clientIP, { count: 1, resetTime: now + windowMs });
            return next();
        }

        const clientData = rateLimitMap.get(clientIP);

        if (now > clientData.resetTime) {
            clientData.count = 1;
            clientData.resetTime = now + windowMs;
            return next();
        }

        if (clientData.count >= maxRequests) {
            return res.status(429).json({
                success: false,
                message: 'Trop de requêtes, veuillez réessayer plus tard'
            });
        }

        clientData.count++;
        next();
    };
};

module.exports = {
    authenticateToken,
    validateUser,
    requestLogger,
    simpleRateLimit
};
