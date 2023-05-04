import React from "react";
import BannerBackground from "../../assets/home-banner-background.png";
import BannerImage from "../../assets/home-banner-image.png";
import Navbar from "../../components/Navbar";
import { FiArrowRight } from "react-icons/fi";
import HomeAnnouncements from "./HomeAnnouncements"
import HomeRegisterComplaint from "./HomeRegisterComplaint"
import Wards from "./Wards"
import "./Home.css"


const Home = () => {
  return (
    <>
    <div className="home-container">
   
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            "From Complaints to Solutions - Let Your Voice be Heard!"
          </h1>
          <p className="primary-text">
            <h4>"Speak up, stand out - become a part of the Voice of Voters!"</h4>
          </p>
          <a href="/login">
            <button className="secondary-button">
              Join Now <FiArrowRight />{" "}
            </button>
          </a>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <div className="know-your-corporator">
        <a href="/knowyourcorporator" className="know-your-corporator-link">
          Know Your Corporator's Roles And Responsibilities
        </a>
      </div>
      <HomeAnnouncements/>
      <HomeRegisterComplaint/>
      <Wards/>
    </div>
    </>
  );
};

export default Home;

