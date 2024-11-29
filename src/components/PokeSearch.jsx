import React, { useState , useEffect } from 'react';
import { SiPokemon } from "react-icons/si"
import { Card,} from 'react-bootstrap';
import PokeCard from './PokeCard';

import './PokeSearch.css';

function PokeSearch() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const videoId = 'NzxHrd53F0k';



  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      setPokemonList(data.results);
    };
    fetchPokemonList();
  }, []);
  

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchTerm);

    const API_URL = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;

    try {
      const response = await fetch(API_URL);
      const pokemon = await response.json();
      console.log('line 25', pokemon);
      setResults([pokemon]);
    } catch (error) {
      console.log(error);
      setResults([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm.toLowerCase())
  );

  const searchInput = () => {
  }
   
  return (
    <div class="background-color">
      
      <div className="body">
          <div className="header">
      <div>
      <h1 className="header-db">
  <SiPokemon className="header-icon pokelogo" /> Database
</h1>
      </div>
      <form onSubmit={handleSearch}>
      <input
          type="text"
          placeholder="Pokemon name or ID."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="submit" type="submit" onClick={handleSearch}>
          Search
        </button>
        {searchTerm !== "" && filteredPokemonList.length > 0 && (
          <div className="dropdown">
            {filteredPokemonList.map((pokemon) => (
              <div key={pokemon.name} onClick={() => setSearchTerm(pokemon.name)}>
                {pokemon.name}
              </div>
            ))}
          </div>
        )}
        
     
      </form>
      </div>
       
        {searchInput()}
        {results.map((pokemon) => {
          const id = pokemon.id;
          const name = pokemon.name;
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          const type = pokemon.types.map((type) => type.type.name).join(', ');
          const weight = pokemon.weight / 10;
          const height = pokemon.height / 10;
          const stats = pokemon.stats;
          const abilities = pokemon.abilities.map((ability) => ability.ability.name).join(', ');
          const moves = pokemon.moves.map((move) => move.move.name).join(', ');
          const baseExperience = pokemon.base_experience;
          const species = pokemon.species.name;
          const gameIndices = pokemon.game_indices.map((gameIndex) => gameIndex.version.name).join(', ');


          return (
            <Card key={id} className="pokedex-container2" style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', width: '83%', height: '70%',border: 'none', maxHeight: '40vh' }}>
            <Card.Img variant="left" src={image} alt={name} style={{ width: '50%', objectFit: 'contain', paddingLeft: '90px' }} />
            <Card.Body style={{ width: '55%', objectFit: 'contain', maxHeight: '700vh', overflow: 'auto', paddingLeft: '13%', marginTop: '15%', marginLeft: '-10px' }} >
            <Card.Title className='pokename capitalized underline'>{name}</Card.Title>

              <Card.Text>#: {id}</Card.Text>
              <Card.Text>Type: {type}</Card.Text>
              <Card.Text>Weight: {weight} kg</Card.Text>
              <Card.Text>Height: {height} m</Card.Text>
              <Card.Text>Abilities: {abilities}</Card.Text>
<Card.Text>Moves: {moves}</Card.Text>
<Card.Text>Base Experience: {baseExperience}</Card.Text>
<Card.Text>Species: {species}</Card.Text>
<Card.Text>Game Indices: {gameIndices}</Card.Text>

              <Card.Text>Stats:</Card.Text>
              {stats.map((stat) => (
                <div key={stat.stat.name} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <small>{stat.stat.name}</small>
                    <small>{stat.base_stat}</small>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${stat.base_stat}%` }}
                      aria-valuenow={stat.base_stat}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
          
          
          );
        })}
     
      </div>
      <PokeCard /> 
   </div>
  );
}

export default PokeSearch;
