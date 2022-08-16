import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { CategoryList } from './CategoryList';
import { PostList } from './PostList';
import { CommentList } from './CommentList';
import { CategoryDetail } from './CategoryDetail';
import { PostDetail } from './PostDetail';
import { CommentDetail } from './CommentDetail';
import { CreateCategory } from './CreateCategory';
import { CreatePost } from './CreatePost';

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

    const getCategories = async () => {
      const url = 'http://localhost:4000/journal/categories';

      try {
        const response = await fetch( url, {
          method: 'GET',
          mode: 'cors',
        });

        const data = await response.json();
        setCategoriesData( data.categories );
        console.log( data );
      }
      catch( err ) { console.log( 'Error:', err ); }
    };

    const getComments = async () => {
      const url = 'http://localhost:4000/admin/allcomments';

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
        setCommentsData( data.comments );
        console.log( data );
      }
      catch( err ) { console.log( 'Error:', err ); }
    };

    if( !dataFetched ) {
      getPosts();
      getCategories();
      getComments();
      setDataFetched( true );
    }
  }, [ postsData, categoriesData, commentsData, dataFetched, jwtToken ]);

  return(
    <div className='AdminContent'>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <h1>Hello Admin.</h1>
              <h2>Currently, we have:</h2>
              <p>Posts: { postsData.length }</p>
              <p>Categories: { categoriesData.length }</p>
              <p>Comments: { commentsData.length }</p>
            </div>
          }
        />
        <Route path='/allcategories' element={ <CategoryList categoriesData={ categoriesData }/> }/>
        <Route path='/allposts' element={ <PostList postsData={ postsData }/> }/>
        <Route path='/allcomments' element={ <CommentList commentsData={ commentsData }/> }/>
        { categoriesData.map( ( category ) => {
          return <Route
            key={ category._id }
            path={ `/allcategories/${ category._id }` }
            element={ <CategoryDetail categoryData={ category } postsData={ postsData }/> }
          />
        })}
        { postsData.map( ( post ) => {
          return <Route
            key={ post._id }
            path={ `/allposts/${ post._id }` }
            element={ <PostDetail postData={ post } commentsData={ commentsData }/> }
          />
        })}
        { commentsData.map( ( comment ) => {
          return <Route
            key={ comment._id }
            path={ `/allcomments/${ comment._id }` }
            element={ <CommentDetail commentData={ comment } jwtToken={ jwtToken } setCommentsData={ setCommentsData } /> }
          />
        })}
        <Route
          path={ '/createcategory' }
          element={ <CreateCategory jwtToken={ jwtToken } setCategoriesData={ setCategoriesData }/> }
        />
        <Route
          path={ '/createpost' }
          element={ <CreatePost jwtToken={ jwtToken } setPostsData={ setPostsData } categoriesData={ categoriesData }/> }
        />
      </Routes>
    </div>
  );
};

export { AdminContent };