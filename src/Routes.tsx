import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

// import About from "./About/About";
// import Contact from "./Contact/Contact";
import LogIn from './components/Home';
import Home from './components/Home';
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/logIn" component={LogIn} />
                    {/* <Route path="/Contact" component={Contact} /> */}
                    {/* <Route path="/Products" component={Products} /> */}
                </Switch>
            </Router>
        )
    }
}