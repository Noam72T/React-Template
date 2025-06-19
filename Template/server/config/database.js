const { Pool } = require('pg');

// Configuration de la connexion à PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Test de connexion
pool.on('connect', () => {
    console.log('✅ Connecté à PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Erreur de connexion PostgreSQL:', err);
});

// Fonction utilitaire pour exécuter des requêtes
const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('📊 Requête exécutée:', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('❌ Erreur de requête:', error);
        throw error;
    }
};

// Fonction pour tester la connexion
const testConnection = async () => {
    try {
        await query('SELECT NOW()');
        console.log('✅ Test de connexion PostgreSQL réussi');
        return true;
    } catch (error) {
        console.error('❌ Test de connexion PostgreSQL échoué:', error.message);
        return false;
    }
};

module.exports = {
    pool,
    query,
    testConnection
};
