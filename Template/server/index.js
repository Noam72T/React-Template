const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');
const { requestLogger, simpleRateLimit } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);
app.use(simpleRateLimit(100, 15 * 60 * 1000)); // 100 requêtes par 15 minutes

// Routes de base
app.get('/', (req, res) => {
    res.json({ message: 'Serveur backend opérationnel!' });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Import des routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Erreur interne du serveur',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Route 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

app.listen(PORT, async () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);

    // Test de connexion à la base de données
    await testConnection();
});
