import React from 'react';

import { Comment } from './Comment';

const CommentList = ( props ) => {
  const { commentsData } = props;

  if( commentsData.length === 0 ) {
    return (
      <div className='CommentList'>
        There are no comments...
      </div>
    );
  }

  return (
    <div className='CommentList'>
      {
        commentsData.map( ( comment ) => {
          return <Comment key={ comment._id } commentData={ comment }/>
        })
      }
    </div>
  );
};

export { CommentList };