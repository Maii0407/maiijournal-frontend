import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = ( props ) => {
  const { jwtToken, setPostsData, categoriesData } = props;

  const [ titleState, setTitleState ] = useState('');
  const [ contentState, setContentState ] = useState('');
  const [ postStatusState, setPostStatusState ] = useState('');
  const [ categoryState, setCategoryState ] = useState('');

  const navigate = useNavigate();

  const getPosts = async () => {
    const url = 'http://localhost:4000/admin/allposts';

    try {
      const response = await fetch( url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ jwtToken }`
        }
      });

      const data = await response.json();
      setPostsData( data.posts );
      console.log( data );
    }
    catch( err ) { console.log( 'Error:', err ); }
  };

  const createPost = async ( e ) => {
    e.preventDefault();

    const url = 'http://localhost:4000/admin/post';
    const postData = {
      title: titleState,
      content: contentState,
      postStatus: postStatusState,
      category: categoryState
    };

    try {
      const response = await fetch( url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ jwtToken }`
        },
        body: JSON.stringify( postData ),
      });
      const data = await response.json();
      console.log( 'Success:', data );
      getPosts();
      setTitleState('');
      setContentState('');
      setPostStatusState('');
      setCategoryState('');
      navigate( '/allposts' );
    }
    catch( err ) { console.log( 'Error:', err ) }
  }

  return(
    <form className='Admin-form' onSubmit={ createPost }>
      <label htmlFor='title'>Post Title:</label>
      <input type='text' id='title' name='title'
        placeholder='Enter Post Title' value={ titleState }
        onChange={ e => setTitleState( e.target.value ) }
      />
      <textarea placeholder='What are your thoughts?'
        onChange={ e => setContentState( e.target.value ) }
        value={ contentState }
      />
      <label htmlFor='postStatus'>Post Status:</label>
      <select
        name='postStatus'
        id='postStatus'
        value={ postStatusState }
        onChange={ e => { setPostStatusState( e.target.value ) } }
        defaultValue={''}
      >
        <option value={''} disabled>Choose Post Status</option>
        <option value='published'>Published</option>
        <option value='unpublished'>Unpublished</option>
      </select>
      <label htmlFor='postCategory'>Post Category:</label>
      <select
        name='postCategory'
        id='postCategory'
        value={ categoryState }
        onChange={ e => { setCategoryState( e.target.value ) } }
        defaultValue={''}
      >
        <option value={''} disabled>Choose Post Category</option>
        { categoriesData.map( ( category ) => {
          return <option key={ category._id } value={ category._id }>{ category.name }</option>
        })}
      </select>
      <button type='submit'>Create Post</button>
    </form>
  );
};

export { CreatePost }