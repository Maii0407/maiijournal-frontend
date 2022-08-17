import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateCategory = ( props ) => {
  const { categoryData, jwtToken, setDataFetched } = props;

  const [ nameState, setNameState ] = useState( categoryData.name );

  const navigate = useNavigate();

  const updateCategory = async ( e ) => {
    e.preventDefault();

    const url =  `http://localhost:4000/admin/categories/${ categoryData._id }`;
    const updatedData = { name: nameState };

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
    <form className='Admin-form' onSubmit={ updateCategory }>
      <label htmlFor='categoryName'>Category Name:</label>
      <input
        type='text'
        id='categoryName'
        name='categoryName'
        placeholder='Enter Category Name'
        onChange={ e => setNameState( e.target.value ) }
        value={ nameState }
      />
      <button type='submit'>Update Category</button>
    </form>
  );
};

export { UpdateCategory };