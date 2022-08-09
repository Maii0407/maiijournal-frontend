import React, { useState } from 'react';

const CommentCreate = ( props ) => {
  const { postData, setCommentsData } = props;

  const [ usernameState, setUsernameState ] = useState('');
  const [ commentState, setCommentState ] = useState('');

  const getCommentsData = async () => {
    const url = `http://localhost:4000/journal/posts/${ postData._id }/comments`;

    try{
      const response = await fetch( url, { method: 'GET', mode: 'cors' });
      const data = await response.json();
      setCommentsData( data.comments );
      console.log( data );
    }
    catch( err ) {
      console.log( 'Error:', err );
    }
  };

  const createComment = async (e) => {
    e.preventDefault();

    const url = `http://localhost:4000/journal/comment/${ postData._id }`;
    const commentData = {
      username: usernameState,
      content: commentState
    };

    try {
      const response = await fetch( url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( commentData ),
      });
      const data = await response.json();
      console.log( 'Succes:', data );
      getCommentsData();
      setUsernameState('');
      setCommentState('');
    }
    catch( err ) {
      console.log( 'Error:', err );
    }
  };

  return (
    <form className='Comment-form' onSubmit={ createComment }>
      <label htmlFor='username'>Comment as:</label>
      <input type='text' id='username' name='username'
        placeholder='Enter a Username' onChange={ e => setUsernameState( e.target.value ) }
        value={ usernameState }
      />
      <textarea placeholder='What are your thoughts?'
        onChange={ e => setCommentState( e.target.value ) } value={ commentState }
      />
      <button type='submit'>Submit Comment</button>
    </form>
  );
};

export { CommentCreate }