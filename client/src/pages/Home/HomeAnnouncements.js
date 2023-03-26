import React from "react";
import Ads1 from "../../assets/11.jpg";
import Ads2 from "../../assets/22.jpg";
import Ads3 from "../../assets/33.jpg";
import Ads4 from "../../assets/img123.jpg";
import Ads5 from "../../assets/33.jpg";

const Announcements = () => {
  const announcementsInfoData = [
    {
      image: Ads1,
      title: "Real Estate",
      text: "Making your dream home a reality !",
    },
    {
      image: Ads2,
      title: "BigBazar",
      text: "Your Comfort our Priority ",
    },
    {
      image: Ads3,
      title: "Fashion",
      text: "Fashion today, Fashion Tomorrow",
    },
    {
      image: Ads4,
      title: "Kailash Sweets",
      text: "25% Discount on all sweets",
    },
    {
      image: Ads3,
      title: "Fashion",
      text: "Fashion today, Fashion Tomorrow",
    },

  ];

  return (
    <div className="Announcements-container">
      <h1>ADVERTISE ON OUR PLATFORM!</h1>
      <div className="Announcements-cards-container">
        {announcementsInfoData.map((data, index) => (
          <div key={index} className="Announcements-card">
            <img src={data.image} alt="" />
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;

