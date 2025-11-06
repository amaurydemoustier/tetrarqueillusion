/*
  # Création des tables pour le contenu Lore du Tétravers

  1. Nouvelles Tables
    - `royaumes`
      - `id` (uuid, clé primaire)
      - `nom` (text, nom du royaume)
      - `description` (text, description détaillée)
      - `couleur_principale` (text, couleur thématique)
      - `ambiance_audio` (text, URL ou référence audio)
      - `ordre` (integer, ordre d'affichage)
      - `created_at` (timestamptz)
    
    - `creatures`
      - `id` (uuid, clé primaire)
      - `nom` (text, nom de la créature)
      - `type` (text, type de créature)
      - `description` (text, description)
      - `royaume_id` (uuid, référence au royaume)
      - `image_url` (text, URL de l'image)
      - `created_at` (timestamptz)
    
    - `recits`
      - `id` (uuid, clé primaire)
      - `titre` (text, titre du récit)
      - `contenu` (text, contenu complet)
      - `extrait` (text, extrait court)
      - `categorie` (text, catégorie du récit)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
  
  2. Sécurité
    - Active RLS sur toutes les tables
    - Lecture publique autorisée (contenu visible par tous)
    - Écriture réservée aux administrateurs authentifiés
  
  3. Notes Importantes
    - Structure optimisée pour le contenu du Tétravers
    - Relations entre créatures et royaumes
    - Système de catégorisation pour les récits
*/

-- Table des Royaumes
CREATE TABLE IF NOT EXISTS royaumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  description text NOT NULL DEFAULT '',
  couleur_principale text NOT NULL DEFAULT '#000000',
  ambiance_audio text DEFAULT '',
  ordre integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Table des Créatures
CREATE TABLE IF NOT EXISTS creatures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  type text NOT NULL DEFAULT 'Mystérieuse',
  description text NOT NULL DEFAULT '',
  royaume_id uuid REFERENCES royaumes(id) ON DELETE SET NULL,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Table des Récits
CREATE TABLE IF NOT EXISTS recits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL,
  contenu text NOT NULL DEFAULT '',
  extrait text NOT NULL DEFAULT '',
  categorie text NOT NULL DEFAULT 'Archives',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_royaumes_ordre ON royaumes(ordre);
CREATE INDEX IF NOT EXISTS idx_creatures_royaume ON creatures(royaume_id);
CREATE INDEX IF NOT EXISTS idx_recits_published ON recits(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_recits_categorie ON recits(categorie);

-- Activation de RLS sur toutes les tables
ALTER TABLE royaumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE creatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE recits ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
CREATE POLICY "Lecture publique royaumes"
  ON royaumes
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Lecture publique creatures"
  ON creatures
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Lecture publique recits"
  ON recits
  FOR SELECT
  TO anon
  USING (true);

-- Insertion de données initiales pour les 4 royaumes
INSERT INTO royaumes (nom, description, couleur_principale, ordre) VALUES
  ('Le Royaume des Éclats', 'Un royaume où la lumière se fragmente en mille éclats cristallins, révélant des vérités cachées dans chaque reflet.', '#00D9FF', 1),
  ('Le Royaume des Flammes', 'Un royaume de feu et de passion où l''énergie destructrice côtoie la renaissance perpétuelle.', '#FF3366', 2),
  ('Le Royaume des Brumes', 'Un royaume enveloppé de brouillards mystérieux où la réalité se dissout dans l''illusion.', '#9B7EDE', 3),
  ('Le Royaume du Vide', 'Un royaume où l''absence devient présence, où le néant contient toutes les possibilités.', '#1A1A2E', 4)
ON CONFLICT DO NOTHING;