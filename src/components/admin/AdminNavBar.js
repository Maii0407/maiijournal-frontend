import React from 'react';

const AdminNavBar = () => {
  const closeNav = () => {
    document.getElementById( 'AdminNavBar' ).style.visibility = 'hidden';
    document.getElementById( 'NavMenu' ).style.width = '0';
  };

  return(
    <div id='AdminNavBar'>
      <div id='NavMenu'>
        <div className='allContent'>
          <p onClick={ closeNav }>&times;</p>
          <p>Home</p>
          <p>All Categories</p>
          <p>All Posts</p>
          <p>All Comments</p>
        </div>
        <div className='createContent'>
          <p>+ New Post</p>
          <p>+ New Category</p>
        </div>
      </div>
    </div>
  );
};

export { AdminNavBar };