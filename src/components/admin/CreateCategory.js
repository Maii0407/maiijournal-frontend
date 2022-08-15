import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCategory = ( props ) => {
  const { jwtToken, setCategoriesData } = props;

  const [ categoryName, setCategoryName ] = useState('');

  const navigate = useNavigate();

  const getCategories = async () => {
    const url = 'http://localhost:4000/journal/categories';

    try {
      const response = await fetch( url, {
        method: 'GET',
        mode: 'cors',
      });

      const data = await response.json();
      setCategoriesData( data.categories );
      console.log( data );
    }
    catch( err ) { console.log( 'Error:', err ); }
  };

  const createCategory = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:4000/admin/category';
    const categoryData = { name: categoryName };

    try {
      const response = await fetch( url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ jwtToken }`
        },
        body: JSON.stringify( categoryData ),
      });
      const data = await response.json();
      console.log( 'Success:', data );
      getCategories();
      setCategoryName('');
      navigate( '/allcategories' );
    }
    catch( err ) { console.log( 'Error:', err ); }
  };

  return(
    <form className='Admin-form' onSubmit={ createCategory }>
      <label htmlFor='categoryName'>Category Name:</label>
      <input type='text' id='categoryName' name='categoryName'
        placeholder='Enter Category Name' onChange={ e => setCategoryName( e.target.value ) }
        value={ categoryName }
      />
      <button type='submit'>Create Category</button>
    </form>
  );
};

export { CreateCategory };