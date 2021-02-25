import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import './css/App.css';
// import Home from './components/Home';
import LogIn from './components/LogIn';
import MobileHome from './components/MobileHome';
import DesktopHome from './components/DesktopHome';

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
          {/* <Navigator/> */}
          <Switch>
            <Route exact path ='/' component = {checkDevice()}/>
            <Route path="/login" component={LogIn} />
            {/* <Redirect to="/"/> */}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
