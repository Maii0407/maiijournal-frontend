import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Category } from '../category/Category';
import { CategoryPost } from '../category/CategoryPost';
import { Post } from '../post/Post';
import { PostDetail } from '../post/PostDetail';
import { Admin } from '../admin/Admin';

const PublicContent = ( props ) => {
  const { categoryList, postList, setJwtToken } = props;

  return(
    <div className='PublicContent'>
      <Routes>
        <Route
          path=''
          element={
            <div className='initialContent'>
              <h3>Filter by Categories</h3>
              <div className='categoryList-container'>{
                categoryList.map( ( category ) => {
                  return <Category key={ category._id } categoryData={ category }/>
                })
              }</div>
              <h3>Posts</h3>
              <div className='postList-container'>{
                postList.map( ( post ) => {
                  return <Post key={ post._id } postData={ post }/>
                })
              }</div>
            </div>
          }
        />
        <Route path='/admin' element={ <Admin setJwtToken={ setJwtToken }/> }/>
        {
          postList.map( ( post ) => {
            return <Route
              key={ post._id }
              path={ `/${ post._id }` }
              element={ <PostDetail postData={ post }/> }
            />
          })
        }
        {
          categoryList.map( ( category ) => {
            return <Route
              key={ category._id }
              path={ `/${ category._id }` }
              element={ <CategoryPost
                categoryData={ category }
                postsArray={ postList }
              /> }
            />
          })
        }
      </Routes>
    </div>
  );
};

export { PublicContent };