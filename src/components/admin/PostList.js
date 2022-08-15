import React from 'react';

const PostList = ( props ) => {
  const { postsData } = props;

  return (
    <div className='admin-postList'>
      <h2>Post List</h2>
      <div className='list'>
        {
        postsData.map( ( post ) => {
          return <div key={ post._id } className='listItem'>
            { post.title }
          </div>
        })
        }
      </div>
    </div>
  );
};

export { PostList };