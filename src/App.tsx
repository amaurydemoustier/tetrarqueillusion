import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage';
import UniversPage from './pages/UniversPage';
import CreaturesPage from './pages/CreaturesPage';
import RecitsPage from './pages/RecitsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <>
      <div className="stars-background" />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/univers" element={<UniversPage />} />
          <Route path="/creatures" element={<CreaturesPage />} />
          <Route path="/recits" element={<RecitsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
