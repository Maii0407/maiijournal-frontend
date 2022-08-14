import React from 'react';

const CategoryAdmin = ( props ) => {
  const { categoriesData } = props;

  return(
    <div className='CategoryAdmin'>{
      categoriesData.map( ( category ) => {
        return <div key={ category._id }>{ category.name }</div>
      })
    }</div>
  );
};

export { CategoryAdmin };