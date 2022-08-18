import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

import { CommentCreate } from '../comment/CommentCreate';
import { CommentList } from '../comment/CommentList';

const PostDetail = ( props ) => {
  const { postData } = props;

  const [ commentsData, setCommentsData ] = useState([]);
  const [ commentsFetched, setCommentsFetched ] = useState( false );

  const navigate = useNavigate();

  useEffect( () => {
    const getCommentsData = async () => {
      const url = `https://maiijournal-restapi.herokuapp.com/journal/posts/${ postData._id }/comments`;

      try{
        const response = await fetch( url, { method: 'GET', mode: 'cors' });
        const data = await response.json();
        setCommentsData( data.comments );
      }
      catch( err ) {
        console.log( 'Error:', err );
      }
    };

    if( !commentsFetched ) {
      getCommentsData();
      setCommentsFetched( true );
    }

  }, [ commentsData, commentsFetched, postData ]);

  return (
    <div className='PostDetail'>
      <div className='post-container'>
        <h3>{ postData.title }</h3>
        <p>{ postData.content }</p>
        <div className='post-info'>
          <div className='postCategory' onClick={ () => {
            navigate( `/${ postData.category._id }` )
          }}>{ postData.category.name }</div>
          <p>{ DateTime.fromISO( postData.date ).toFormat( 'dd LLL yyyy' ) }</p>
        </div>
      </div>
      <div className='commentList-container'>
        <h3>Comments</h3>
        <CommentCreate postData={ postData } setCommentsData={ setCommentsData }/>
        <CommentList commentsData={ commentsData }/>
      </div>
    </div>
  );
};

export { PostDetail };