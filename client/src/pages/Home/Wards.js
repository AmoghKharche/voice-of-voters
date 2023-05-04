import React, { useState } from "react";
import Mumbai from "../../assets/1.jpg";
import Worli from "../../assets/2.jpg";
import Airport from "../../assets/3.jpg";
import Marine from "../../assets/4.jpg";
import Pune from "../../assets/5.jpg";
import MainPune from "../../assets/6.jpg";
import PuneCity from "../../assets/7.jpg";
import PuneMain from "../../assets/8.jpg";
import "./Wards.css"; // import the stylesheet for the component
import {Link } from "react-router-dom"
const Wards = () => {
  const [searchText, setSearchText] = useState("");
  const wardsInfoData = [
    {
      image: Mumbai,
      title: "Mumbai",
      text: "Mumbai Ward - Coulaba",
    },
    {
      image: Worli,
      title: "Bandra",
      text: "Bandra Ward - Worli",
    },
    {
      image: Airport,
      title: "Airport",
      text: "Andheri Ward - Airport Road",
    },
    {
      image: Marine,
      title: "Marine Drive",
      text: "Mumbai Ward - Marine Drive",
    },
    {
      image: Pune,
      title: "Pune",
      text: "Pune Ward - Chinchwad",
    },
    {
      image: MainPune,
      title: "Pune",
      text: "Pune Ward - Lohgad Fort",
    },
    {
      image: PuneCity,
      title: "Pune",
      text: "Pune Ward - GandhiNagar",
    },
    {
      image: PuneMain,
      title: "Pune",
      text: "Pune Ward - College Road",
    },
  ];

  const filteredWards = wardsInfoData.filter((data) =>
    data.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="wards-container">
      <h1>SEARCH YOUR WARD</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="wards-cards-container">
      {filteredWards.map((data, index) => (
  <Link key={index} to={`/ward/${data.title.toLowerCase()}`}>
    <div className="wards-card">
      <img src={data.image} alt="" />
      <h2>{data.title}</h2>
      <p>{data.text}</p>
    </div>
  </Link>
))}
      </div>
    </div>
  );
};

export default Wards;
