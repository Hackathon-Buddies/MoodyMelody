import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../styles/logo.png'
import* as ReactBootstrap from 'react-bootstrap'

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5">
      <span className="navbar-brand mb-0 h1 "><img src={logo} alt="Welcome to Moody Melody" width="70" height="70"/>Moody Melody </span>
      <Link  to="/lyrics">Find Lyrics</Link>
      <Link  to="/">Homepage</Link>
    </nav>
  );
};

export default Navbar;