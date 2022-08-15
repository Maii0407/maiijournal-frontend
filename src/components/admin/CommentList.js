import React from 'react';

const CommentList = ( props ) => {
  const { commentsData } = props;

  return(
    <div className='admin-commentList'>
      <h2>Comment List</h2>
      <div className='list'>
        {
        commentsData.map( ( comment ) => {
          return <div key={ comment._id } className='listItem'>
            { comment.content }
          </div>
        })
        }
      </div>
    </div>
  );
};

export { CommentList };