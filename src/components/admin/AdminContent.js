import React, { useState, useEffect } from 'react';

const AdminContent = ( props ) => {
  const { jwtToken } = props;

  const [ postsData, setPostsData ] = useState([]);
  const [ categoriesData, setCategoriesData ] = useState([]);
  const [ commentsData, setCommentsData ] = useState([]);
  const [ dataFetched, setDataFetched ] = useState( false );

  useEffect( () => {
    const getPosts = async () => {
      const url = 'http://localhost:4000/admin/allposts';

      try {
        const response = await fetch( url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ jwtToken }`
          }
        });

        const data = await response.json();
        setPostsData( data.posts );
        console.log( data );
      }
      catch( err ) { console.log( 'Error:', err ); }
    };

    const getCategories = async () => {};

    const getComments = async () => {};
    if( !dataFetched ) {
      getPosts();
      setDataFetched( true );
    }
  }, [ postsData, categoriesData, commentsData, dataFetched, jwtToken ]);

  return(
    <div className='AdminContent'>
      <h1>Hello Admin.</h1>
      <h2>Currently, we have:</h2>
      <p>Posts: { postsData.length }</p>
      <p>Categories: { categoriesData.length }</p>
      <p>Comments: { commentsData.length }</p>
    </div>
  );
};

export { AdminContent };