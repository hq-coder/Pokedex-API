import React from 'react';
import { Card } from 'react-bootstrap';
import './Favorites.css';

const Favorites = ({ favorites }) => {
  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <div className="favorites-grid">
        {favorites.map((pokemon, index) => (
          <Card key={index} className="favorite-card">
            <Card.Img
              variant="top"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <Card.Body>
              <Card.Title>{pokemon.name.toUpperCase()}</Card.Title>
              <Card.Text>
                Type: {pokemon.types.map((type) => type.type.name).join(', ')}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
