import './App.css';
import './styles.scss';
import PokeList from './components/PokeList';
import PokeCard from './components/PokeCard';
import PokeSearch from './components/PokeSearch'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer'

function App() {
  return (
      <div className= "App">
        <Navbar />
        <br />
        <br />
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/PokeList" element={<PokeList/>} />
            <Route path="/pokecard" element={<PokeCard />} />
            <Route path="/PokeSearch" element={<PokeSearch />} />
          </Routes>
        </Router>
        <Footer />
      </div>
  );
}

export default App;
