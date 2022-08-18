import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatePost = ( props ) => {
  const { postData, jwtToken, setDataFetched, categoriesData } = props;

  const [ titleState, setTitleState ] = useState( postData.title );
  const [ contentState, setContentState ] = useState( postData.content );
  const [ postStatusState, setPostStatusState ] = useState( postData.postStatus );
  const [ categoryState, setCategoryState ] = useState( postData.category );

  const navigate = useNavigate();

  const updatePost = async (e) => {
    e.preventDefault();

    const url = `https://maiijournal-restapi.herokuapp.com/admin/posts/${ postData._id }`;
    const updatedData = {
      title: titleState,
      content: contentState,
      postStatus: postStatusState,
      category: categoryState
    };

    try {
      const response = await fetch( url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ jwtToken }`
        },
        body: JSON.stringify( updatedData ),
      });
      const data = await response.json();
      console.log( 'Success:', data );
      setDataFetched( false );
      navigate( '/' );
    }
    catch( err ) { console.log( 'Error:', err ) }
  };

  return(
    <form className='Admin-form' onSubmit={ updatePost }>
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
      <button type='submit'>Update Post</button>
    </form>
  );
};

export { UpdatePost };