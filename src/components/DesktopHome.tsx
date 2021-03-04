import React from 'react';

import '../css/DesktopHome.css';
import Button from './Button'
import HomeSection from'./HomeSection'

import {useHistory} from 'react-router-dom';

function DesktopHome(){
    const history = useHistory();
    return (
        <div className='parentDiv'>
            <div className="page1 w-100 h-100">
                <img src='/images/app_name.png' alt="app name" className='image'/>
                <div className='text text-center'>
                    <div className='child'>Wait no more!</div>
                    <div className='child'>Track your public transport and be in sync with it!</div>
                </div>
                <br/>
                <div className='container col-lg-6 col-md-12 mt-5'>
                    <div className = 'accountButtons row'>
                        <Button className='btn btn-responsive btn-primary purple col-lg-6' name="Log in" onClick={()=>{
                            history.push('/login')
                        }}></Button>
                        <Button className='btn btn-responsive btn-secondary orange col-lg-6' name="Create account" onClick={()=>{
                            history.push('/signup')
                        }}></Button>
                    </div>
                    <div className = 'row'>
                        <Button className='btn btn-responsive btn-light white col-lg' name="Continue without account"></Button>
                    </div>
                </div>
                <div>
                    <img src='/images/arrow.png' alt="arrow" className='image arrow'/>
                </div>
            </div>
            <HomeSection></HomeSection>
            <div className='container col-lg-6 col-md-12'>
                <Button className='btn btn-responsive btn-primary purple col-6 mr-2' name="Log in" onClick={()=>{
                    history.push('/login')
                }}></Button>
                <Button className='btn btn-responsive btn-secondary orange col-6' name="Create account" onClick={()=>{
                    history.push('/signup')
                }}></Button>
            </div>
        </div>
    );
}

export default DesktopHome;