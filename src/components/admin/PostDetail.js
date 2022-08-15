import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

const PostDetail = ( props ) => {
  const { postData, commentsData } = props;

  const [ commentsFiltered, setCommentsFiltered ] = useState([]);
  const [ filterStatus, setFilterStatus ] = useState( false );

  const navigate = useNavigate();

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
        </div>
        <h2>Comments:</h2>
        <p>There Are No Comments In This Post...</p>
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
      </div>
      <h2>Comments:</h2>
      <div className='list'>{
        commentsFiltered.map( ( comment ) => {
          return <div key={ comment._id } className='listItem' onClick={ () => {
            navigate( `/allcomments/${ comment._id }` );
          }}>
            <p>{ comment.content }</p>
          </div>
        })
      }</div>
    </div>
  );
};

export { PostDetail };