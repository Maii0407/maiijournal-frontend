import React from 'react';
import { DateTime } from 'luxon';

const Comment = ( props ) => {
  const { commentData } = props;

  return (
    <div className='Comment'>
      <div className='comment-info'>
        <p>BY: { commentData.username }</p>
        <p>{ DateTime.fromISO( commentData.date ).toFormat( 'dd LLL yyyy' ) }</p>
      </div>
      <div className='comment-content'>
        <p>{ commentData.content }</p>
      </div> 
    </div>
  );
};

export { Comment };