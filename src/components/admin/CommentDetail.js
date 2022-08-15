import React from 'react';
import { DateTime } from 'luxon';

const CommentDetail = ( props ) => {
  const { commentData } = props;

  return(
    <div className='adminItemDetail'>
      <div className='details'>
        <h3>Commented By: { commentData.username }</h3>
        <p className='content'>{ commentData.content }</p>
        <p>Comment ID: { commentData._id }</p>
        <p>Created: { DateTime.fromISO( commentData.date ).toFormat( 'dd LLL yyyy' ) }</p>
      </div>
    </div>
  );
};

export { CommentDetail };