import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./browse.css"

const Browse = () => {
  const [meals, setMeals] = useState([]);
  // const [filteredRecipes, setFilteredRecipes] = useState([]);
  // const [recipeIndex, setRecipeIndex] = useState(0);

  const fetchMeals = async () => {
    try {
      const response = await fetch('http://localhost:8000/meals');
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

  const addMeal = async () => {}
  const deleteMeal = async () => {}

  useEffect(() => {
    // loadRecipes();
    fetchMeals();
    // eslint-disable-next-line
  }, []);

  // const loadRecipes = () => {
  //   const newRecipes = recipeData.slice(recipeIndex, recipeIndex + 6);
  //   setFilteredRecipes(prev => [...prev, ...newRecipes]);
  //   setRecipeIndex(prev => prev + 6);
  // };

  // const handleSearch = (e) => {
  //   const searchTerm = e.target.value.toLowerCase();
  //   if (searchTerm === '') {
  //     setFilteredRecipes(recipeData.slice(0, recipeIndex));
  //   } else {
  //     const filtered = recipeData.filter(meal => meal.name.toLowerCase().includes(searchTerm));
  //     setFilteredRecipes(filtered);
  //   }
  // };

  const handleScroll = (e) => {
    const bottom = Math.ceil(e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight;
    if (bottom) fetchMeals();
  };

  return (
    <div id="browsebody" className="container-fluid">
      <div className="row">
        { forms.jsx }
        {/* Sidebar */}
        {/* <div id="search-bar" className="col-md-3 bg-light p-4">
          <h2 id="sidebar">Browse</h2>
          <input type="text" id="recipeSearch sidebar" className="form-control" placeholder="Search" onChange={handleSearch} />
        </div> */}

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
