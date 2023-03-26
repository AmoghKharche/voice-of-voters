import React from "react";
import Ads1 from "../../assets/img4.jpg";
import Ads2 from "../../assets/img5.jpg";
import Ads3 from "../../assets/img6.jpg";
import Ads4 from "../../assets/img3.jpg";
const Ward41 = () => {
  const announcementsInfoData = [
    {
      image: Ads1,
      title: "Free Health Checkup",
      text: "Date: 28 March 2023.At City Hospital Ground",
    
    },
    {
      image: Ads2,
      title: "Free Eye Checkup",
      text: "Get your eyes tested for free at Laxmi Eye Clinic ",
    },
    {
      image: Ads3,
      title: "Kids Yoga Camp",
      text: "Let your kids learn the benifits of yoga",
      
    },
    {
          image: Ads4,
          title: " Aadhar Card Update",
          text: "Free of cost aadhar updation at E-Seva Kendra",
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

export default Ward41;