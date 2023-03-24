import React from "react";
import BannerBackground from "../../assets/home-banner-background.png";
import BannerImage from "../../assets/home-banner-image.png";

import { FiArrowRight } from "react-icons/fi";
import HomeAnnouncements from "./HomeAnnouncements";
import HomeRegisterComplaint from "./HomeRegisterComplaint";
import HomeWard from "./HomeWards";

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
              "Strength in Numbers - Join the Voice of Voters Movement"
            </p>
            <button className="secondary-button">
              Join Now <FiArrowRight />{" "}
            </button>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
      </div>
      <HomeAnnouncements />
      <HomeRegisterComplaint />
      <HomeWard />
    </>
  );
};

export default Home;
