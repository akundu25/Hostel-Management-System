import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar.js";
import ImageSlider from "../ImageSlider/ImageSlider.js";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="text-component">
          <p className="intro-text">
            Avail the hostel resources at an affordable price
          </p>
          <Link to="/student-register" className="register-btn">
            REGISTER FOR YOUR ROOM
          </Link>
        </div>
        <div className="image-component">
          <div className="hostel-images">
            <ImageSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
