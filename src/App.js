import React, { useState, useEffect } from 'react';

import { Post } from './components/post/post';

const App = () => {
  const [ postsData, setPostsData ] = useState([]);
  const [ fetchStatus, setFetchStatus ] = useState( false );

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

    if( !fetchStatus ) {
      getPostsData()
      setFetchStatus( true );
    }
    return;
  }, [ postsData, fetchStatus ]);

  return (
    <div>
      <div>
        {
          postsData.map( ( post ) => {
            return <Post key={ post._id } postData={ post }/>
          })
        }
      </div>
    </div>
  )
};

export { App };
