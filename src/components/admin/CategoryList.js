import React from 'react';

const CategoryList = ( props ) => {
  const { categoriesData } = props;

  return(
    <div className='admin-categoryList'>
      <h2>Category List</h2>
      <div className='list'>
        {
          categoriesData.map( ( category ) => {
            return <div key={ category._id } className='listItem'>
              { category.name }
            </div>
          })
        }
      </div>
    </div>
  );
};

export { CategoryList };