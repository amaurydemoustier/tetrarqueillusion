import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MysticEye from '../components/MysticEye/MysticEye';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1
            className="hero-title glow-text"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            LE TÉTRAVERS
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            La Magie au-delà des Illusions
          </motion.p>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Ouvrez l'Œil et Plongez dans la Réalité des Créations
          </motion.p>
        </motion.div>

        <motion.div
          className="eye-container"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          <MysticEye />
        </motion.div>

        <motion.button
          className="enter-button"
          onClick={() => navigate('/univers')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.8)' }}
          whileTap={{ scale: 0.95 }}
        >
          Accéder au Tétravers
        </motion.button>
      </div>

      <motion.section
        className="intro-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <h2 className="section-title">Un Univers de Magie et de Mystère</h2>
          <p className="section-description">
            Le Tétravers est un cosmos où la réalité se tisse d'illusions et de vérités entrelacées.
            Quatre royaumes coexistent, chacun portant sa propre essence magique, gardés par des
            créatures légendaires et régis par les lois mystérieuses de la Transcendance.
          </p>

          <div className="features-grid">
            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.05, borderColor: 'var(--color-cyan)' }}
            >
              <div className="feature-icon" style={{ color: 'var(--color-cyan)' }}>✦</div>
              <h3>Les Royaumes</h3>
              <p>Explorez quatre dimensions uniques, des Éclats cristallins au Vide infini</p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.05, borderColor: 'var(--color-magenta)' }}
            >
              <div className="feature-icon" style={{ color: 'var(--color-magenta)' }}>⚡</div>
              <h3>La Magie</h3>
              <p>Découvrez les systèmes magiques complexes et les niveaux de pouvoir</p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.05, borderColor: 'var(--color-purple)' }}
            >
              <div className="feature-icon" style={{ color: 'var(--color-purple)' }}>◈</div>
              <h3>Les Créatures</h3>
              <p>Rencontrez dragons, licornes, phénix et entités mystérieuses</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
