import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryList = ( props ) => {
  const { categoriesData } = props;

  const navigate = useNavigate();

  return(
    <div className='admin-categoryList'>
      <h2>Category List</h2>
      <div className='list'>
        {
          categoriesData.map( ( category ) => {
            return <div key={ category._id } className='listItem' onClick={ () => {
              navigate( `/allcategories/${ category._id }` )
            } }>
              <p>{ category.name }</p>
            </div>
          })
        }
      </div>
    </div>
  );
};

export { CategoryList };