import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './recipe.css'; 

function Recipe() {
  return (
    <div className="container-fluid" id='recipebody'>
      <div className="row">
        <div id='recipe-img' className="col-md-7 d-none d-md-block"></div>
        <div className="col-md-5 d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className="mr-form-container w-100 p-4">
            <h2 className="recipe-title text-center">Recipe Name</h2>
            <p className='recipe-ingredients'>Ingredients</p>
            <p className='recipe-instructions'>Instructions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
