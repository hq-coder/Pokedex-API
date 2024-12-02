import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./PokeList.css";
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

const PokeList = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [tcgCards, setTcgCards] = useState({}); // Store TCG cards for each Pokémon
  const [modalPokemon, setModalPokemon] = useState(null); // For modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1208');
        const data = response.data;

        // Get additional data for each Pokemon
        const pokemonDataPromises = data.results.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return response.data;
        });

        const pokemonData = await Promise.all(pokemonDataPromises);

        const combinedData = pokemonData.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          type: pokemon.types.map((type) => type.type.name),
          stats: pokemon.stats,
          abilities: pokemon.abilities.map((ability) => ability.ability.name).join(', '),
          moves: pokemon.moves.slice(0, 2).map((move) => move.move.name).join(', '),
        }));

        setAllPokemons(combinedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllPokemons();
  }, []);

  useEffect(() => {
    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }, [allPokemons, searchTerm]);

  const fetchTcgCards = async (pokemonName) => {
    if (tcgCards[pokemonName]) return; // Avoid fetching if already available
    try {
      const response = await axios.get(
        `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`
      );
      setTcgCards((prev) => ({
        ...prev,
        [pokemonName]: response.data.data,
      }));
    } catch (error) {
      console.error(`Error fetching TCG cards for ${pokemonName}:`, error);
    }
  };

  const handleNextCard = (pokemonName) => {
    setTcgCards((prev) => {
      const cards = prev[pokemonName];
      if (!cards || cards.length === 0) return prev;
      const [firstCard, ...restCards] = cards;
      return {
        ...prev,
        [pokemonName]: [...restCards, firstCard], // Rotate cards
      };
    });
  };

  
  const handleCardView = (pokemon) => {
    fetchTcgCards(pokemon.name);
    setModalPokemon(pokemon);
  };

  const handleCloseCardView = () => {
    setModalPokemon(null);
  };

  const getBackgroundImageUrl = (type) => {
    const typeImages = {
      grass,
      electric,
      poison,
      fairy,
      fire,
      ground,
      normal,
      water,
      bug: grass,
      fighting: ground,
      psychic: poison,
      rock: ground,
      ghost: poison,
      ice,
      dragon,
      dark,
      steel,
    };
    return { backgroundImage: `url(${typeImages[type] || "./images/pokecardTemplate.png"})` };
  };

  const handlePokedexClick = (pokemon) => {
    navigate('/pokecard-showroom', { state: { pokemon } });
  };

  return (
    <div className="poke-list">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="search-bar"
      />
      <img src={bannerImage} alt="banner" className="pokemon-header" />
      {loading ? (
        <p>Loading...</p>
      ) : (

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center g-">
          {filteredPokemons.map((pokemon) => (
            <div key={pokemon.id} className="col">
              <h2>{pokemon.name}</h2>
              <div
                className="poke-item"
                style={{
                  ...getBackgroundImageUrl(pokemon.type[0]),
                  backgroundSize: "cover",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  style={{
                    width: "82%",
                    height: "50%",
                    marginLeft: "9.2%",
                    position: "absolute",
                    top: "90px",
                  }}
                />
                <div className="poke-details">
                  <h4>#: {pokemon.id}</h4>
                  <div>Type: {pokemon.type.join(', ')}</div>
                  <h6>Abilities: {pokemon.abilities}</h6>
                  <h6>Moves: {pokemon.moves}</h6>
                  <button className="view-card-button" onClick={() => handleCardView(pokemon)}>
                    View Card
                  </button>
                  
  
                  <button
                    className="pokedex-button2"
                    onClick={() => handlePokedexClick(pokemon)}
                  >
                    Pokédex
                  </button>
 </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalPokemon && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalPokemon.name}</h2>
            {tcgCards[modalPokemon.name] && tcgCards[modalPokemon.name].length > 0 && (
              <div className="tcg-card">
                <img src={tcgCards[modalPokemon.name][0].images.large} alt="TCG Card" />
                <button className="modalbutton" onClick={() => handleNextCard(modalPokemon.name)}>Next Card</button>
              </div>
            )}
            <button className="modalbutton" onClick={handleCloseCardView}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeList;

