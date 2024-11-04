import React from "react";

function Nav() {
  return (
    <nav class="navbar navbar-inverse navbar-fixed-top fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <a href="">Bite & Byte</a>
            </div>
            <div class="navbar-center">
                <ul class="nav navbar-nav">
                    <li><a href="">Page 1</a></li>
                    <li><a href="">Page 2</a></li>
                    <li><a href="">Page 3</a></li>
                </ul>
            </div>
        </div>
    </nav>
  );
}

export default Nav;