import "./Navbar.css";
import React from 'react';
import pikachuRun from "../images/pikachuRun.gif";
import rollingPoke from "../images/rollingPoke.gif";
import { TbPokeball }  from 'react-icons/tb';


function Navbar() {


  return (
    <div className='nav-container'>
      <nav>
        <ul>
          <li className="home"><a href="/"><TbPokeball /></a></li>
       
        </ul>
      </nav>
      <img src={pikachuRun} className="pikachu-image" alt="Pikachu running" />
      <img src={rollingPoke} className="rolling-pokeball" alt="rolling pokeball" />
    </div>
  );
}

export default Navbar;
