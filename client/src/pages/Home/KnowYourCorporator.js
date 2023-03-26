import React from 'react';
import rules from '../../assets/rules.jpg';
import './KnowYourCorporator.css';

function KnowYourCorporator() {
  return (
    <div className="know-your-corporator-container">
      <h1 className="title">The Following will give you knowledge about the Roles and Responsibilities of Your Corporator</h1>
      <img className="image" src={rules} alt="Rules"/>
    </div>
  );
}

export default KnowYourCorporator;
