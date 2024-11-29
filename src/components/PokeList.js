import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import "./PokeList.css"
import "../styles.scss";
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

        // Combine the data and set the state
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
        setLoading(false); // Set loading state to false when data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllPokemons();
  }, []);
  useEffect(() => {
    const filtered = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }, [allPokemons, searchTerm]);
  

  

  const getBackgroundImageUrl = (type) => {
    switch (type) {
      case 'grass':
        return { backgroundImage: `url("${grass}")` };
      case 'electric':
        return { backgroundImage: `url("${electric}")` };
      case 'poison':
        return { backgroundImage: `url("${poison}")` };
      case 'fairy':
        return { backgroundImage: `url("${fairy}")` };
      case 'fire':
        return { backgroundImage: `url("${fire}")` }; 
      case 'ground':
        return { backgroundImage: `url("${ground}")` };
      case 'normal':
        return { backgroundImage: `url("${normal}")` };
        case 'water':
          return { backgroundImage: `url("${water}")` };
          case 'bug':
            return { backgroundImage: `url("${grass}")` };
            case 'fighting':
              return { backgroundImage: `url("${ground}")` };
              case 'psychic':
                return { backgroundImage: `url("${poison}")` };
                case 'rock':
                  return { backgroundImage: `url("${ground}")` };
                  case 'ghost':
                return { backgroundImage: `url("${poison}")` };
                case 'ice':
                  return { backgroundImage: `url("${ice}")` };
                  case 'dragon':
                    return { backgroundImage: `url("${dragon}")` };
                    case 'dark':
                      return { backgroundImage: `url("${dark}")` };
                      case 'steel':
                        return { backgroundImage: `url("${steel}")` };
      default:
        return { backgroundImage: `url("./images/pokecardTemplate.png")` };
    }
  };
  
      
  return (
    <div className="poke-list">
      <input
        type="text"
        placeholder="Search Pokemons"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="search-bar"
      />
      <img src={bannerImage} alt="banner" className="pokemon-header" />
      <br />
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
                  height: "425px",
                  position: "relative",
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
                  <div>Type: {pokemon.type}</div>
                  <br />
                  <h6>Abilities: {pokemon.abilities}</h6>
                  <h6>Moves: {pokemon.moves}</h6>
                  <button className='pokedex-button1'>PokeDex</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default PokeList;
