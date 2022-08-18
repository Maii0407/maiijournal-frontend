import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

const PostDetail = ( props ) => {
  const { postData, commentsData, jwtToken, setDataFetched } = props;

  const [ commentsFiltered, setCommentsFiltered ] = useState([]);
  const [ filterStatus, setFilterStatus ] = useState( false );

  const navigate = useNavigate();

  const openDeleteMenu = () => {
    document.getElementById( 'deletePost' ).style.visibility = 'visible';
  };

  const closeDeleteMenu = () => {
    document.getElementById( 'deletePost' ).style.visibility = 'hidden';
  };

  const deletePost = async () => {
    const url = `https://maiijournal-restapi.herokuapp.com/admin/posts/${ postData._id }`;

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
      navigate( '/maiijournal-frontend/' );
    }
    catch( err ) { console.log( 'Error:', err ); }
  };

  useEffect( () => {
    if( !filterStatus ) {
      const filteredArray = commentsData.filter( comment => comment.post === postData._id);
      setCommentsFiltered( filteredArray );
      setFilterStatus( true );
    }
  }, [ commentsFiltered, filterStatus, commentsData, postData ]);

  if( commentsFiltered.length === 0 ) {
    return(
      <div className='adminItemDetail'>
        <div className='details'>
          <h3>Title: { postData.title }</h3>
          <p className='content'>{ postData.content }</p>
          <p>Post Status: { postData.postStatus }</p>
          <p>Category: { postData.category.name }</p>
          <p>Created: { DateTime.fromISO( postData.date ).toFormat( 'dd LLL yyyy' ) }</p>
          <div className='btn-container'>
            <button type='button' onClick={ openDeleteMenu }>Delete</button>
            <button type='button' onClick={ () => {
              navigate( `/maiijournal-frontend/allposts/${ postData._id }/update` )
            }}>Update</button>
          </div>
        </div>
        <h2>Comments:</h2>
        <p>There Are No Comments In This Post...</p>
        <div id='deletePost'>
          <div className='delete'>
            <h3>Delete This Post?</h3>
            <p>Are you sure?</p>
            <div className='btn-container'>
              <button type='button' onClick={ deletePost }>Yes</button>
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
        <h3>Title: { postData.title }</h3>
        <p className='content'>{ postData.content }</p>
        <p>Post ID: { postData._id }</p>
        <p>Post Status: { postData.postStatus }</p>
        <p>Category: { postData.category.name }</p>
        <p>Created: { DateTime.fromISO( postData.date ).toFormat( 'dd LLL yyyy' ) }</p>
        <div className='btn-container'>
            <button type='button' onClick={ openDeleteMenu }>Delete</button>
            <button type='button' onClick={ () => {
              navigate( `/maiijournal-frontend/allposts/${ postData._id }/update` )
            }}>Update</button>
        </div>
      </div>
      <h2>Comments:</h2>
      <div className='list'>{
        commentsFiltered.map( ( comment ) => {
          return <div key={ comment._id } className='listItem' onClick={ () => {
            navigate( `/maiijournal-frontend/allcomments/${ comment._id }` );
          }}>
            <p>{ comment.content }</p>
          </div>
        })
      }</div>
      <div id='deletePost'>
        <div className='delete'>
          <h3>Delete This Post?</h3>
          <p>Are you sure?</p>
          <div className='btn-container'>
            <button type='button' onClick={ deletePost }>Yes</button>
            <button type='button' onClick={ closeDeleteMenu }>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostDetail };