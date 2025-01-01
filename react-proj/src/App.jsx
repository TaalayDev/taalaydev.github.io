import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import NewPortfolio from './pages/NewPortfolio';
import NeuralBackground from './components/NeuralBackground';
import AnimatedBackground from './components/AnimatedBackground';
import SideAnimations from './components/SideAnimations';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App relative">
      <SideAnimations />
      <div className="flex grid grid-cols-6">
        <div className="col-span-1" />
        <div className="col-span-4">
          <Router>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/new" element={<NewPortfolio />} />
            </Routes>
          </Router>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
}

export default App;