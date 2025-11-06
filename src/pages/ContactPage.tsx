import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import './ContactPage.css';

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Veuillez entrer une adresse email valide.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email, is_active: true }]);

      if (error) {
        if (error.code === '23505') {
          setMessage({
            type: 'error',
            text: 'Cette adresse email est déjà inscrite à la Veille de la Transcendance.',
          });
        } else {
          throw error;
        }
      } else {
        setMessage({
          type: 'success',
          text: 'Bienvenue dans la Veille de la Transcendance ! Vous recevrez nos communications mystiques.',
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Erreur inscription:', error);
      setMessage({
        type: 'error',
        text: 'Une erreur est survenue. Veuillez réessayer.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="page-title glow-text">Rejoignez la Veille</h1>
        <p className="page-subtitle">
          Inscrivez-vous à la Veille de la Transcendance et recevez les dernières révélations du Tétravers
        </p>
      </motion.div>

      <section className="newsletter-section">
        <div className="container">
          <motion.div
            className="newsletter-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="newsletter-icon">
              <span className="pulse-animation">✉</span>
            </div>

            <h2 className="newsletter-title">La Veille de la Transcendance</h2>
            <p className="newsletter-description">
              Rejoignez une communauté d'explorateurs du Tétravers. Recevez des révélations sur
              les royaumes, des récits inédits, et soyez informé des événements cosmiques à venir.
            </p>

            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="email-input"
                  disabled={loading}
                  required
                />
                <motion.button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? 'Inscription...' : 'S\'inscrire'}
                </motion.button>
              </div>

              {message && (
                <motion.div
                  className={`form-message ${message.type}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {message.text}
                </motion.div>
              )}
            </form>

            <div className="newsletter-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">✦</span>
                <span>Récits exclusifs du Tétravers</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">◈</span>
                <span>Révélations sur les créatures légendaires</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✧</span>
                <span>Actualités des quatre royaumes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="container">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Connectez-vous au Tétravers</h2>
            <p className="contact-text">
              Le Tétravers existe à la fois partout et nulle part. Pour ceux qui cherchent à
              approfondir leur connexion avec cet univers mystérieux, la Veille de la Transcendance
              est votre porte d'entrée vers des connaissances plus profondes.
            </p>

            <div className="cosmic-divider">
              <span>✦</span>
              <span>◈</span>
              <span>✧</span>
            </div>

            <p className="contact-quote">
              "Dans l'œil de la Transcendance, tous les chemins convergent vers la compréhension."
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
