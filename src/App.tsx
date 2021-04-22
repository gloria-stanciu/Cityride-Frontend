import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './css/App.css';
import LogIn from './components/LogIn';
import CreateAccount from './components/CreateAccount';
import MobileHome from './components/MobileHome';
import DesktopHome from './components/DesktopHome';
import SearchPage from './components/SearchPage';

function checkDevice(){
  const isMobile = window.innerWidth;
  if(isMobile<=600){
      return(MobileHome)
  }
  else{
      return (DesktopHome)
  }
}

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path ='/' component = {checkDevice()}/>
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={CreateAccount} />
            <Route path="/home" component={SearchPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
