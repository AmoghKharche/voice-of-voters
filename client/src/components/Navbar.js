import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../assets/logo png.png";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-box ">
      <div className="container-fluid  ">
        <Link to="/">
          <img src={logo} className="weblogo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item stroke">
              <Link
                to="/"
                className="nav-link active hover-underline-animation"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item stroke">
              <Link
                to="/announcements"
                className="nav-link hover-underline-animation"
              >
                Announcements
              </Link>
            </li>
            <li className="nav-item stroke">
              <Link
                to="/register-complaint"
                className="nav-link hover-underline-animation"
              >
                Register Complaint
              </Link>
            </li>
            <li className="nav-item stroke">
              <Link
                to="/track-complaint"
                className="nav-link hover-underline-animation"
              >
                Track Complaint
              </Link>
            </li>
            <li className="nav-item stroke">
              <Link to="/login" className="nav-link hover-underline-animation">
                Login
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/signup" className="nav-link hover-underline-animation">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
