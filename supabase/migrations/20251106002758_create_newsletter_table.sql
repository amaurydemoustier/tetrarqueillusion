/*
  # Création de la table Newsletter pour Le Tétravers

  1. Nouvelles Tables
    - `newsletter_subscriptions`
      - `id` (uuid, clé primaire)
      - `email` (text, unique, obligatoire)
      - `subscribed_at` (timestamptz, date d'inscription)
      - `is_active` (boolean, statut de l'abonnement)
  
  2. Sécurité
    - Active RLS sur la table `newsletter_subscriptions`
    - Ajoute une politique permettant l'insertion publique (pour le formulaire)
    - Seuls les administrateurs peuvent lire/modifier les données
  
  3. Notes Importantes
    - Table optimisée pour stocker les inscriptions à la "Veille de la Transcendance"
    - Index sur email pour des recherches rapides
    - Validation d'email côté application recommandée
*/

-- Création de la table newsletter_subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Index pour améliorer les performances de recherche
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscriptions(subscribed_at DESC);

-- Activation de RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (formulaire d'inscription)
CREATE POLICY "Permettre inscription publique newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique pour empêcher la lecture publique
CREATE POLICY "Seuls admin peuvent lire newsletter"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (false);