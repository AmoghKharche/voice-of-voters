import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Announcements.css"
import Ward40 from "./Ward40"
import Ward41 from "./Ward41"
import Ward42 from "./Ward42"
function Announcements() {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState('Option 1');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Ward 40':
        return <Ward40/>;
      case 'Ward 41':
        return <Ward41/>
      case 'Ward 42':
        return <Ward42/>
      default:
        return null;
    }
  };

  // const callAnnouncements = async () => {
  //   try {
  //     const res = await fetch('/announcements', {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //     });

  //     const data = await res.json();
  //     console.log(data);
  //     if (res.status !== 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     navigate('/login');
  //   }
  // };

  // useEffect(() => {
  //   callAnnouncements();
  // }, []);

  const options = ['Select','Ward 40', 'Ward 41', 'Ward 42','Ward 43','Ward 44','Ward 45','Ward 46','Ward 47'];

  return (
    <div className="ward-field">
      <h1>Select Your Ward:</h1>
      <select value={selectedOption} onChange={handleOptionChange} >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {renderContent()}
    </div>
  );
}

export default Announcements;
