import React from 'react';
import HomeBody from "./body"
import HomeAbout from "./home_about"
import HomeBrowse from "./home_browse"
import HomeSaved from "./home_saved"
import HomeMR from "./home_mr"
import "./main.css";
import "./col.css";


function Home() {
  return (
    <div id = "body" className="container-fluid">
      <HomeBody />
      <HomeAbout />
      <HomeBrowse />
      <HomeSaved />
      <HomeMR />
    </div>
  );
}

export default Home;