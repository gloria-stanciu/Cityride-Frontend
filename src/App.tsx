import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./css/App.css";
import LogIn from "./components/LogIn";
import CreateAccount from "./components/CreateAccount";
import MobileHome from "./components/MobileHome";
import DesktopHome from "./components/DesktopHome";
import SearchPage from "./components/SearchPage";

// import { Context, initialState, reducer } from "./store";
import { useReducer } from "react";

function Home() {
  return (
    <>
      <MobileHome />
      <DesktopHome />
    </>
  );
}

function App() {
  // const [store, dispatch] = useReducer(reducer, initialState);

  return (
    // <Context.Provider value={{ store, dispatch }}>
      <div className="app">
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LogIn} />
              <Route path="/signup" component={CreateAccount} />
              <Route path="/home" component={SearchPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    // </Context.Provider>
  );
}

export default App;
