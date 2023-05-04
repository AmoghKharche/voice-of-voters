import React from "react";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

const Ward40 = () => {
  const announcementsInfoData = [
    {
      image: img1,
      title: "Polio Campaign",
      text: "Date: 30 March 2023.At GaonDevi Ground",
    
    },
    {
      image: img2,
      title: "Job Fair",
      text: "Get Hired. Attend the Fair ",
    },
    {
      image: img3,
      title: "Aadhar Update",
      text: "Apply/Update your Aadhar Card",
    },
    

  ];

  return (
    <div className="Announcements-container">
      <h1>Things Happening in Your Locality </h1>
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

export default Ward40;