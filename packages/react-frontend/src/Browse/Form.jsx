import React, { useState } from "react";

const Form = ({ handleSubmit }) => {
  const [meal, setMeal] = useState({
    name: "",
    image_url: "",
    ingredients: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeal((prevMeal) => ({
      ...prevMeal,
      [name]: value,
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit({
      ...meal,
      ingredients: meal.ingredients.split(",").map((ingredient) => ingredient.trim()), 
    });
    setMeal({ name: "", image_url: "", ingredients: "" }); 
  };

  return (
    <form onSubmit={submitForm}>
      <div className="mb-3">
        <label htmlFor="mealName" className="form-label">Meal Name</label>
        <input
          type="text"
          id="mealName"
          name="name"
          className="form-control"
          value={meal.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mealImage" className="form-label">Image URL</label>
        <input
          type="text"
          id="mealImage"
          name="image_url"
          className="form-control"
          value={meal.image_url}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mealIngredients" className="form-label">Ingredients</label>
        <input
          type="text"
          id="mealIngredients"
          name="ingredients"
          className="form-control"
          value={meal.ingredients}
          onChange={handleChange}
          placeholder="Comma-separated list"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mealInstructions" className="form-label">Instructions</label>
        <input
          type="text"
          id="mealInstructions"
          name="instructions"
          className="form-control"
          value={meal.instructions}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Meal</button>
    </form>
  );
};

export default Form;
