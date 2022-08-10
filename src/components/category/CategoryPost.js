import React, { useState, useEffect } from 'react';

import { Post } from '../post/Post';

const CategoryPost = ( props ) => {
  const { categoryData, postsArray } = props;

  const [ categoryPostList, setCategoryPostList ] = useState([]);
  const [ postFiltered, setPostFiltered ] = useState( false );

  useEffect( () => {
    if( !postFiltered ) {
      const filteredArray = postsArray.filter( post => post.category._id === categoryData._id );
      setCategoryPostList( filteredArray );
      setPostFiltered( true );
    }
    return;
  }, [ categoryPostList, postFiltered, categoryData, postsArray ]);

  if( categoryPostList.length === 0 ) {
    return(
      <div className='CategoryPost'>
        <p id='emptyCategory'>There Are No Posts In This Category...</p>
      </div>
    );
  }

  return(
    <div className='CategoryPost'>
      <div className='postList-container'>
        {
          categoryPostList.map( ( post ) => {
            return <Post key={ post._id } postData={ post }/>
          })
        }
      </div>
    </div>
  );
};

export { CategoryPost };