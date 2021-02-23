import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import './css/App.css';
import Home from './components/Home';
import LogIn from './components/LogIn';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <div>
          {/* <Navigator/> */}
          <Switch>
            <Route exact path ='/' component = {Home}/>
            <Route path="/logIn" component={LogIn} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
