import './App.css';
import './styles.scss';
import PokeList from './components/PokeList';
import PokeCard from './components/PokeCard';
import PokeLog from './components/signin';
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
      prevFavorites.some((fav) => fav.pokemon.id === pokemon.id)
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
          <Route path="/signin" element={<PokeLog />} />
          <Route path="/Favorite" element={<Favorites />} />
          <Route path="/pokecard" element={<PokeCard />} />
          <Route path="/PokeSearch" element={<PokeSearch />} />
          
          {/* Updated this route to pass the onFavoriteAdd function */}
          <Route
            path="/pokecard-showroom"
            element={
              <PokeCardShowRoom
                onFavoriteAdd={handleAddToFavorites} // Pass the function here
              />
            }
          />
          
          {/* Favorites page */}
          <Route path="/favorites" element={<Favorites favorites={favorites} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
