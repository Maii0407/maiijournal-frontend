import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Post } from './components/post/Post';
import { PostDetail } from './components/post/PostDetail';

const App = () => {
  const [ postsData, setPostsData ] = useState([]);
  const [ fetchStatus, setFetchStatus ] = useState( false );

  const navigate = useNavigate();

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
    <div className='App'>
      <div className='header-container'>
        <h1 onClick={ () => { navigate( '/' ) } }>
          maiiJournal
        </h1>
      </div>
      <div className='content-container'>
        <Routes>
          <Route path='/' element={
            <div className='postList-container'>
              {
                postsData.map( ( post ) => {
                  return <Post key={ post._id } postData={ post }/>
                })
              }
            </div>
          }
          />
          {
            postsData.map( ( post ) => {
              return <Route
                  key={ post._id }
                  path={ `/posts/${ post._id }` }
                  element={ <PostDetail postData={ post } /> }
                />
            })
          }
        </Routes>
      </div>
    </div>
  )
};

export { App };
