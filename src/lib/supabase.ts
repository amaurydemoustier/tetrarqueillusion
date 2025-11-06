import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Configuration Supabase manquante');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Royaume {
  id: string;
  nom: string;
  description: string;
  couleur_principale: string;
  ambiance_audio: string;
  ordre: number;
  created_at: string;
}

export interface Creature {
  id: string;
  nom: string;
  type: string;
  description: string;
  royaume_id: string | null;
  image_url: string;
  created_at: string;
}

export interface Recit {
  id: string;
  titre: string;
  contenu: string;
  extrait: string;
  categorie: string;
  published_at: string;
  created_at: string;
}

export interface NewsletterSubscription {
  email: string;
}
