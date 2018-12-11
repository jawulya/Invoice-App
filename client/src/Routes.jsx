import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import { INVOICES, CUSTOMERS, PRODUCTS } from "./constants/routes.constants";
import NavBar from "./components/NavBar/NavBar";

class Routes extends Component {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <>
          <NavBar />
          <Switch>
            <Route exact path={INVOICES} component={Invoices} />
            <Route exact path={CUSTOMERS} component={Customers} />
            <Route exact path={PRODUCTS} component={Products} />
          </Switch>
        </>
      </ConnectedRouter>
    );
  }
}

Routes.propTypes = {
  history: PropTypes.object
};

export default Routes;
