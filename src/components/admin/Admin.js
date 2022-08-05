import React from 'react';

const Admin = () => {
  return (
    <form className='Admin-form'>
      <label htmlFor='userID'>User ID:</label>
      <input type='text' id='userID' name='userID' placeholder='Enter User ID'/>
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' name='password' placeholder='Enter User Password'/>
      <button type='submit'>Submit</button>
    </form>
  );
};

export { Admin };