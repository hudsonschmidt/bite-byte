import React, { useState, useEffect } from 'react';
import Form from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MyRecipes.css"
const MyRecipes = () => {
  const [recipeData, setRecipeData] = useState([
    // Example data
    { id: 1, name: 'Recipe 1', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Recipe 2', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Recipe 3', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Recipe 4', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Recipe 5', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Recipe 6', image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Recipe 7', image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Recipe 8', image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Recipe 9', image: 'https://via.placeholder.com/150' },
    // Add more recipe objects here
  ]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipeIndex, setRecipeIndex] = useState(0);

  useEffect(() => {
    loadRecipes();
    // eslint-disable-next-line
  }, []);

  const loadRecipes = () => {
    const newRecipes = recipeData.slice(recipeIndex, recipeIndex + 6);
    setFilteredRecipes(prev => [...prev, ...newRecipes]);
    setRecipeIndex(prev => prev + 6);
  };

  const addMeal = async (meal) => {
    try {
      const response = await fetch('http://localhost:8000/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzNhOTU1YjQ5MTMyM2ZlNDE1NzRjMmYiLCJpYXQiOjE3MzE4OTI1NzEsImV4cCI6MTczMTk3ODk3MX0.2YJVf-gIpbpqB3VNLvP_qGu-5k4mF7eKnAWeP-FnG3E',
        },
        body: JSON.stringify(meal),
      });

      if (response.ok) {
        const newMeal = await response.json();
        setRecipeData((prevMeals) => [newMeal, ...prevMeals]);
        setFilteredRecipes((prevFiltered) => [...prevFiltered, newMeal]);
      } else {
        console.error('Failed to add meal:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add meal:', error);
    }
  };
  //const deleteMeal = async () => {};

//  const addMeal = async (meal) => {
//    try {
//      const response = await fetch('http://localhost:8000/meals', {
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json',
//          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzNhOTU1YjQ5MTMyM2ZlNDE1NzRjMmYiLCJpYXQiOjE3MzE4OTI1NzEsImV4cCI6MTczMTk3ODk3MX0.2YJVf-gIpbpqB3VNLvP_qGu-5k4mF7eKnAWeP-FnG3E',
//        },
//        body: JSON.stringify(meal),
//      });
//
//      if (response.ok) {
//        const addedMeal = await response.json();
//        setRecipeData((prevMeals) => [addedMeal, ...prevMeals]);
//        setFilteredRecipes((prevFiltered) => [...prevFiltered, addedMeal]);
//      } else {
//        console.error('Failed to add meal:', response.statusText);
//      }
//    } catch (error) {
//      console.error('Failed to add meal:', error);
//    }
//  };

  // const deleteMeal = async () => {};
  const deleteRecipe = (id) => {
    setRecipeData((prevData) => prevData.filter((recipe) => recipe.id !== id));
    setFilteredRecipes((prevFiltered) => prevFiltered.filter((recipe) => recipe.id !== id));
  };

  const handleScroll = (e) => {
    const bottom = Math.ceil(e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight;
    if (bottom) loadRecipes();
  };

  return (
    <div id="mrbody" className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light p-4">
          <h2>Add a Reciepe</h2>
          <Form handleSubmit={addMeal} />
        </div>
        {/* Recipe Cards */}
        <div id="recipe-container" className="col-md-9" style={{ overflowY: 'auto', height: 'calc(100vh - 56px)', padding: '20px' }} onScroll={handleScroll}>
          <div id="recipe-cards" className="row">
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="col-md-4 mb-4">
                <div className="card">
                  <img src={recipe.image} className="card-img-top" alt={recipe.name} />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    {/*} delete button */}
                    <button onClick={() => deleteRecipe(recipe.id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipes;
