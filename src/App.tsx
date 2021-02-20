import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './css/App.css';
import Home from './components/Home';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <div>
          {/* <Navigator/> */}
          <Switch>
            <Route path ='/' component = {Home} exact/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
