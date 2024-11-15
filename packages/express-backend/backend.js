// backend.js
import express from "express";
import axios from "axios"; 
import dotenv from "dotenv";
import fetch from 'node-fetch';
import mongoose from "mongoose";
import cors from "cors";
import recipeService from "./services/recipe_service.js";
import User from "./models/user.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

const app = express();
const port = 8000;

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose.connect(MONGO_CONNECTION_STRING).catch((error) => console.log(error));


const { API_KEY } = process.env;
const API = 'https://api.spoonacular.com/recipes/random';
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
  const name = req.query.name;

  recipeService.getRecipes(name)
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


async function fetchRandom() {
  try {
    let response = await fetch(`${API}?apiKey=${API_KEY}&number=5`);
    let data = await response.json();
    if (data && data.recipes) {
      return data.recipes.map(mapRecipeToSchema);
    } else {
      console.error("Error: ", data);
      return [];  
    }
  } catch (error) {
    console.error('Failed to fetch meals', error);
    return [];  
  }
}

app.get('/recipes', async (req, res) => {
  try {
      let recipes = await fetchRandom();  
      recipes = {recipes_list: recipes}
      res.status(200).send(recipes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch' });
  }
});


app.post("/register", registerUser);
app.post("/login", loginUser);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});



const meals = {
  "recipes_list": [
    {
      "id": 637675,
      "name": "Cheesy Potato Corn Scones",
      "image_url": "https://img.spoonacular.com/recipes/637675-556x370.jpg",
      "ingredients": [
        "water",
        "potato flakes",
        "butter",
        "flour",
        "cornmeal",
        "cheddar cheese",
        "baking powder",
        "salt",
        "poppy seeds",
        "milk"
      ]
    },
    {
      "id": 646185,
      "name": "Ham and Red Bean Soup",
      "image_url": "https://img.spoonacular.com/recipes/646185-556x370.jpg",
      "ingredients": [
        "leeks",
        "thyme",
        "bay leaf",
        "coriander seeds",
        "peppercorns",
        "cumin seeds",
        "olive oil",
        "carrots",
        "celery",
        "garlic",
        "tomato paste",
        "beans",
        "bone from ham 3 cups ham 1 teaspoon ground chipotle chile powder salt and pepper",
        "water",
        "ham",
        "ground chipotle chile powder",
        "salt and pepper",
        "add he ham and chipotle chile powder and stir in. allow to simmer until beans are and are just begin"
      ]
    },
    {
      "id": 638832,
      "name": "Chocolate Banoffee Pie",
      "image_url": "https://img.spoonacular.com/recipes/638832-556x370.jpg",
      "ingredients": [
        "bananas",
        "butter",
        "chocolate digestives/plain chocolate cookies",
        "crackers",
        "thickened cream",
        "brown sugar",
        "chocolate",
        "icing mixture/sugar",
        "condensed milk",
        "vanilla essence"
      ]
    },
    {
      "id": 645680,
      "name": "Grilled Chuck Burgers with Extra Sharp Cheddar and Lemon Garlic Aioli",
      "image_url": "https://img.spoonacular.com/recipes/645680-556x370.jpg",
      "ingredients": [
        "arugula",
        "cheddar cheese",
        "garlic clove",
        "ground chuck",
        "lemon juice",
        "mayonnaise",
        "olive oil",
        "parsley",
        "bell pepper",
        "onion",
        "salt",
        "kaiser rolls",
        "worcestershire sauce"
      ]
    },
    {
      "id": 644861,
      "name": "Gluten Free Yellow Cake And Cupcakes",
      "image_url": "https://img.spoonacular.com/recipes/644861-556x370.jpg",
      "ingredients": [
        "coconut flour",
        "tapioca flour",
        "salt",
        "baking soda",
        "baking powder",
        "xanthan gum",
        "eggs",
        "sugar",
        "veganaise",
        "milk alternative",
        "vanilla extract",
        "earth balance butter",
        "dairy free chocolate chips",
        "salt",
        "powdered sugar"
      ]
    }
  ]
};
