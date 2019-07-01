import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="index-header">
      <h1 className="logo"> POLITICO</h1>

      <input type="checkbox" className="nav-toggle" id="nav-toggle" />
      <nav>
        <ul>
          <li>
            <Link to="/" className="current">
              Home
            </Link>
          </li>
          <li>
            <a href="mailto:emma4real37@gmail.com">Contact Us</a>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        </ul>
      </nav>

      <label forhtml="nav-toggle" className="nav-toggle-label">
        <span />
      </label>
    </header>
  );
};

export default NavBar;
