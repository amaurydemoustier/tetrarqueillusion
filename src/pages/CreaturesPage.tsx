import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, Creature, Royaume } from '../lib/supabase';
import './CreaturesPage.css';

const CreaturesPage = () => {
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [royaumes, setRoyaumes] = useState<Map<string, Royaume>>(new Map());
  const [_selectedCreature, _setSelectedCreature] = useState<Creature | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [creaturesResult, royaumesResult] = await Promise.all([
        supabase.from('creatures').select('*').order('nom'),
        supabase.from('royaumes').select('*'),
      ]);

      if (creaturesResult.error) throw creaturesResult.error;
      if (royaumesResult.error) throw royaumesResult.error;

      setCreatures(creaturesResult.data || []);

      const royaumesMap = new Map<string, Royaume>();
      royaumesResult.data?.forEach((r) => royaumesMap.set(r.id, r));
      setRoyaumes(royaumesMap);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultCreatures = [
    {
      nom: 'Dragons Célestes',
      type: 'Dragon',
      description: 'Gardiens ancestraux du Tétravers, les dragons célestes incarnent la puissance destructrice et la sagesse millénaire. Leurs écailles reflètent les couleurs des royaumes qu\'ils protègent.',
      royaume: 'Le Royaume des Flammes',
      couleur: '#FF3366',
    },
    {
      nom: 'Licornes Éthérées',
      type: 'Licorne',
      description: 'Créatures de pureté absolue, les licornes éthérées traversent les dimensions avec grâce. Leur corne cristalline peut percer les voiles de l\'illusion et révéler la vérité cachée.',
      royaume: 'Le Royaume des Éclats',
      couleur: '#00D9FF',
    },
    {
      nom: 'Phénix de la Transcendance',
      type: 'Phénix',
      description: 'Êtres de renaissance perpétuelle, les phénix symbolisent le cycle éternel de destruction et de création. Leurs flammes contiennent l\'essence même de la transformation.',
      royaume: 'Le Royaume des Flammes',
      couleur: '#FF3366',
    },
    {
      nom: 'Ombres Spectrales',
      type: 'Entité',
      description: 'Manifestations mystérieuses du Royaume des Brumes, ces entités oscillent entre existence et néant. Elles sont les gardiennes des secrets les plus profonds du Tétravers.',
      royaume: 'Le Royaume des Brumes',
      couleur: '#9B7EDE',
    },
    {
      nom: 'Créateurs Primordiaux',
      type: 'Entité Divine',
      description: 'Entités cosmiques qui ont façonné le Tétravers. Leur nature transcende la compréhension mortelle, existant simultanément dans tous les royaumes et aucun.',
      royaume: 'Le Royaume du Vide',
      couleur: '#1A1A2E',
    },
  ];

  const displayCreatures = creatures.length > 0 ? creatures : defaultCreatures;

  return (
    <div className="creatures-page">
      <motion.div
        className="creatures-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="page-title glow-text">Créatures et Entités</h1>
        <p className="page-subtitle">
          Découvrez les êtres légendaires qui peuplent le Tétravers
        </p>
      </motion.div>

      {loading ? (
        <div className="loading-state">Invocation des créatures...</div>
      ) : (
        <section className="creatures-gallery">
          <div className="container">
            <div className="creatures-grid">
              {displayCreatures.map((creature, index) => {
                const royaume = 'royaume_id' in creature && creature.royaume_id
                  ? royaumes.get(creature.royaume_id)
                  : null;

                const couleur = royaume?.couleur_principale || ('couleur' in creature ? creature.couleur : '#00D9FF');
                const royaumeNom = royaume?.nom || ('royaume' in creature ? creature.royaume : 'Inconnu');

                return (
                  <motion.div
                    key={'id' in creature ? creature.id : index}
                    className="creature-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => 'id' in creature ? _setSelectedCreature(creature as Creature) : null}
                    style={{
                      borderColor: couleur,
                      boxShadow: `0 0 20px ${couleur}30`,
                    }}
                  >
                    <div
                      className="creature-icon"
                      style={{
                        background: `linear-gradient(135deg, ${couleur}40, ${couleur}10)`,
                        boxShadow: `0 0 30px ${couleur}50`,
                      }}
                    >
                      <span style={{ fontSize: '3rem' }}>
                        {creature.type === 'Dragon' ? '🐉' :
                         creature.type === 'Licorne' ? '🦄' :
                         creature.type === 'Phénix' ? '🔥' :
                         creature.type === 'Entité' ? '👁️' :
                         creature.type === 'Entité Divine' ? '✨' : '◈'}
                      </span>
                    </div>

                    <h3 className="creature-name">{creature.nom}</h3>
                    <div className="creature-type" style={{ color: couleur }}>
                      {creature.type}
                    </div>
                    <p className="creature-excerpt">
                      {creature.description.substring(0, 120)}...
                    </p>
                    <div className="creature-royaume" style={{ borderTopColor: couleur }}>
                      <span className="royaume-badge" style={{ backgroundColor: couleur }}>
                        {royaumeNom}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="creators-section">
        <div className="container">
          <motion.div
            className="creators-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Les Créateurs</h2>
            <p className="creators-text">
              Au commencement du Tétravers, des entités primordiales ont façonné la réalité
              elle-même. Ces Créateurs, dont les noms se perdent dans l'écho du temps,
              ont tissé les fils de la magie et établi les fondations des quatre royaumes.
              Leur héritage perdure dans chaque particule d'énergie, dans chaque battement
              du cosmos. Bien que leur forme physique ait transcendé notre compréhension,
              leur présence imprègne encore le Tétravers, guidant subtilement l'évolution
              de cet univers mystérieux.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CreaturesPage;
