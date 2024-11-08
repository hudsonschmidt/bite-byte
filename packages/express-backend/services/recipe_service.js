import mongoose from "mongoose";
import recipeModel from "../models/recipe.js";



function getRecipes(name, job) {
    if (name) {
        return recipeModel.find({ name: new RegExp(name, "i")}); 
      }
      return recipeModel.find(); 
}

function findRecipeById(id) {
  return recipeModel.findById(id);
}

function addRecipe(recipe) {
  const userToAdd = new recipeModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findReciepeByName(name) {
    return recipeModel.find({ name: name });
}

function findReciepesByIngridients(ingredients) {
    return recipeModel.find({ ingredients: { $all: ingredients } });
}

function findRecipeToDelete(id) {
  return recipeModel.findByIdAndDelete(id)
}





export default {
    addRecipe,
    getRecipes,
    findRecipeById,
    findReciepeByName,
    findReciepesByIngridients,
    findRecipeToDelete,
};
