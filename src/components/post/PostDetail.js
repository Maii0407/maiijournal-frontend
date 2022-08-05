import React from 'react';
import { DateTime } from 'luxon';

const PostDetail = ( props ) => {
  const { postData } = props;

  return (
    <div className='PostDetail'>
      <div className='post-container'>
        <h3>{ postData.title }</h3>
        <p>{ postData.content }</p>
        <div className='post-info'>
          <p>Author : { postData.user.userID }</p>
          <p>{ DateTime.fromISO( postData.date ).toFormat( 'dd LLL yyyy' ) }</p>
        </div>
      </div>
      <div className='commentList-container'>
        <h3>Comments</h3>
      </div>
    </div>
  );
};

export { PostDetail };