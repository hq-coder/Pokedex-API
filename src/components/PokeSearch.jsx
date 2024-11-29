import React, { useState, useEffect } from 'react';
import { SiPokemon } from 'react-icons/si';
import { Card } from 'react-bootstrap';
import PokeCard from './PokeCard';
import './PokeSearch.css';

function PokeSearch() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [lastSearchedPokemon, setLastSearchedPokemon] = useState('');
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
      setLastSearchedPokemon(searchTerm); // Update the searched Pokémon
    } catch (error) {
      console.log(error);
      setResults([]);
      setLastSearchedPokemon(''); // Clear if not found
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="background-color">
      <div className="body">
        <div className="header">
          <h1 className="header-db">
            <SiPokemon className="header-icon pokelogo" /> Database
          </h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Pokemon name or ID."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button className="submit" type="submit">
              Search
            </button>
            {searchTerm !== '' && filteredPokemonList.length > 0 && (
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

        {results.map((pokemon) => {
          const id = pokemon.id;
          const name = pokemon.name;
          const type = pokemon.types.map((type) => type.type.name).join(', ');
          const weight = pokemon.weight / 10;
          const height = pokemon.height / 10;
          const abilities = pokemon.abilities.map((ability) => ability.ability.name).join(', ');

          // Regular and Shiny Sprite URLs
          const regularSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          const shinySprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;

          return (
            <Card
              key={id}
              className="pokedex-container2"
              style={{
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'row',
                width: '83%',
                height: '70%',
                border: 'none',
                maxHeight: '40vh',
              }}
            >
              <div className="Poke-Sprites" >
                  <Card.Img
                  variant="top"
                  src={regularSprite}
                  alt={name}
                  style={{ width: '100px', objectFit: 'contain', marginBottom: '10px' }}
                />
               
                <Card.Img
                  variant="top"
                  src={shinySprite}
                  alt={`${name} shiny`}
                  style={{ width: '100px', objectFit: 'contain' }}
                />
                 <h2>Shiny</h2>
              </div>
              <Card.Body
                style={{
                  width: '55%',
                  objectFit: 'contain',
                  maxHeight: '700vh',
                  overflow: 'auto',
                  paddingLeft: '13%',
                  marginTop: '15%',
                  marginLeft: '-10px',
                }}
              >
                <Card.Title className="pokename capitalized underline">{name}</Card.Title>
                <Card.Text>#: {id}</Card.Text>
                <Card.Text>Type: {type}</Card.Text>
                <Card.Text>Weight: {weight} kg</Card.Text>
                <Card.Text>Height: {height} m</Card.Text>
                <Card.Text>Abilities: {abilities}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}

        {/* Render PokeCard and pass the last searched Pokémon */}
        <PokeCard searchTerm={lastSearchedPokemon} />
      </div>
    </div>
  );
}

export default PokeSearch;
