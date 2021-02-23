import React from 'react';

import '../css/LogIn.css';
import Button from './Button'
import {useHistory} from 'react-router-dom';

function LogIn(){
    const history = useHistory();
    return (
        <div className='title text-center mt-4'>
            <button className="btn" onClick={()=>{
                history.push('/')
            }}>
                <img src='/images/app_name.png' alt="app name" className='logo'/>  
            </button>
                <div className="descriptionTitle">Log in</div>
                <div className="container col-12 col-sm-8 col-lg-4 col-md-7">
                    <div className="row col-12 mb-3">
                        <label className='form-check-label text-align-left'>Phone number</label>
                        <input type="text" className="form-control form-control-lg" placeholder="+40 742 426 326"/>
                    </div>
                    <div className="row col-12 ">
                    <label className='form-check-label'>Password</label>
                        <input type="text" className="form-control form-control-lg" placeholder="************"/>
                    </div>
                </div>
                    <Button className="btn btn-responsive btn-primary purple col-8 col-sm-6 col-md-4 col-lg-2 mt-5" name='Log in'></Button>
                    <br/>
                    <Button className="btn btn-responsive btn-secondary orange col-8 col-sm-6 col-md-4 col-lg-2" name='Create account'></Button>
        </div>
      );
}

export default LogIn;   