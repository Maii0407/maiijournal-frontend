import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryDetail = ( props ) => {
  const { categoryData, postsData, jwtToken, setDataFetched } = props;

  const [ postsFiltered, setPostsFiltered ] = useState([]);
  const [ filterStatus, setFilterStatus ] = useState( false );

  const navigate = useNavigate();

  const openDeleteMenu = () => {
    document.getElementById( 'deleteCategory' ).style.visibility = 'visible';
  };

  const closeDeleteMenu = () => {
    document.getElementById( 'deleteCategory' ).style.visibility = 'hidden';
  };

  const deleteCategory = async () => {
    const url = `http://localhost:4000/admin/categories/${ categoryData._id }`;

    try {
      const response = await fetch( url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ jwtToken }`
        }
      });
      const data = await response.json();
      console.log( data );
      setDataFetched( false );
      navigate( '/' );
    }
    catch( err ) { console.log( 'Error:', err ); }
  };

  useEffect( () => {
    if( !filterStatus ) {
      const filteredArray = postsData.filter( post => post.category._id === categoryData._id );
      setPostsFiltered( filteredArray );
      setFilterStatus( true );
    }
  }, [ postsFiltered, filterStatus, postsData, categoryData ]);

  if( postsFiltered.length === 0 ) {
    return(
      <div className='adminItemDetail'>
        <div className='details'>
          <h3>Category Name: { categoryData.name }</h3>
          <p>Category ID: { categoryData._id }</p>
          <div className='btn-container'>
            <button type='button' onClick={ openDeleteMenu }>Delete</button>
          </div>
        </div>
        <h2>Posts:</h2>
        <p>There Are No Posts In This Category...</p>
        <div id='deleteCategory'>
        < div className='delete'>
            <h3>Delete This Category?</h3>
            <p>Are you sure?</p>
            <div className='btn-container'>
              <button type='button' onClick={ deleteCategory }>Yes</button>
              <button type='button' onClick={ closeDeleteMenu }>No</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div className='adminItemDetail'>
      <div className='details'>
        <h3>Category Name: { categoryData.name }</h3>
        <p>Category ID: { categoryData._id }</p>
        <div className='btn-container'>
          <button type='button' onClick={ openDeleteMenu }>Delete</button>
        </div>
      </div>
      <h2>Posts:</h2>
      <div className='list'>{
        postsFiltered.map( ( post ) => {
          return <div key={ post._id } className='listItem' onClick={ () => {
            navigate( `/allposts/${ post._id }` );
          }}>
            <p>{ post.title }</p>
          </div>
        })
      }</div>
      <div id='deleteCategory'>
        <div className='delete'>
          <h3>Delete This Category?</h3>
          <p>Are you sure?</p>
          <div className='btn-container'>
            <button type='button' onClick={ deleteCategory }>Yes</button>
            <button type='button' onClick={ closeDeleteMenu }>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CategoryDetail };