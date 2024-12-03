import React from 'react';
import { Card } from 'react-bootstrap';
import './Favorites.css';

const Favorites = ({ favorites }) => {
  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <div className="favorites-grid">
        {favorites.map((favorite, index) => (
          <Card key={index} className="favorite-card">
            <Card.Img
              variant="top"
              src={favorite.pokemon.sprite}
              alt={favorite.pokemon.name}
            />
            <Card.Body>
              <Card.Title>{favorite.pokemon.name.toUpperCase()}</Card.Title>
              <Card.Text>
                Type: {favorite.pokemon.types.map((type) => type.type.name).join(', ')}
              </Card.Text>
              {favorite.card && (
                <Card.Text>
                  TCG Card: {favorite.card.name}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};


export default Favorites;
