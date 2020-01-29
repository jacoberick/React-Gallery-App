//not found component
import React from "react";

const NotFound = props => (
  <ul>
    <h1>No Results Found :(</h1>
    <h3>Your search did not return any results. Please try again.</h3>
    <img
      alt="astronaut lost in space"
      src={require("../img/no-results.jpeg")}
    />
  </ul>
);

export default NotFound;
