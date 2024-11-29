import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokeCard = ({ searchTerm }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCards = async () => {
      setLoading(true);
      try {
        const query = searchTerm 
          ? `q=name:${searchTerm}` 
          : ''; // If no searchTerm, fetch all cards
        const response = await axios.get(
          `https://api.pokemontcg.io/v2/cards?${query}`,
          {
            headers: {
              'X-Api-Key': 'f578f40d-a043-4b99-a37b-3e9cca98715e',
            },
          }
        );

        // Sort cards alphabetically by name
        const sortedCards = response.data.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCards(sortedCards);
      } catch (error) {
        console.error('Error fetching TCG cards:', error);
        setCards([]); // Reset if error occurs
      }
      setLoading(false);
    };

    getCards();
  }, [searchTerm]);

  return (
    <div className="tcg-card-section">
      <h2>{searchTerm ? `TCG Cards for "${searchTerm}"` : 'All TCG Cards'}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cards.length > 0 ? (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              <img src={card.images.small} alt={card.name} />
              <h3>{card.name}</h3>
              <p>{card.set.name}</p>
              <p>*{card.rarity}</p>
              <p>{card.artist}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cards found.</p>
      )}
    </div>
  );
};

export default PokeCard;
