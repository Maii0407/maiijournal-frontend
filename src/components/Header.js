import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return(
    <div className='Header'>
      <h1 onClick={ () => { navigate( '/' ) } }>
        maiiJournal
      </h1>
    </div>
  );
};

export { Header };