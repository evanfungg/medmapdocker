import React from 'react';
import Link from "next/link";
import './styles.css'




const NavButton = ({ link, name }) => {
  return (
    <Link href={link}>
      <button className = "btn">{name}</button>
    </Link>
  );
};

export default NavButton;
