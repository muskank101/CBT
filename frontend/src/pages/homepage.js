import React, { Fragment } from "react";
import Card from "../components/card";
import NavBar from "../components/navbar";
// const screenfull = require("screenfull");

const HomePage = () => {
  return (
    <Fragment>
      <NavBar />
      {/* <div
        className="d-flex justify-content-end flex-nowrap m-2"
        style={{ width: "97vw" }}
      >
        <div className=" justify-content-end">
          <button type="button" class="btn btn-info text-white mx-3">
            <i className="fa fa-file pe-2"></i>
            Login
          </button>
        </div>
        <div className="justify-content-end">
          <button type="button" class="btn btn-info text-white ">
            <i className="fa fa-file pe-2"></i>
            Sign Up
          </button>
        </div>
      </div> */}
      <div className="bg-white py-4 px-5" style={{ minHeight: "90vh" }}>
        <Card />
      </div>
    </Fragment>
  );
};

export default HomePage;
