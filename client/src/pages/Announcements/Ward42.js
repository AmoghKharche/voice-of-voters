import React from "react";
// import Ads1 from "../Assets/11.jpg";
// import Ads2 from "../Assets/22.jpg";
// import Ads3 from "../Assets/33.jpg";

const Ward42 = () => {
  const announcementsInfoData = [
    {
    //   image: Ads1,
      title: "Polio Campaign",
      text: "Date: 30 March 2023.At GaonDevi Ground",
    
    },
    {
    //   image: Ads2,
      title: "BigBazar",
      text: "Your Comfort our Priority ",
    },
    {
    //   image: Ads3,
      title: "Fashion",
      text: "Fashion today, Fashion Tomorrow",
    },
    {
        //   image: Ads3,
          title: "Fashion",
          text: "Fashion today, Fashion Tomorrow",
        },
        {
            //   image: Ads3,
              title: "Fashion",
              text: "Fashion today, Fashion Tomorrow",
            },
            {
                //   image: Ads3,
                  title: "Fashion",
                  text: "Fashion today, Fashion Tomorrow",
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

export default Ward42;