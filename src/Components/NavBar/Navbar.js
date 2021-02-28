import React from 'react';
import logo from '../../styles/logo.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark ">
      <div><span className="navbar-brand mb-0 h1 "><img src={logo} alt="Welcome to Moody Melody" width="70" height="70" />Moody Melody </span></div>
      <div><a href="/lyrics" className="navbar-item">Find Lyrics</a></div>
      <div><a href="/" className="navbar-item">Homepage</a></div>
    </nav>
  );
};

export default Navbar;