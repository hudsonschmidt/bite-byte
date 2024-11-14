import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from "./Nav"
import Body from "./body"
import About from "./home_about"
import Browse from "./home_browse"
import Saved from "./Saved"
import MyRecipes from "./home_mr"
import BrowsePage from "./Browse.jsx"


function MyApp() {
  return (
    <div id = "body" className="container-fluid">
      <Nav />
      <Routes>
        <Route path="/" element={<body />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
      <Body />
      <About />
      <Browse />
      <Saved />
      <MyRecipes />
    </div>
  );
}

export default MyApp;
