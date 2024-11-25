import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./browse.css";

const Browse = () => {
    const [meals, setMeals] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 20;
    const host = 'http://localhost:8000';
    //const host = 'https://biteandbyte-cfd6d9azd2a4brce.westus-01.azurewebsites.net'

    const fetchMeals = async () => {
        try {
            const response = await fetch(`${host}/meals?limit=${limit}&offset=${offset}`);
            if (response.ok) {
                const data = await response.json();
                setMeals((prevMeals) => [...prevMeals, ...data.recipes_list]);
                setOffset((prevOffset) => prevOffset + limit);
            } else {
                console.error('Failed to fetch meals:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch meals:', error);
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
                <div id="recipe-container"  className="col-md-9" style={{ overflowY: 'auto', height: 'calc(100vh - 56px)', padding: '20px' }} onScroll={handleScroll}>
                    <div id="recipe-cards" className="row">
                        {meals.map(meal => 
                        (
                          <div key={meal.id} className="col-md-4 mb-4">
                              <div className="card">
                                  <img 
                                      src={meal.image_url || "/images/image.png"} 
                                      className="card-img-top" 
                                      alt={meal.name || "Recipe"} 
                                  />
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
