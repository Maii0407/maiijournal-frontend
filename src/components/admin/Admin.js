import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = ( props ) => {
  const navigate = useNavigate();
  const { setJwtToken, setAdmin } = props;

  const [ userIDState, setUserIDState ] = useState('');
  const [ passwordState, setPasswordState ] = useState('');

  const login = async (e) => {
    e.preventDefault();

    const url = 'https://maiijournal-restapi.herokuapp.com/admin/superSecretAdminLogin';
    const formData = {
      userID: userIDState,
      password: passwordState
    };

    try {
      const response = await fetch( url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( formData ),
      });
      const data = await response.json();
      setJwtToken( data.token );
      setAdmin( true );
      setUserIDState('');
      setPasswordState('');
      navigate( '/maiijournal-frontend/' );
    }
    catch( err ) {
      console.log( 'Error:', err );
    }
  };

  return (
    <form className='Admin-form' onSubmit={ login }>
      <label htmlFor='userID'>User ID:</label>
      <input type='text' id='userID' name='userID'
        placeholder='Enter User ID' onChange={ e => setUserIDState( e.target.value ) }
        value={ userIDState }
      />
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' name='password'
        placeholder='Enter User Password' onChange={ e => setPasswordState( e.target.value ) }
        value={ passwordState }
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export { Admin };