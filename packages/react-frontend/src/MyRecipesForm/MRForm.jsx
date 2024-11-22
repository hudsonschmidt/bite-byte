import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './mrform.css'; 

function MRForm() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [message, setMessage] = useState('');
  
  const host = 'https://biteandbyte-cfd6d9azd2a4brce.westus-01.azurewebsites.net'
  // const host = 'https://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ingredientList = ingredients.split(',').map((ingredient) => ingredient.trim());

    try {
      const response = await axios.post('host/meals', {
        name,
        image_url: imageUrl,
        ingredients: ingredientList,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in local storage
        }
      });

      setMessage('Recipe added successfully!');
    } catch (error) {
      console.error('Failed to add recipe', error);
      setMessage('Failed to add recipe. Please try again. Make sure you are logged in.');
    }
  };

  return (
    <div className="container-fluid" id='formbody'>
      <div className="row">
        <div id='formimg' className="col-md-8 d-none d-md-block"></div>
        <div className="col-md-4 d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className="mr-form-container w-100 p-4">
            <h2 className="form-title text-center">Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Recipe Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image-url">Image URL:</label>
                <input
                  type="text"
                  id="image-url"
                  className="form-control"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ingredients">Ingredients (separate with commas):</label>
                <input
                  type="text"
                  id="ingredients"
                  className="form-control"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Add Recipe</button>
            </form>
            {message && <p className="mt-3 text-center">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MRForm;
