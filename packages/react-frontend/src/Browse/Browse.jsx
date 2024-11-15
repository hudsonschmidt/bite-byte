import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./browse.css"

const Browse = () => {
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

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      setFilteredRecipes(recipeData.slice(0, recipeIndex));
    } else {
      const filtered = recipeData.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
      setFilteredRecipes(filtered);
    }
  };

  const handleScroll = (e) => {
    const bottom = Math.ceil(e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight;
    if (bottom) loadRecipes();
  };

  return (
    <div id="browsebody" className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div id="search-bar" className="col-md-3 bg-light p-4">
          <h2 id="sidebar">Browse</h2>
          <input type="text" id="recipeSearch sidebar" className="form-control" placeholder="Search" onChange={handleSearch} />
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

export default Browse;
