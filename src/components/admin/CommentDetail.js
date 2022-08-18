import React from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

const CommentDetail = ( props ) => {
  const { commentData, jwtToken, setDataFetched } = props;

  const navigate = useNavigate();

  const openDeleteMenu = () => {
    document.getElementById( 'deleteComment' ).style.visibility = 'visible';
  };

  const closeDeleteMenu = () => {
    document.getElementById( 'deleteComment' ).style.visibility = 'hidden';
  };

  const deleteComment = async () => {
    const url = `https://maiijournal-restapi.herokuapp.com/admin/comments/${ commentData._id }`;

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