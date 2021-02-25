import React,{ Component, useState, useRef } from 'react';

import '../css/MobileHome.css';
import Button from './Button'
import HomeSection from'./HomeSection'
import {PageTwo, PageThree, PageFour} from './HomeSection'

import {useHistory} from 'react-router-dom';

const buttons=[
    {id:0 ,name: 'Page1', comp: <PageOne/>},
    {id:1, name: 'Page2', comp: <PageTwo/>},
    {id:2, name: 'Page3', comp: <PageThree/>},
    {id:3, name: 'Page4', comp: <PageFour/>}
]

function MobileHome(){
    const [state, setState] = useState(buttons[0]);

    function goToPage(obj){
        setState(prev => {
            // Object.assign would also work
            return {...prev, ...obj}})
        return(
            Object.assign(state.comp)
        )
    }
    return (
        <div className="text-center">
            {state.comp}
            <div className='fixed-bottom' data-toggle='buttons'>
                {buttons.map((object, id) => (
                    <button className="btn slides" key={id} onClick={() => goToPage(object)}>
                        <div className='ellipse'/>  
                    </button>
                    ))
                }
            </div>
        </div>
    )
}

function PageOne(){
    const history = useHistory();
    return (
        <div className="page1 container d-flex justify-content-center flex-column">
            <img src='/images/app_name.png' alt="app name" className='image'/>
            <div className='text text-center'>
                <div className='child'>Wait no more!</div>
                <div className='child'>Track your public transport and be in sync with it!</div>
            </div>
            <div className='container col-lg-5 col-md-12'>
                <div className = 'accountButtons row'>
                    <Button className='btn btn-responsive btn-primary purple col-lg-6' name="Log in" onClick={()=>{
                        history.push('/login')
                    }}></Button>
                    <Button className='btn btn-responsive btn-secondary orange col-lg-6' name="Create account"></Button>
                </div>
                <div className = 'row'>
                    <Button className='btn btn-responsive btn-light white col-lg' name="Continue without account"></Button>
                </div>
            </div>
        </div>
    )
}

export default MobileHome;