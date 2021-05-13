import React from "react";
// import { Map } from "maplibre-gl";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./custom.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    {console.log(store.getState().toggleReducer)}
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
