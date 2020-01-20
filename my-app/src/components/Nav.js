import React from "react";
import { Link } from "react-router-dom";

const Nav = props => {
  const routes = props.routes;
  let route = Object.keys(routes).map((route, idx) => (
    <li key={idx}>
      <Link to={"/" + route}>
        {route.charAt(0).toUpperCase() + route.slice(1)}
      </Link>
    </li>
  ));

  return (
    <nav className="main-nav">
      <ul>{route}</ul>
    </nav>
  );
};

export default Nav;
