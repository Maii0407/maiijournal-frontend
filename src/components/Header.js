import React from 'react';
import { useNavigate } from 'react-router-dom';

import navbar from '../assets/images/navbar.svg';

const Header = ( props ) => {
  const { admin } = props;

  const navigate = useNavigate();

  const openNav = () => {
    document.getElementById( 'AdminNavBar' ).style.visibility = 'visible';
    document.getElementById( 'NavMenu' ).style.width = '90%';
  };

  if( admin ) {
    return(
      <div className='Header'>
        <h1 onClick={ () => { navigate('/') } }>
          maiiJournal
        </h1>
        <input type='image' src={ navbar } alt='navMenu' onClick={ openNav }/>
      </div>
    );
  }

  return(
    <div className='Header'>
      <h1 onClick={ () => { navigate( '/maiijournal-frontend/' ) } }>
        maiiJournal
      </h1>
    </div>
  );
};

export { Header };