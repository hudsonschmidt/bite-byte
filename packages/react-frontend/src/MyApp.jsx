// src/MyApp.jsx
import React from "react";
import Nav from "./Nav"
import Body from "./body"
import About from "./About"
import Browse from "./Browse"
import Saved from "./Saved"
import MyRecipes from "./MyRecipes"

function MyApp() {
  return (
    <div id = "body" className="container-fluid">
      <Nav />
      <Body />
      <About />
      <Browse />
      <Saved />
      <MyRecipes />
    </div>
  );
}
export default MyApp;