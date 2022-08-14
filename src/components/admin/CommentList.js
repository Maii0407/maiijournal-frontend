import React from 'react';

const CommentList = ( props ) => {
  const { commentsData } = props;

  return(
    <div className='admin-commentList'>{
      commentsData.map( ( comment ) => {
        return <div key={ comment._id }>{ comment._id }</div>
      })
    }</div>
  );
};

export { CommentList };