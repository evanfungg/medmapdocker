import React from 'react';
import NavButton from './NavButton';
import './styles.css'; 

const NavBar = () => {
  return (
    <div className="nav-container">
      <img className='img' src="./medmap.png" alt="Site Logo" />
      
      <div className="nav-buttons">
        <NavButton link='/' name="Home" />
        <NavButton link='/med-map' name="Med Map" />
        <NavButton link='/med-search' name="Med Search" />
      </div>
    </div>
  );
};

export default NavBar;
