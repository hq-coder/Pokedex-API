import './App.css';
import './styles.scss';
import PokeList from './components/PokeList';
import PokeCard from './components/PokeCard';
import PokeSearch from './components/PokeSearch';
import PokeCardShowRoom from './components/PokeCardShowroom';
import Favorites from './components/Favorite';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [favorites, setFavorites] = useState([]);

  // Function to handle adding a Pokémon to the favorites list
  const handleAddToFavorites = (pokemon) => {
    // Prevent duplicate entries
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.name === pokemon.name)
        ? prevFavorites
        : [...prevFavorites, pokemon]
    );
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <br />
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PokeList" element={<PokeList />} />
          <Route path="/pokecard" element={<PokeCard />} />
          <Route path="/PokeSearch" element={<PokeSearch />} />
          <Route path="/pokecard-showroom" element={<PokeCardShowRoom />} />
     
          <Route
            path="/pokecard-showroom"
            element={
              <PokeCardShowRoom
                selectedPokemon={null} // For random cards initially
                onFavoriteAdd={handleAddToFavorites}
              />
            }
          />
          <Route path="/favorites" element={<Favorites favorites={favorites} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
