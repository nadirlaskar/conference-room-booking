import React from 'react';
import logo from '../assets/logo.svg';
import './Header.css';

function Header() {
  return (
      <header className="Header-main">
        <img src={logo} className="Header-logo" alt="logo" />
        <p>Conference Room Booking System</p>
      </header>
  );
}

export default Header;
