import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavBar = () => {
  const navigate = useNavigate();

  const closeNav = () => {
    document.getElementById( 'AdminNavBar' ).style.visibility = 'hidden';
    document.getElementById( 'NavMenu' ).style.width = '0';
  };

  return(
    <div id='AdminNavBar'>
      <div id='NavMenu'>
        <div className='allContent'>
          <p className='closeNavBtn' onClick={ closeNav }>&times;</p>
          <p onClick={ () => {
            navigate( '/maiijournal-frontend/' );
            closeNav();
          }}>Home</p>
          <p onClick={ () => {
            navigate( '/maiijournal-frontend/allcategories' );
            closeNav();
          }}>All Categories</p>
          <p onClick={ () => {
            navigate( '/maiijournal-frontend/allposts');
            closeNav();
          }}>All Posts</p>
          <p onClick={ () => {
            navigate( '/maiijournal-frontend/allcomments' );
            closeNav();
          }}>All Comments</p>
        </div>
        <div className='createContent'>
          <p onClick={ () => {
            navigate( '/maiijournal-frontend/createpost' );
            closeNav();
          }}>+ New Post</p>
          <p onClick={ () => {
            navigate( '/maiijournal-frontend/createcategory' );
            closeNav();
          }}>+ New Category</p>
        </div>
      </div>
    </div>
  );
};

export { AdminNavBar };