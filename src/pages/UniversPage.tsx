import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, Royaume } from '../lib/supabase';
import './UniversPage.css';

const UniversPage = () => {
  const [royaumes, setRoyaumes] = useState<Royaume[]>([]);
  const [selectedRoyaume, setSelectedRoyaume] = useState<Royaume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoyaumes();
  }, []);

  const loadRoyaumes = async () => {
    try {
      const { data, error } = await supabase
        .from('royaumes')
        .select('*')
        .order('ordre');

      if (error) throw error;
      setRoyaumes(data || []);
    } catch (error) {
      console.error('Erreur chargement royaumes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="univers-page">
      <motion.div
        className="univers-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="page-title glow-text">Cartographie du Tétravers</h1>
        <p className="page-subtitle">
          Explorez les quatre royaumes qui composent cet univers mystérieux
        </p>
      </motion.div>

      <section className="magic-system-section">
        <div className="container">
          <motion.div
            className="magic-info"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Le Système Magique</h2>
            <div className="magic-grid">
              <div className="magic-card">
                <h3>Niveau 1 - Magie Fondamentale</h3>
                <p>
                  La base de toute manifestation magique. Accessible aux initiés, elle permet
                  de manipuler les énergies élémentaires et de créer des illusions simples.
                </p>
              </div>
              <div className="magic-card">
                <h3>Niveau 2 - Magie Avancée</h3>
                <p>
                  Réservée aux maîtres, cette magie transcende la réalité. Elle englobe la
                  pureté créatrice, les illusions complexes et les forces destructrices.
                </p>
              </div>
            </div>

            <div className="magic-types">
              <div className="type-badge" style={{ borderColor: 'var(--color-cyan)' }}>
                <span className="type-icon">◇</span>
                Magie d'Illusion
              </div>
              <div className="type-badge" style={{ borderColor: 'var(--color-gold)' }}>
                <span className="type-icon">✧</span>
                Magie de Pureté
              </div>
              <div className="type-badge" style={{ borderColor: 'var(--color-magenta)' }}>
                <span className="type-icon">✦</span>
                Magie Destructrice
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="royaumes-section">
        <div className="container">
          <h2 className="section-title">Les Quatre Royaumes</h2>

          {loading ? (
            <div className="loading-state">Chargement de la carte céleste...</div>
          ) : (
            <div className="royaumes-map">
              {royaumes.map((royaume, index) => (
                <motion.div
                  key={royaume.id}
                  className="royaume-node"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedRoyaume(royaume)}
                  style={{
                    borderColor: royaume.couleur_principale,
                    boxShadow: `0 0 20px ${royaume.couleur_principale}50`,
                  }}
                >
                  <div
                    className="royaume-orb"
                    style={{ backgroundColor: royaume.couleur_principale }}
                  />
                  <h3>{royaume.nom}</h3>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedRoyaume && (
          <motion.div
            className="royaume-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRoyaume(null)}
          >
            <motion.div
              className="royaume-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                borderColor: selectedRoyaume.couleur_principale,
                boxShadow: `0 0 40px ${selectedRoyaume.couleur_principale}80`,
              }}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedRoyaume(null)}
              >
                ✕
              </button>

              <div
                className="modal-header"
                style={{ borderBottomColor: selectedRoyaume.couleur_principale }}
              >
                <div
                  className="modal-orb"
                  style={{ backgroundColor: selectedRoyaume.couleur_principale }}
                />
                <h2 style={{ color: selectedRoyaume.couleur_principale }}>
                  {selectedRoyaume.nom}
                </h2>
              </div>

              <div className="modal-content">
                <p>{selectedRoyaume.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="transcendance-section">
        <div className="container">
          <motion.div
            className="transcendance-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">La Transcendance</h2>
            <p className="transcendance-text">
              Au-delà des royaumes, au-delà de la magie elle-même, existe la Transcendance.
              Cet ordre cosmique maintient l'équilibre entre les dimensions, régit les lois
              de la création et de la destruction. C'est le Système qui orchestre la danse
              éternelle entre l'illusion et la réalité, garantissant que le Tétravers demeure
              en harmonie malgré les forces chaotiques qui le traversent.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default UniversPage;
