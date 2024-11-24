// backend.js
import express from "express";
import dotenv from "dotenv";
import fetch from 'node-fetch';
import mongoose from "mongoose";
import cors from "cors";
import recipeService from "./services/recipe_service.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

const app = express();
const port = 8000;

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose.connect(MONGO_CONNECTION_STRING).catch((error) => console.log(error));


app.use(cors());
app.use(express.json());


function mapRecipeToSchema(recipe) {
  return {
    id: recipe.id,
    name: recipe.title,
    image_url: recipe.image,
    // summary: recipe.summary,
    ingredients: recipe.extendedIngredients ? recipe.extendedIngredients.map(ing => ing.name):[],
    // instructions: recipe.instructions || "No instructions available"
  };
}


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get('/meals', (req, res) => {
  const name = req.query.name || '';
  const limit = parseInt(req.query.limit, 10) || 20; 
  const offset = parseInt(req.query.offset, 10) || 0; 

  recipeService.getRecipes(name, limit, offset)
    .then(recipes => res.status(200).json({ recipes_list: recipes }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch meals' });
    });
});


app.post("/meals", authenticateUser, (req, res) => {
  const { name, image_url, ingredients } = req.body;

  const newMeal = { name, image_url, ingredients, user: req.user._id };

  recipeService.addRecipe(newMeal)
    .then(addedRecipe => res.status(201).json(addedRecipe))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to add meal' });
    });
});

app.get("/posts", authenticateUser, (req, res) => {
  recipeService.getUserRecipes(req.user._id) 
    .then(userMeals => res.status(200).json({ user_meals: userMeals }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch user's meals" });
    });
});

app.get('/meals/:id', (req, res) => {
  const mealId = req.params.id;

  recipeService.findRecipeById(mealId)
    .then(meal => {
      if (!meal) {
        return res.status(404).json({ error: 'Meal not found' });
      }
      res.status(200).json(meal);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch meal' });
    });
});


app.delete('/meals/:id', (req, res) => {
  const mealId = req.params.id;

  recipeService.findRecipeToDelete(mealId)
    .then(deletedMeal => {
      if (!deletedMeal) {
        return res.status(404).json({ error: 'Meal not found' });
      }
      res.status(200).json({ message: 'Meal deleted successfully', meal: deletedMeal });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete meal' });
    });
});


app.post("/register", registerUser);
app.post("/login", loginUser);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

