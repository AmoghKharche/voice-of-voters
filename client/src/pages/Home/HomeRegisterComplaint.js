import React from "react";
import { Link } from "react-router-dom";
import PickMeals from "../../assets/pick-meals-image.png";
import ChooseMeals from "../../assets/choose-image.png";
import DeliveryMeals from "../../assets/delivery-image.png";

const RegisterComplaint = () => {
  const registerComplaintInfoData = [
    {
      image: PickMeals,
      title: "Electricity",
      text: "Any kind of complaints realted to electricity.",
    },
    {
      image: ChooseMeals,
      title: "Garbage",
      text: "Complaint about garbage issues in your locality.",
    },
    {
      image: DeliveryMeals,
      title: "Water",
      text: "Got any water supply issues post it here.",
    },
    {
      image: DeliveryMeals,
      title: "Roads",
      text: "Poor quality of roads? Complaint here.",
    },
    {
      image: DeliveryMeals,
      title: "Sewage",
      text: "Issues regarding sewage? Get it resolved here.",
    },
    {
      image: DeliveryMeals,
      title: "Others",
      text: "Any kind of complaints related to your locality.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">REGISTER COMPLAINT</h1>
      </div>
      <div className="work-section-bottom">
        {registerComplaintInfoData.map((data) => (
          <Link to="/register-complaint" key={data.title}>
            <div className="work-section-info">
              <div className="info-boxes-img-container">
                <img src={data.image} alt="" />
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RegisterComplaint;
