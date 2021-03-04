import React from 'react';

import '../css/LogIn.css';
import Button from './Button'
import {useHistory} from 'react-router-dom';

function LogIn(){
    const history = useHistory();
    return (
        <div className='parentDiv d-flex flex-column justify-content-between text-center'>
            <button className="btn mt-5" onClick={()=>{
                history.push('/')
            }}>
                <img src='/images/app_name.png' alt="app name" className='logo'/>  
            </button>
            <div>
                <div className="descriptionTitle">Log in</div>
                <div className="container col-8 col-sm-8 col-lg-4 col-md-6">
                    <div className="row col-12 mb-3">
                        <label className='form-check-label text-align-left'>Phone number</label>
                        <input type="text" className="form-control form-control-responsive form-control-lg" placeholder="+40 742 426 326"/>
                    </div>
                    <div className="row col-12 ">
                    <label className='form-check-label'>Password</label>
                        <input type="text" className="form-control form-control-responsive form-control-lg mb-5" placeholder="************"/>
                    </div>
                </div>
            </div>
            <div>
                <Button className="btn btn-responsive btn-primary purple col-8 col-sm-4 col-md-4 col-lg-3" name='Log in'></Button>
                <br/>
                <Button className="btn btn-responsive btn-light white col-8 col-sm-4 col-md-4 col-lg-3 mb-5" name='Create account'></Button>
            </div>
        </div>
      );
}

export default LogIn;   