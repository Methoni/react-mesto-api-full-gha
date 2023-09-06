import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header({ direction, text, userEmail, onSignOut }) {

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Mesto" />

      <div className="header__text">
        <p className="header__email">{userEmail}</p>
        {
          <Link to={direction} className="header__link" onClick={onSignOut}>
            {text}
          </Link>
        }
      </div>
    </header>
  );
}

export default Header;
