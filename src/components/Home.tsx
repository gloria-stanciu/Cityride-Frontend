import React from 'react';

import app_name from '../images/app_name.png'
import destination_boy from '../images/destination_boy.png'
import '../css/Home.css';

function Home(){
    return (
        <div className = 'home'>
            <img src={app_name} alt="app name" className='image'/>
            <div className='text'>
                <div className='child'>Wait no more!</div>
                <br/>
                <div className='child'>Track your public transport and be in sync with it!</div>
            </div>
            <div className='buttons'>
                <button type = "button" className='purple'>Log in</button>
                <br/>
                <button type = "button" className='orange'>Create account</button>
                <br/>
                <button type = "button" className='white'>Continue without account</button>
            </div>
        </div>
      );
}

export default Home;