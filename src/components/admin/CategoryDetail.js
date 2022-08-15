import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryDetail = ( props ) => {
  const { categoryData, postsData } = props;

  const [ postsFiltered, setPostsFiltered ] = useState([]);
  const [ filterStatus, setFilterStatus ] = useState( false );

  const navigate = useNavigate();

  useEffect( () => {
    if( !filterStatus ) {
      const filteredArray = postsData.filter( post => post.category._id === categoryData._id );
      setPostsFiltered( filteredArray );
      setFilterStatus( true );
    }
  }, [ postsFiltered, filterStatus, postsData, categoryData ]);

  if( postsFiltered.length === 0 ) {
    return(
      <div className='adminItemDetail'>
        <div className='details'>
          <h3>Category Name: { categoryData.name }</h3>
          <p>Category ID: { categoryData._id }</p>
        </div>
        <h2>Posts:</h2>
        <p>There Are No Posts In This Category...</p>
      </div>
    );
  }

  return(
    <div className='adminItemDetail'>
      <div className='details'>
        <h3>Category Name: { categoryData.name }</h3>
        <p>Category ID: { categoryData._id }</p>
      </div>
      <h2>Posts:</h2>
      <div className='list'>{
        postsFiltered.map( ( post ) => {
          return <div key={ post._id } className='listItem' onClick={ () => {
            navigate( `/allposts/${ post._id }` );
          }}>
            <p>{ post.title }</p>
          </div>
        })
      }</div>
    </div>
  );
};

export { CategoryDetail };