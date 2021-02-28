import React from 'react';
import logo from '../../styles/logo.png'
import './Navbar.css'

const Navbar = () => {
  return (
    // <nav className="navbar navbar-dark bg-dark ">
    //   <div><span className="navbar-brand mb-0 h1 "><img src={logo} alt="Welcome to Moody Melody" width="70" height="70" />Moody Melody </span></div>
    //   <div><a href="/lyrics" className="navbar-item">Find Lyrics</a></div>
    //   <div><a href="/" className="navbar-item">Homepage</a></div>
    // </nav>

    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand" href="#"><img src={logo} alt="Welcome to Moody Melody" width="60" height="60" />Moody Melody </a>
      <div>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">HomePage</a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="/lyrics">Lyrics</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;