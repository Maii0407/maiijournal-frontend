import React from 'react';

const Category = ( props ) => {
  const { categoryData } = props;

  return(
    <div className='Category'>
      { categoryData.name }
    </div>
  );
};

export { Category };