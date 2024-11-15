import React from "react";

function HomeMR() {
    return (
        <div class="row">
            <div id="myrecipes" class="col-sm-6"></div>
            <div id="column-2" class="col-sm-6">
                <h3>My Recipes</h3>
                <p>See your recipes here!</p>
                <a href="myrecipes" class="btn" id="button">See More...</a>
            </div>
        </div>
      );
    }

export default HomeMR;