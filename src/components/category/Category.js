import React from 'react';
import { useNavigate } from 'react-router-dom';

const Category = ( props ) => {
  const { categoryData } = props;

  const navigate = useNavigate();

  return(
    <div type='button' className='Category'
      onClick={ () => { navigate( `/${ categoryData._id }` ) }}
    >
      { categoryData.name }
    </div>
  );
};

export { Category };