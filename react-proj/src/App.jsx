import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import NewPortfolio from './pages/NewPortfolio';
import SideAnimations from './components/SideAnimations';
import Background from './components/Background';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App relative">
      <Background />
      <div className="flex grid grid-cols-1 lg:grid-cols-6">
        <div className="hidden lg:col-span-1 md:block" />
        <div className="lg:col-span-4 col-span-1">
          <Router>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/new" element={<NewPortfolio />} />
            </Routes>
          </Router>
        </div>
        <div className="hidden lg:col-span-1 md:block" />
      </div>
    </div>
  );
}

export default App;