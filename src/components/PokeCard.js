import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokeCard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCards = async () => {
      setLoading(true);
      const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
        headers: {
          'X-Api-Key': 'f578f40d-a043-4b99-a37b-3e9cca98715e'
        },
      });
      setCards(response.data.data);
      setLoading(false);
    };
    getCards();
  }, []);

  return (
    <div>
      <h1>PokeCard App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              <img src={card.images.small} alt={card.name} />
              <h3>{card.name}</h3>
              <p>{card.set.name}</p>
              <p>{card.rarity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokeCard;
