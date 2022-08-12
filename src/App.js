import React, { useState } from 'react';

import { Header } from './components/Header';
import { PublicContent } from './components/publicUser/PublicContent';
import { AdminContent } from './components/admin/AdminContent';

const App = () => {
  const [ jwtToken, setJwtToken ] = useState('');
  const [ admin, setAdmin ] = useState( false );

  if( admin ) {
    return (
      <div className='App'>
        <Header admin={ admin }/>
        <AdminContent jwtToken={ jwtToken }/>
      </div>
    )
  }

  return (
    <div className='App'>
      <Header admin={ admin }/>
      <PublicContent setJwtToken={ setJwtToken } setAdmin={ setAdmin }/>
    </div>
  )
};

export { App };
