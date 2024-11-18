import React from "react";
import { Link } from 'react-router-dom';
import "./nav.css";

function Nav() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <img src='./images/logo.png' alt="Logo" width="30" height="30" class="d-inline-block align-text-top"/>
            <a class="navbar-brand" href="/">
                Bite & Byte
            </a>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="/browse">Browse</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="/saved">Saved</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="/myrecipes">My Recipes</Link>
                    </li>
                </ul>
            </div>
            <div class="d-flex">
                <a id="profile" class="nav-link" href="login">
                    <img src="./images/user_icon.png" alt="User Profile" width="30" height="30" class="rounded-circle"/>
                </a>
            </div>
        </div>
    </nav>
  );
}

export default Nav;