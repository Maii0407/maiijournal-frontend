import React, { useState, useEffect } from 'react';

import { Header } from './components/Header';
import { PublicContent } from './components/publicUser/PublicContent';
import { AdminContent } from './components/admin/AdminContent';

const App = () => {
  const [ postsData, setPostsData ] = useState([]);
  const [ fetchStatus, setFetchStatus ] = useState( false );
  const [ jwtToken, setJwtToken ] = useState('');
  const [ categoriesData, setCategoriesData ] = useState([]);

  useEffect( () => {
    const getPostsData = async () => {
      const url = 'http://localhost:4000/journal/posts';

      try {
        const response = await fetch( url, { method: 'GET', mode: 'cors' } );
        const data = await response.json();
        setPostsData( data.posts );
        console.log( data );
      }
      catch( err ) {
        console.log( err );
      }
    };

    const getCategories = async () => {
      const url = 'http://localhost:4000/journal/categories';

      try {
        const response = await fetch( url, { method: 'GET', mode: 'cors' });
        const data = await response.json();
        setCategoriesData( data.categories );
        console.log( data );
      }
      catch( err ) {
        console.log( 'Error:', err );
      }
    };

    if( !fetchStatus ) {
      getPostsData();
      getCategories();
      setFetchStatus( true );
    }
    return;
  }, [ postsData, categoriesData, fetchStatus ]);

  if( jwtToken !== '' ) {
    return (
      <div className='App'>
        <Header/>
        <AdminContent/>
      </div>
    )
  }

  return (
    <div className='App'>
      <Header/>
      <PublicContent
        categoryList={ categoriesData }
        postList={ postsData }
        setJwtToken={ setJwtToken }
      />
    </div>
  )
};

export { App };
