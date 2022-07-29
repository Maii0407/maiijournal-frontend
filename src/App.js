import React, { useState, useEffect } from 'react';

const App = () => {
  const [ postsData, setPostsData ] = useState([]);
  const [ fetchStatus, setFetchStatus ] = useState( false );

  useEffect( () => {
    const getPostsData = async () => {
      const url = 'http://localhost:4000/post/all';
  
      try {
        const response = await fetch( url, { method: 'GET', mode: 'cors' });
        const data = await response.json();
        setPostsData( data.postList );
        console.log( data );
      }
      catch( err ) {
        console.log( err );
      }
    };

    if( !fetchStatus ) {
      getPostsData()
      setFetchStatus( true );
    }
    return;
  }, [ postsData, fetchStatus ]);

  return (
    <div>Hello world</div>
  )
};

export { App };
