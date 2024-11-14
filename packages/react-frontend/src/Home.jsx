import React from 'react';
import Nav from "./Nav"
import HomeBody from "./body"
import HomeAbout from "./home_about"
import HomeBrowse from "./home_browse"
import HomeSaved from "./home_saved"
import HomeMR from "./home_mr"


function Home() {
  return (
    <div id = "body" className="container-fluid">
      <Nav />
      <HomeBody />
      <HomeAbout />
      <HomeBrowse />
      <HomeSaved />
      <HomeMR />
    </div>
  );
}

export default Home;
