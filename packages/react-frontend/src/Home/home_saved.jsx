import React from "react";

function HomeSaved() {
    return (
        <div class="row">
            <div id="column-2" class="col-sm-6">
                <h3>Saved</h3>
                <p>See saved recipes here!</p>
                <a href="saved" class="btn" id="button">See More...</a>
            </div>
            <div id="saved" class="col-sm-6"></div>
        </div>
    );
}

export default HomeSaved;