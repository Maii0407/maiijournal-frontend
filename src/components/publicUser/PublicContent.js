import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Category } from '../category/Category';
import { CategoryPost } from '../category/CategoryPost';
import { Post } from '../post/Post';
import { PostDetail } from '../post/PostDetail';
import { Admin } from '../admin/Admin';

const PublicContent = ( props ) => {
  const { setJwtToken, setAdmin } = props;

  const [ postsData, setPostsData ] = useState([]);
  const [ categoriesData, setCategoriesData ] = useState([]);
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
  }, [ postsData, categoriesData, fetchStatus ])

  return(
    <div className='PublicContent'>
      <Routes>
        <Route
          path=''
          element={
            <div className='initialContent'>
              <h3>Filter by Categories</h3>
              <div className='categoryList-container'>{
                categoriesData.map( ( category ) => {
                  return <Category key={ category._id } categoryData={ category }/>
                })
              }</div>
              <h3>Posts</h3>
              <div className='postList-container'>{
                postsData.map( ( post ) => {
                  return <Post key={ post._id } postData={ post }/>
                })
              }</div>
            </div>
          }
        />
        <Route path='/admin' element={ <Admin
            setJwtToken={ setJwtToken }
            setAdmin={ setAdmin }
          />
        }/>
        {
          postsData.map( ( post ) => {
            return <Route
              key={ post._id }
              path={ `/${ post._id }` }
              element={ <PostDetail postData={ post }/> }
            />
          })
        }
        {
          categoriesData.map( ( category ) => {
            return <Route
              key={ category._id }
              path={ `/${ category._id }` }
              element={ <CategoryPost
                categoryData={ category }
                postsArray={ postsData }
              /> }
            />
          })
        }
      </Routes>
    </div>
  );
};

export { PublicContent };