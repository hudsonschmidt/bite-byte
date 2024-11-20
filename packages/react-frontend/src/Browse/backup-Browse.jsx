import React, { useState, useEffect } from 'react';
import Form from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./browse.css"

const Browse = () => {
  const [meals, setMeals] = useState([]);

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
        setMeals((prevMeals) => [newMeal, ...prevMeals]);
      } else {
        console.error('Failed to add meal:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add meal:', error);
    }
  };
  const deleteMeal = async () => {};

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
        <div className="col-md-3 bg-light p-4">
          <h2>Add a Reciepe</h2>
          <Form handleSubmit={addMeal} />
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
