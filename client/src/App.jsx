import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import Routes from "./Routes";
import initStore from "./redux/store";

const history = createBrowserHistory();
const store = initStore(history);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes history={history} />
      </Provider>
    );
  }
}

export default App;
