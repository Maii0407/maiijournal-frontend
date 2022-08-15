import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommentList = ( props ) => {
  const { commentsData } = props;

  const navigate = useNavigate();

  return(
    <div className='admin-commentList'>
      <h2>Comment List</h2>
      <div className='list'>
        {
        commentsData.map( ( comment ) => {
          return <div key={ comment._id } className='listItem' onClick={ () => {
            navigate( `/allcomments/${ comment._id }` )
          } }>
            <p>{ comment.content }</p>
          </div>
        })
        }
      </div>
    </div>
  );
};

export { CommentList };