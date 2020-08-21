import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar({ currentUser, logout }) {
  return (
    <nav>
      <div className="container">
        <NavLink className="logo" to='/'>
          <h1>Sage Space</h1>
        </NavLink>
        <ul className="nav-list">
          <li className='nav-item'>
            {/* Don't forget the 'exact' prop for home nav link */}
            <NavLink className='nav-link' exact to='/'>Dashboard</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' exact to='/games'>Games</NavLink>
          </li>
          {currentUser && (
            <React.Fragment>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/games/new'>Add Game</NavLink>
              </li>
              <li className='nav-item'>
                <span onClick={logout} className='nav-link'>Logout</span>
              </li>
            </React.Fragment>
          )}
          {!currentUser && (
            <>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>Login</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>Register</NavLink>
              </li>
            </>
          )}
          
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
