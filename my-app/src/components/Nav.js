//nav component and functionality
import React from "react";
import { Link } from "react-router-dom";

//mapping routes along with assigning keys
const Nav = props => {
  const routes = props.routes;
  let route = Object.keys(routes).map((route, idx) => (
    <li key={idx}>
      <Link to={"/" + route}>
        {route.charAt(0).toUpperCase() + route.slice(1)}
      </Link>
    </li>
  ));

  //3 link tag construction
  return (
    <nav className="main-nav">
      <ul>{route}</ul>
    </nav>
  );
};

export default Nav;
