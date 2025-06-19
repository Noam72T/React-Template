-- Script de création de la base de données et des tables

-- Créer la base de données (exécuter cette commande séparément)
-- CREATE DATABASE template_db;

-- Se connecter à la base de données template_db avant d'exécuter le reste

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index sur l'email pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Table exemple pour les posts/articles
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index sur user_id pour optimiser les jointures
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Données de test (optionnel)
INSERT INTO users (email, password) VALUES
  ('test@example.com', 'password123'),
  ('admin@example.com', 'admin123')
ON CONFLICT (email) DO NOTHING;

-- Afficher les tables créées
\dt
