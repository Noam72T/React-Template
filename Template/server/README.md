# Backend Template

Ce dossier contient le backend de l'application avec Node.js, Express et PostgreSQL.

## Configuration

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement :**
   - Copier le fichier `.env` et modifier les valeurs selon votre configuration
   - Configurer votre base de données PostgreSQL

3. **Initialiser la base de données :**
   ```bash
   # Se connecter à PostgreSQL et créer la base de données
   psql -U postgres
   CREATE DATABASE template_db;
   \q

   # Exécuter le script d'initialisation
   psql -U postgres -d template_db -f database/init.sql
   ```

## Scripts disponibles

- `npm start` : Démarre le serveur en mode production
- `npm run dev` : Démarre le serveur en mode développement avec nodemon

## Structure des fichiers

```
server/
├── index.js              # Point d'entrée principal
├── config/
│   └── database.js        # Configuration PostgreSQL
├── routes/
│   └── users.js          # Routes pour les utilisateurs
├── middleware/
│   └── auth.js           # Middlewares d'authentification et validation
├── database/
│   └── init.sql          # Script d'initialisation de la DB
└── .env                  # Variables d'environnement
```

## API Endpoints

### Utilisateurs
- `GET /api/users` - Récupérer tous les utilisateurs
- `GET /api/users/:id` - Récupérer un utilisateur par ID
- `POST /api/users` - Créer un nouvel utilisateur
- `PUT /api/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Utilitaires
- `GET /` - Page d'accueil de l'API
- `GET /api/health` - Vérification de l'état du serveur

## Technologies utilisées

- **Express.js** : Framework web
- **PostgreSQL** : Base de données
- **CORS** : Gestion des requêtes cross-origin
- **dotenv** : Gestion des variables d'environnement
- **jsonwebtoken** : Authentification JWT
- **nodemon** : Rechargement automatique en développement
