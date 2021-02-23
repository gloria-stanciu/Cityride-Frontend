import React from 'react';

import destination_boy from '../images/destination_boy.png'
import '../css/Home.scss';
import Button from './Button'

function Home(){
    return (
        <div>
            <div className="page1 w-100 h-100">
                <img src='/images/app_name.png' alt="app name" className='image'/>
                <div className='text'>
                    <div className='child'>Wait no more!</div>
                    <div className='child'>Track your public transport and be in sync with it!</div>
                </div>
                <div className='container col-lg-5 col-md-12 mt-5'>
                    <div className = 'accountButtons row'>
                        <Button className='btn btn-responsive btn-primary purple col-lg-6' name="Log in"></Button>
                        <Button className='btn btn-responsive btn-secondary orange col-lg-6' name="Create account"></Button>
                    </div>
                    <div className = 'row'>
                        <Button className='btn btn-responsive btn-light white col-lg' name="Continue without account"></Button>
                    </div>
                </div>
            </div>
            <div className="page2 container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 mb-xs-5 mb-5 align-self-center">
                        <div className="text-center description2"><b style={{ color: "#3D199B" }}>Real time </b> tracking for your public transport</div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <img src='/images/destination_boy.png' alt="destination boy" className='img-fluid'/>
                    </div>
                </div>
            </div>
            <div className="page3 container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 mb-sm-5 mb-5">
                        <img src='/images/destination_girl.png' alt="destination girl" className='img-fluid'/>
                    </div>
                    <div className="col-md-6 col-sm-12 align-self-center">
                        <div className="description3 text-center">Make your ride easier and stress free!<br/> See your <b style={{ color: "#3D199B" }}>ride options, stops</b> and  <b style={{ color: "#3D199B" }}>duration</b>.</div>
                    </div>
                </div>
            </div>
            <div className="page4 container">
                <div className="row">
                    <div className="col-md-6 col-sm-12  mb-sm-5 mb-5">
                        <img src='/images/payments.png' alt="payments" className='img-fluid'/>
                    </div>
                    <div className="col-md-6 col-sm-12 align-self-center">
                        <div className="description2 text-center">Online payments for your ride ticket <br/><b style={{ color: "#3D199B" }}> easy, fast </b> and <b style={{ color: "#3D199B" }}>safe</b></div>
                    </div>
                </div>
            </div>
         </div>
      );
}

export default Home;