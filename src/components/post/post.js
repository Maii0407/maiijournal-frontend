import React from 'react';

import { DateTime } from 'luxon';

const Post = ( props ) => {
  const { postData } = props;

  return (
    <div className='Post'>
      <p>{ postData.title }</p>
      <p>{ DateTime.fromISO( postData.date ).toFormat( 'dd LLL yyyy' ) }</p>
      <p>{ postData.user.userID }</p>
    </div>
  );
};

export { Post };