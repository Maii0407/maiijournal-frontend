import React from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

const Post = ( props ) => {
  const { postData } = props;

  const navigate = useNavigate();

  return (
    <div className='Post' onClick={ () => { navigate( `/maiijournal-frontend/${ postData._id }` ) } }>
      <p>{ postData.title }</p>
      <p>{ DateTime.fromISO( postData.date ).toFormat( 'dd LLL yyyy' ) }</p>
    </div>
  );
};

export { Post };