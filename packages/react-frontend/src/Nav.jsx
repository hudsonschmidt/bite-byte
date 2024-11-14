import React from "react";

function Nav() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <img src='./images/logo.png' alt="Logo" width="30" height="30" class="d-inline-block align-text-top"/>
            <a class="navbar-brand" href="#">
                Bite & Byte
            </a>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Browse</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Saved</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">My Recipes</a>
                    </li>
                </ul>
            </div>
            <div class="d-flex">
                <a id="profile" class="nav-link" href="#">
                    <img src="./images/user_icon.png" alt="User Profile" width="30" height="30" class="rounded-circle"/>
                </a>
            </div>
        </div>
    </nav>
  );
}

export default Nav;