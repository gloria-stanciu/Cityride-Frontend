import React from 'react';

import destination_boy from '../images/destination_boy.png'
import '../css/Home.scss';
import Button from './Button'

function Home(){
    return (
        <div className = 'home'>
            <img src='/images/app_name.png' alt="app name" className='image'/>
            <div className='text mt-5'>
                <div className='child'>Wait no more!</div>
                <div className='child'>Track your public transport and be in sync with it!</div>
            </div>
            <div className='container col-md-4 mt-5 '>
                <div className = 'accountButtons row'>
                    <Button className='btn btn-primary purple col-lg-6 ' name="Log in"></Button>
                    <Button className='btn  btn-secondary orange col-lg-6 ' name="Create account"></Button>
                </div>
                <div className = 'row'>
                    <Button className='btn btn-light white col-lg ' name="Continue without account"></Button>
                </div>
            </div>
         </div>
      );
}

export default Home;