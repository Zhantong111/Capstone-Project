import React from "react";
import { Link } from "react-router-dom";

function Landingscreen() {
  return (
    <div className="row landing justify-content-center">
      <div
        className="col-md-9 my-auto text-center"
        style={{ borderRight: "8px solid white" }}
      >
        <h2 style={{ color: "white", fontSize: "120px" }}>ZTCP</h2>
        <h1 style={{ color: "white" }}>
          " Welcome to a family-friendly hotel that offers a wide range of
          accommodation types, from rooms to suites. All this in the peaceful
          surroundings of our beautiful gardens, will make your time at our
          hotel to be an unforgettable stay. "
        </h1>
        <Link to="/home">
          <button className="btn landingbtn" style={{ color: "black" }}>
            Let's Explore
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
