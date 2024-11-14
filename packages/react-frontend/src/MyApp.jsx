import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from "./Nav"
import Home from "./Home.jsx"
import BrowsePage from "./Browse.jsx"
import SavedPage from "./Saved.jsx"
import MRPage from "./MyRecipes.jsx"


function MyApp() {
  return (
    <div id = "body" className="container-fluid">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/myrecipes" element={<MRPage />} />
      </Routes>
      
    </div>
  );
}

export default MyApp;
