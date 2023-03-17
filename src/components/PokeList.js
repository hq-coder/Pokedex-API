import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokeCard from './PokeCard';
import "./PokeList.css"
import { Card, Row, Col } from 'react-bootstrap';
import electric from "../../src/images/electric.png";
import grass from "../../src/images/leaf.png";
import poison from "../../src/images/poison.png";
import fairy from "../../src/images/fairy.png";
import fire from "../../src/images/fire.png";
import ground from "../../src/images/ground.png";
import normal from "../../src/images/normal.png";
import water from "../../src/images/water.jpeg";
import psychic from "../../src/images/psychic.jpeg";
import ice from "../../src/images/ice.png";
import dragon from "../../src/images/dragon.png";
import dark from "../../src/images/dark.jpeg";
import steel from "../../src/images/steel.png";


const PokeList = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=800');
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
          weight: pokemon.weight,
          height: pokemon.height,
          stats: pokemon.stats
        }));

        setAllPokemons(combinedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllPokemons();
  }, []);

  const handlePokemonClick = async (pokemon) => {
    setSelectedPokemon(pokemon);

    try {
      const speciesResponse = await axios.get(pokemon.species.url);
      const evolutionChainResponse = await axios.get(speciesResponse.data.evolution_chain.url);
      setEvolutionChain(evolutionChainResponse.data.chain);
    } catch (error) {
      console.error(error);
    }
  }

  const handleBackButtonClick = () => {
    setSelectedPokemon(null);
    setEvolutionChain(null);
  }

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
                return { backgroundImage: `url("${psychic}")` };
                case 'rock':
                  return { backgroundImage: `url("${ground}")` };
                  case 'ghost':
                return { backgroundImage: `url("${psychic}")` };
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
  
      
  

  if (selectedPokemon) {
    return (
      <div className="poke-card">
        <PokeCard pokemon={selectedPokemon}/>
        <button onClick={handleBackButtonClick}>Back to List</button>
        {evolutionChain.length > 0 && (
          <div className="evolution-chain">
            <h2>Evolution Chain:</h2>
            <div className="evolution-chain-list">
              {evolutionChain.map((evolution) => (
                <span key={evolution}>{evolution}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="poke-list">
      <Row xs={6} lg={9} className="g-4">
        {allPokemons.map((pokemon) => (
          <Col key={pokemon.id}>
            <Card className="poke-item" onClick={() => handlePokemonClick(pokemon)} style={{
                ...getBackgroundImageUrl(pokemon.type[0]),
                backgroundSize: 'cover'
              }}>
              <Card.Img variant="top" src={pokemon.image} alt={pokemon.name} />
              <Card.Body>
                <Card.Text>#{pokemon.id}</Card.Text>
                <Card.Title>{pokemon.name}</Card.Title>
                <Card.Text>Type: {pokemon.type}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PokeList;
