import React from 'react';
import { useNavigate } from 'react-router-dom';

import navbar from '../assets/images/navbar.svg';

const Header = ( props ) => {
  const { admin } = props;

  const navigate = useNavigate();

  if( admin ) {
    return(
      <div className='Header'>
        <h1 onClick={ () => { navigate('/') } }>
          maiiJournal
        </h1>
        <input type='image' src={ navbar } alt='navMenu'/>
      </div>
    );
  }

  return(
    <div className='Header'>
      <h1 onClick={ () => { navigate( '/' ) } }>
        maiiJournal
      </h1>
    </div>
  );
};

export { Header };