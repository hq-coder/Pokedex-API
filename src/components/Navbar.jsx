import "./Navbar.css";
import React from 'react';
import pikachuRun from "../images/pikachuRun.gif";
import rollingPoke from "../images/rollingPoke.gif";
import { TbPokeball } from 'react-icons/tb';

function Navbar() {
  return (
    <div className='nav-container'>
      <nav>
        <ul className="nav-links">
          <li className="home">
            <a  href="/">
              <span className="navpokeball">
              <TbPokeball /> 
              </span>
            </a>
          </li>
          <li>
            <a href="/pokelist">PokeList</a>
          </li>
          <li>
            <a href="/pokecard-showroom">PokeDex</a>
          </li>
          <li>
            <a href="/pokesearch">PokeSearch</a>
          </li>
          <li>
            <a href="/favorites">PokeFavs</a>
          </li>

          <li>
            <a href="/signin">PokeLog</a>
          </li>
        </ul>
      </nav>
      <div className="nav-images">
        <img src={pikachuRun} className="pikachu-image" alt="Pikachu running" />
        <img src={rollingPoke} className="rolling-pokeball" alt="Rolling Pokeball" />
      </div>
    </div>
  );
}

export default Navbar;
