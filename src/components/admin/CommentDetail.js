import React from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

const CommentDetail = ( props ) => {
  const { commentData, jwtToken, setCommentsData } = props;

  const navigate = useNavigate();

  const openDeleteMenu = () => {
    document.getElementById( 'deleteComment' ).style.visibility = 'visible';
  };

  const closeDeleteMenu = () => {
    document.getElementById( 'deleteComment' ).style.visibility = 'hidden';
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

  const deleteComment = async () => {
    const url = `http://localhost:4000/admin/comments/${ commentData._id }`;

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
      getComments();
      navigate( '/allcomments' );
    }
    catch( err ) { console.log( 'Error:', err ); }
  };

  return(
    <div className='adminItemDetail'>
      <div className='details'>
        <h3>Commented By: { commentData.username }</h3>
        <p className='content'>{ commentData.content }</p>
        <p>Comment ID: { commentData._id }</p>
        <p>Created: { DateTime.fromISO( commentData.date ).toFormat( 'dd LLL yyyy' ) }</p>
        <div className='btn-container'>
          <button type='button' onClick={ openDeleteMenu }>Delete Comment</button>
        </div>
      </div>
      <div id='deleteComment'>
        <div className='delete'>
          <h3>Delete This Comment?</h3>
          <p>Are you sure?</p>
          <div className='btn-container'>
            <button type='button' onClick={ deleteComment }>Yes</button>
            <button type='button' onClick={ closeDeleteMenu }>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CommentDetail };