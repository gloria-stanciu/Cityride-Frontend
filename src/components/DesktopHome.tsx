import React from "react";

import "../css/DesktopHome.css";
import Button from "./Button";
import HomeSection from "./HomeSection";
import { useHistory } from "react-router-dom";

function DesktopHome() {
  const history = useHistory();
  return (
    <div className="desktop-home parentDiv">
      <div className="page1 w-100 h-100">
        <img src="/images/app_name.png" alt="app name" className="image" />
        <div className="text text-center">
          <div className="child">Wait no more!</div>
          <div className="child">
          Make your ride easier and stress free!
          </div>
        </div>
        <br />
        <div className="container col-lg-6 col-md-12 mt-5 text-center">
          <Button
            className="btn btn-responsive btn-primary purple col-lg-6"
            name="Try now"
            onClick={() => {
              history.push("/home");
            }}
          ></Button>
        </div>
        <div>
          <img src="/images/arrow.png" alt="arrow" className="image arrow" />
        </div>
      </div>
      <HomeSection></HomeSection>
      <div className="container col-lg-6 col-md-12 text-center">
        <Button
          className="btn btn-responsive btn-primary purple col-6 mr-2"
          name="Try now"
          onClick={() => {
            history.push("/home");
          }}
        ></Button>
      </div>
    </div>
  );
}

export default DesktopHome;
