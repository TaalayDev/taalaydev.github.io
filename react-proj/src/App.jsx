import Portfolio from './pages/Portfolio';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  return (
    <div className="App relative min-h-screen noise-bg">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      {/* Dot grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-30" />

      {/* Particle network */}
      <ParticleBackground />

      {/* Main content */}
      <Portfolio />
    </div>
  );
}

export default App;