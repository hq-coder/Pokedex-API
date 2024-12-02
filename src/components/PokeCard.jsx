import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PokeCard = ({ searchTerm }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sets, setSets] = useState([]);


    // Fetch all sets on component mount
    useEffect(() => {
      const getSets = async () => {
        try {
          const response = await axios.get(`https://api.pokemontcg.io/v2/sets`, {
            headers: {
              'X-Api-Key': 'f578f40d-a043-4b99-a37b-3e9cca98715e',
            },
          });
          setSets(response.data.data); // Store sets data
        } catch (error) {
          console.error('Error fetching TCG sets:', error);
          setSets([]);
        }
      };
  
      getSets();
    }, []);

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

        function PokemonCard({ searchTerm, onClick, style }) {
          if (!searchTerm) return null;
        
          return (
            <div 
              style={{ ...style }} // Apply the passed styles
              onClick={onClick} // Attach the onClick handler
            >
              <h3>{searchTerm}</h3>
              <p>Click to view details</p>
            </div>
          );
        }

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

    // Helper function to get release date from sets
    const getReleaseDate = (setId) => {
      const matchingSet = sets.find((set) => set.id === setId);
      return matchingSet?.releaseDate || 'Unknown Release Date';
    };
  
  function PokeCard({ searchTerm, onClick }) {
    if (!searchTerm) return null;
  
    return (
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        <h3>{searchTerm}</h3>
        <p>Click to view details</p>
      </div>
    );
  }

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
              <p>{card.rarity}</p>
              <p>{card.artist}</p>
              <p>{getReleaseDate(card.set.id)}</p>
              
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
