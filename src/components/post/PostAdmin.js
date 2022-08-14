import React from 'react';

const PostAdmin = ( props ) => {
  const { postsData } = props;

  return (
    <div className='PostAdmin'>{
      postsData.map( ( post ) => {
        return <div key={ post._id }>{ post.title }</div>
      })
    }</div>
  );
};

export { PostAdmin };