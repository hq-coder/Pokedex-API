import React, { useState, useEffect } from 'react';
import './PokeCardShowroom.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import electric from "../../src/images/electric.png";
import grass from "../../src/images/leaf.png";
import poison from "../../src/images/poison.webp";
import fairy from "../../src/images/fairy.png";
import fire from "../../src/images/fire.png";
import ground from "../../src/images/ground.png";
import normal from "../../src/images/normal.png";
import water from "../../src/images/water.png";
import ice from "../../src/images/ice.png";
import dragon from "../../src/images/dragon.png";
import dark from "../../src/images/dark.jpeg";
import steel from "../../src/images/steel.png";
import bannerImage from '../images/pokemon-Header.png';

function PokeCardShowRoom({ onFavoriteAdd }) {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [tcgCards, setTcgCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const location = useLocation();
  const selectedPokemon = location.state?.pokemon;

  useEffect(() => {
    if (selectedPokemon) {
      fetchPokemonData(selectedPokemon.id);
    } else {
      fetchPokemonData(currentIndex); // Load random Pokémon if none is passed
    }
  }, [selectedPokemon]);

  // Fetch Pokémon data by ID
  const fetchPokemonData = async (id) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setCurrentPokemon(response.data);
      setCurrentIndex(id);
      fetchPokemonCards(response.data.name);
    } catch (error) {
      console.error('Failed to fetch Pokémon data:', error);
    }
  };

  // Fetch Pokémon TCG cards by name
  const fetchPokemonCards = async (name) => {
    try {
      const response = await axios.get(
        `https://api.pokemontcg.io/v2/cards?q=name:${name}`,
        {
          headers: {
            'X-Api-Key': 'f578f40d-a043-4b99-a37b-3e9cca98715e', // Replace with your actual API key
          },
        }
      );
      setTcgCards(response.data.data);
      setCurrentCardIndex(0);
    } catch (error) {
      console.error('Failed to fetch Pokémon TCG cards:', error);
    }
  };

  const getBackgroundImageUrl = (type) => {
    switch (type) {
      case 'electric': return { backgroundImage: `url(${electric})` };
      case 'grass': return { backgroundImage: `url(${grass})` };
      case 'poison': return { backgroundImage: `url(${poison})` };
      case 'fairy': return { backgroundImage: `url(${fairy})` };
      case 'fire': return { backgroundImage: `url(${fire})` };
      case 'ground': return { backgroundImage: `url(${ground})` };
      case 'normal': return { backgroundImage: `url(${normal})` };
      case 'water': return { backgroundImage: `url(${water})` };
      case 'ice': return { backgroundImage: `url(${ice})` };
      case 'dragon': return { backdragonImage: `url(${ground})` };
      case 'dark': return { backgroundImage: `url(${dark})` };
      case 'steel': return { backgroundImage: `url(${steel})` };

      // Add all other types here...
      default: return { backgroundColor: '#f5f5f5' }; // Default neutral background
    }
  };

  // Fetch next Pokémon
  const fetchNextPokemon = () => {
    const nextId = (currentIndex + 1) % 1010 || 1; // Ensure valid IDs (looping back)
    fetchPokemonData(nextId);
  };

  // Fetch previous Pokémon
  const fetchPreviousPokemon = () => {
    const prevId = (currentIndex - 1 + 1010) % 1010 || 1; // Ensure valid IDs (looping back)
    fetchPokemonData(prevId);
  };

  // Fetch next TCG card
  const fetchNextCard = () => {
    if (currentCardIndex < tcgCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0); // Loop back to the first card
    }
  };

  // Fetch previous TCG card
  const fetchPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(tcgCards.length - 1); // Loop back to the last card
    }
  };

  // Add Pokémon or card to favorites
  const handleFavorite = () => {
    if (onFavoriteAdd && currentPokemon) {
      const favoriteCard = tcgCards[currentCardIndex];
      onFavoriteAdd({
        pokemon: {
          id: currentPokemon.id,
          name: currentPokemon.name,
          sprite: currentPokemon.sprites.front_default,
        },
        card: favoriteCard || null,
      });
    }
  };

  return (
    <div className="pokecard-showroom-container">
      <div className="card-navigation">
        <button onClick={fetchPreviousPokemon} className="arrow-button">
          &#8592; Previous Pokémon
        </button>
        <button onClick={fetchNextPokemon} className="arrow-button">
          Next Pokémon &#8594;
        </button>
      </div>

      {currentPokemon ? (
        <div className="pokemon-container">
          <div className="pokemon-info">
            <img
              src={currentPokemon.sprites.front_default}
              alt={currentPokemon.name}
              className="pokemon-image"
            />
            <h2 className="pokemon-name">{currentPokemon.name.toUpperCase()}</h2>
            <p className="pokemon-type">
              Type: {currentPokemon.types.map((type) => type.type.name).join(', ')}
            </p>
            <Button variant="success" className="favorite-button" onClick={handleFavorite}>
              Add to Favorites ❤️
            </Button>
          </div>

          <div className="tcg-card-section">
            {tcgCards.length > 0 ? (
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant="top"
                  src={tcgCards[currentCardIndex].images.large}
                  alt={tcgCards[currentCardIndex].name}
                />
                <Card.Body>
                  <Card.Title>{tcgCards[currentCardIndex].name}</Card.Title>
                  <Card.Text>
                    Rarity: {tcgCards[currentCardIndex].rarity || 'N/A'}
                    <br />
                    Set: {tcgCards[currentCardIndex].set.name}
                  </Card.Text>
                  <Button variant="primary" onClick={fetchPreviousCard}>
                    &#8592; Previous Card
                  </Button>
                  <Button variant="primary" onClick={fetchNextCard}>
                    Next Card &#8594;
                  </Button>
                  <Button variant="success" className="favorite-button" onClick={handleFavorite}>
              Add to Favorites ❤️
            </Button>
                </Card.Body>
              </Card>
            ) : (
              <p>No TCG cards available for this Pokémon.</p>
            )}
          </div>
     
          {/* Bottom Section */}
          <div className="pokemon-details">
            <h4>Details:</h4>
            <p>ID: {currentPokemon.id}</p>
            <p>Type: {currentPokemon.types.map((t) => t.type.name).join(', ')}</p>
            <p>Abilities: {currentPokemon.abilities.map((a) => a.ability.name).join(', ')}</p>
            <p>Base Stats:</p>
            <ul>
              {currentPokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
         
          </div>
        </div>
      ) : (
        <p>Loading Pokémon...</p>
      )}
    </div>
  );
}

export default PokeCardShowRoom;
