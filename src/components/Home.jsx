import React, { useState, useRef, useEffect } from 'react'; // Added useState import
import './Home.css';
import bannerImage from '../images/pokemon-Header.png';
import pokedexImg from '../images/Pokedex.png';
import charizardImg from '../images/charizard.gif';
import blastoiseImg from '../images/blastoise.gif';
import venasaurImg from '../images/venasaur.webp';

const images = [
  charizardImg,
  blastoiseImg,
  venasaurImg
];

const Home = () => {
  const pRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Find the index of the current image
      const currentIndex = images.indexOf(currentImage);
      // Calculate the index of the next image
      const nextIndex = (currentIndex + 1) % images.length;
      // Update the current image
      setCurrentImage(images[nextIndex]);
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentImage]);

  useEffect(() => { // Moved the scrolling effect to a separate useEffect hook
    const p = pRef.current;
    p.scrollTop = 0;

    const intervalId = setInterval(() => {
      p.scrollTop += 2;
      if (p.scrollTop >= p.scrollHeight - p.clientHeight) {
        p.scrollTop = 0;
      }
    }, 80);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='home-container'>

      <span className='poke-header-container'>
        <img src={bannerImage} alt='banner' />
      </span>

         <div className='pokedex-container'>
            <div className='pokedex-img-container'>
          <img src={pokedexImg} alt='pokedex' className='pokedex-img' />

          <p ref={pRef}>
        Welcome To <br /> <br /> hqCoder  PokeDEX !! <br /> <br />The Pokedex is a crucial tool for trainers who want to become Pokemon Masters. It's an electronic encyclopedia that contains information about every known Pokemon species, including their types, moves, abilities, and evolutionary stages. The hqCoder Pokedex takes this tool to the next level, providing trainers with up-to-date information on all the latest Pokemon species and their stats.

When exploring the hqCoder Pokedex, you'll have the opportunity to learn about the evolution stages of each Pokemon species. Evolution is a natural process that allows a Pokemon to grow stronger and more powerful over time. By understanding the evolutionary stages of a Pokemon, trainers can plan out their training and battling strategies to maximize their potential.

In addition to evolution stages, the hqCoder Pokedex also provides information on the different regions where Pokemon species can be found. Each region has its unique environment and types of Pokemon species that live there. By exploring different regions, trainers can expand their knowledge of the Pokemon world and discover new and exciting species to catch and train.

So take a look around the hqCoder Pokedex and see what you can find! With its vast collection of information and stats on all your favorite Pokemon species, you're sure to become a master trainer in no time. But be careful not to let Pikachu catch the berry!</p>


          <a href='/PokeList'>
            <button className='pokedex-button'>
              EVOLUTIONS
            </button>
          </a>

          <a href='/PokeSearch'>
            <button className='pokedex-button-1'>
              POKÉDEX <br /> DATA
            </button>
          </a>
          
          <a href='/pokecard-showroom'>
          <button className='pokedex-button-2'
           onClick={() => { console.log('Clicked on second button!')}}>
            TRAINERS
          </button>
          </a>


       
          </div>
            

        <img src={currentImage} alt='charizard' className='charizard-img' /> {/* Use the currentImage state instead of charizardImg directly */}
       
        </div>

        
 <div className='pokedex-vid'><iframe width="560" height="315" src="https://www.youtube.com/embed/lpJJBfJYAnY?start=4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
    </div>
    
  );
};

export default Home;
