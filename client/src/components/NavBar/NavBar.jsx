import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.sass";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="navigation container">
        <div className="logo">Invoice App</div>
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink to="/" exact activeClassName="active">
              Invoices
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/customers" exact activeClassName="active">
              Customers
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/products" exact activeClassName="active">
              Products
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
