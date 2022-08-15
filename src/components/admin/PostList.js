import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostList = ( props ) => {
  const { postsData } = props;

  const navigate = useNavigate();

  return (
    <div className='admin-postList'>
      <h2>Post List</h2>
      <div className='list'>
        {
        postsData.map( ( post ) => {
          return <div key={ post._id } className='listItem' onClick={ () => {
            navigate( `/allposts/${ post._id }` )
          } }>
            <p>Title: { post.title }</p>
            <p>Status: { post.postStatus }</p>
          </div>
        })
        }
      </div>
    </div>
  );
};

export { PostList };