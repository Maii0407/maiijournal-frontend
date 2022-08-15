import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = ( props ) => {
  const { jwtToken, setPostsData, categoriesData } = props;

  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ postStatus, setPostStatus ] = useState('');
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
    e.prevetDefault();

    const url = 'http://localhost:4000/admin/post';
    const postData = {
      title: title,
      content: content,
      postStatus: postStatus,
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
      setTitle('');
      setContent('');
      setPostStatus('');
      setCategoryState('');
      navigate( '/' );
    }
    catch( err ) { console.log( 'Error:', err ) }
  }

  return(
    <form className='Admin-form' onSubmit={ createPost }>
      <label htmlFor='title'>Post Title:</label>
      <input type='text' id='title' name='title'
        placeholder='Enter Post Title' value={ title }
        onChange={ e => setTitle( e.target.value ) }
      />
      <textarea placeholder='What are your thoughts?'
        onChange={ e => setContent( e.target.value ) }
        value={ content }
      />
      <label htmlFor='postStatus'>Post Status:</label>
      <select
        name='postStatus'
        id='postStatus'
        value={ postStatus }
        onChange={ e => { setPostStatus( e.target.value ) } }
      >
        <option value='published'>Published</option>
        <option value='unpublished'>Unpublished</option>
      </select>
      <label htmlFor='postCategory'>Post Category:</label>
      <select
        name='postCategory'
        id='postCategory'
        value={ categoryState }
        onChange={ e => { setCategoryState( e.target.value ) } }
      >{
        categoriesData.map( ( category ) => {
          return <option key={ category._id } value={ category._id }>{ category.name }</option>
        })
      }</select>
      <button type='submit'>Create Post</button>
    </form>
  );
};

export { CreatePost }