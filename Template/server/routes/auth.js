const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { query } = require('../config/database');
const { validateUser } = require('../middleware/auth');

// POST /api/auth/login - Connexion utilisateur
router.post('/login', validateUser, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Rechercher l'utilisateur par email
        const result = await query('SELECT id, email, password FROM users WHERE email = $1', [email]);

        if (result.rowCount === 0) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        const user = result.rows[0];

        // Dans un vrai projet, comparer avec un hash bcrypt
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        // Générer un token JWT
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Connexion réussie',
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la connexion'
        });
    }
});

// POST /api/auth/verify - Vérifier un token
router.post('/verify', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token manquant'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Vérifier que l'utilisateur existe toujours
        const result = await query('SELECT id, email FROM users WHERE id = $1', [decoded.userId]);

        if (result.rowCount === 0) {
            return res.status(401).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }

        res.json({
            success: true,
            user: result.rows[0]
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token invalide'
        });
    }
});

module.exports = router;
