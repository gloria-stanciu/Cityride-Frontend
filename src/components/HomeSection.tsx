import React from 'react';

import '../css/HomeSection.css';

export function PageTwo(){
    return(
        <div className={`page2 container d-flex align-items-center flex-column`} id='1'>
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <img src='/images/destination_boy.png' alt="destination boy" className='img-fluid'/>
                </div>
                <div className="col-md-6 col-sm-12 mb-xs-5 mb-5 align-self-center">
                    <div className="text-center description2"><b style={{ color: "#3D199B" }}>Fast and easy </b> tracking of     your public transport</div>
                </div>
            </div>
        </div>
    )
}

export function PageThree(){
    return(
        <div className={`page3 container d-flex flex-column`}>
            <div className="row">
                <div className="col-md-6 col-sm-12 mb-sm-5 mb-5">
                    <img src='/images/destination_girl.png' alt="destination girl" className='img-fluid'/>
                </div>
                <div className="col-md-6 col-sm-12 align-self-center">
                    <div className="description3 text-center"><br/> See your <b style={{ color: "#3D199B" }}>ride options, stops</b> and  <b style={{ color: "#3D199B" }}>duration</b>.</div>
                </div>
            </div>
        </div>
    )
}

export function PageFour(){
    return(
        <div className={`page4 container d-flex align-items-center flex-column`}>
            <div className="row">
                <div className="col-md-6 col-sm-12  mb-sm-5 mb-5">
                    <img src='/images/install.png' alt="install" className='img-fluid'/>
                </div>
                <div className="col-md-6 col-sm-12 align-self-center">
                    <div className="description2 text-center"><br/><b style={{ color: "#3D199B" }}> Fast installing </b> on any <b style={{ color: "#3D199B" }}>device</b></div>
                </div>
            </div>
        </div>
    )
}

function HomeSection(){
    return (
        <div className='deviceDisplay'>
            <PageTwo/>
            <PageThree/>
            <PageFour/> 
        </div>
    )
}

export default HomeSection;