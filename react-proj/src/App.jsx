import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Background from './components/Background';
import GlowingCursor from './components/GlowingCursor';
import ParticleNetwork from './components/ParticleNetwork';
import GamifiedPortfolio from './pages/GamifiedPortfolio';
import './App.css';

function App() {
  return (
    <div className="App relative">
      <Background />
      <ParticleNetwork />
      <GlowingCursor />
      <div className="flex grid grid-cols-1 lg:grid-cols-6">
        <div className="hidden lg:col-span-1 md:block" />
        <div className="lg:col-span-4 col-span-1">
          <Router>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/game" element={<GamifiedPortfolio />} />
            </Routes>
          </Router>
        </div>
        <div className="hidden lg:col-span-1 md:block" />
      </div>
    </div>
  );
}

export default App;