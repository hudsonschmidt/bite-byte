import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./browse.css"

const Browse = () => {
  const [meals, setMeals] = useState([]);
  const host = 'https://biteandbyte-cfd6d9azd2a4brce.westus-01.azurewebsites.net'
  // const host = 'https://localhost:8000'

  const fetchMeals = async () => {
    try {
      const response = await fetch('host/meals');
      if (response.ok) {
        const data = await response.json();
        setMeals(data.recipes_list); 
      } else {
        console.error('Failed to fetch meals:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch meals:', error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      //setFilteredRecipes(recipeData.slice(0, recipeIndex));
    } else {
      //const filtered = recipeData.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
      //setFilteredRecipes(filtered);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleScroll = (e) => {
    const bottom = Math.ceil(e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight;
    if (bottom) fetchMeals();
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
            {meals.map(meal => (
              <div key={meal.id} className="col-md-4 mb-4">
                <div className="card">
                  <img src={meal.image_url} className="card-img-top" alt={meal.name} />
                  <div className="card-body">
                    <h5 className="card-title">{meal.name}</h5>
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
