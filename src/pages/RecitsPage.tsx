import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, Recit } from '../lib/supabase';
import './RecitsPage.css';

const RecitsPage = () => {
  const [recits, setRecits] = useState<Recit[]>([]);
  const [selectedRecit, setSelectedRecit] = useState<Recit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecits();
  }, []);

  const loadRecits = async () => {
    try {
      const { data, error } = await supabase
        .from('recits')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setRecits(data || []);
    } catch (error) {
      console.error('Erreur chargement récits:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultRecits = [
    {
      titre: 'L\'Éveil du Tétravers',
      extrait: 'Au commencement, il n\'y avait que le Vide. Un néant absolu où le temps et l\'espace n\'avaient aucun sens...',
      contenu: `Au commencement, il n'y avait que le Vide. Un néant absolu où le temps et l'espace n'avaient aucun sens. Puis, dans ce silence cosmique, une étincelle de conscience s'éveilla. Cette première pensée, pure et primordiale, donna naissance à la Transcendance.

La Transcendance, dans sa sagesse infinie, comprit qu'un univers unique serait fragile. Elle décida donc de tisser quatre dimensions entrelacées, chacune reflétant une facette différente de la réalité. Ainsi naquit le Tétravers.

Le premier royaume à émerger fut le Royaume des Éclats, où la lumière elle-même se fragmentait en mille vérités cristallines. Puis vinrent les Flammes, incarnation de la passion destructrice et créatrice. Les Brumes suivirent, voilant la frontière entre illusion et réalité. Enfin, le Vide originel devint le quatrième royaume, gardien des possibilités infinies.`,
      categorie: 'Origines',
    },
    {
      titre: 'Les Premiers Créateurs',
      extrait: 'Ils étaient cinq, bien que le nombre soit trompeur pour décrire des entités qui existaient au-delà du comptable...',
      contenu: `Ils étaient cinq, bien que le nombre soit trompeur pour décrire des entités qui existaient au-delà du comptable. Les premiers Créateurs ne possédaient pas de forme physique telle que nous la concevons. Ils étaient pure essence, volonté incarnée, conscience cristallisée.

Leur mission était claire : donner forme au Tétravers, établir les lois de la magie, et créer les gardiens qui préserveraient l'équilibre. Chaque Créateur apporta sa contribution unique.

Le premier enseigna l'art de l'Illusion, révélant que la perception façonne la réalité. Le deuxième insuffla la Pureté, cette magie de création absolue. Le troisième déchaîna les forces Destructrices, nécessaires au cycle de renouveau. Les deux derniers restent mystérieux, leurs noms perdus même pour les plus anciennes archives.

Leur œuvre accomplie, les Créateurs transcendèrent leur existence, devenant un avec le Tétravers lui-même. Certains disent qu'ils observent encore, tissés dans le tissu même de la réalité.`,
      categorie: 'Légendes',
    },
    {
      titre: 'La Guerre des Brumes',
      extrait: 'Il fut un temps où le Royaume des Brumes menaça de consumer tous les autres royaumes dans ses voiles d\'illusion...',
      contenu: `Il fut un temps où le Royaume des Brumes menaça de consumer tous les autres royaumes dans ses voiles d'illusion. C'était l'ère que les chroniqueurs nomment la Grande Distorsion.

Un maître des illusions, dont le nom a été effacé de l'histoire, découvrit un moyen de fusionner les trois types de magie. Le pouvoir qui en résulta était si immense qu'il commença à dissoudre les frontières entre les royaumes. La réalité elle-même devenait malléable, indistinguable du rêve.

La Transcendance dut intervenir directement, un événement rarissime. Les dragons célestes furent convoqués, les licornes éthérées mobilisées, et même les ombres spectrales prirent part à la bataille. Ce ne fut pas un conflit de violence, mais une guerre de perception, où chaque camp tentait d'imposer sa vision de la réalité.

Finalement, l'équilibre fut restauré, mais à un prix. Le Royaume des Brumes fut scellé partiellement, ses connexions aux autres dimensions limitées. Depuis ce jour, traverser vers les Brumes nécessite des rituels complexes et dangereux.`,
      categorie: 'Histoire',
    },
  ];

  const displayRecits = recits.length > 0 ? recits : defaultRecits;

  return (
    <div className="recits-page">
      <motion.div
        className="recits-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="page-title glow-text">Archives du Tétravers</h1>
        <p className="page-subtitle">
          Les récits et connaissances ancestrales de l'univers
        </p>
      </motion.div>

      {loading ? (
        <div className="loading-state">Consultation des archives...</div>
      ) : (
        <section className="recits-codex">
          <div className="container">
            <div className="recits-list">
              {displayRecits.map((recit, index) => {
                const categorie = 'categorie' in recit ? recit.categorie : 'Archives';
                const recitKey = 'id' in recit ? (recit as Recit).id : `default-${index}`;

                return (
                  <motion.article
                    key={recitKey}
                    className="recit-entry"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => 'id' in recit ? setSelectedRecit(recit as Recit) : setSelectedRecit({ ...recit, id: String(index), published_at: '', created_at: '' } as Recit)}
                  >
                    <div className="recit-meta">
                      <span className="recit-category">{categorie}</span>
                    </div>
                    <h2 className="recit-title">{recit.titre}</h2>
                    <p className="recit-excerpt">{recit.extrait}</p>
                    <button className="recit-read-more">Lire le récit complet →</button>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {selectedRecit && (
          <motion.div
            className="recit-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRecit(null)}
          >
            <motion.div
              className="recit-modal"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedRecit(null)}
              >
                ✕
              </button>

              <div className="recit-modal-header">
                <span className="recit-category">
                  {'categorie' in selectedRecit ? selectedRecit.categorie : 'Archives'}
                </span>
                <h2>{selectedRecit.titre}</h2>
              </div>

              <div className="recit-modal-content">
                {selectedRecit.contenu.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecitsPage;
