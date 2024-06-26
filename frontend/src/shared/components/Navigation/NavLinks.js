import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  function looggingOut() {
    auth.logout();
    navigate("/");
  }
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={looggingOut}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
