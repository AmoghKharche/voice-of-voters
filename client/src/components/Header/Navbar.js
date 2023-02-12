import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import weblogo from "../Header/weblogo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-box ">
      <div className="container-fluid  ">
        <Link to="/">
          <img src={weblogo} className="weblogo" />
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
                to="/home"
                className="nav-link active hover-underline-animation"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item stroke">
              <Link
                to="/feedback"
                className="nav-link hover-underline-animation"
              >
                Feedback
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/register-a-complaint"
                className="nav-link dropdown-toggle "
                role="button"
                id="navbarDropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Complaints
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link to="/register-a-complaint" className="dropdown-item ">
                    Register Complaint
                  </Link>
                </li>
                <li>
                  <Link to="/track-complaint" className="dropdown-item ">
                    Track your Complaint
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item stroke">
              <Link to="/login" className="nav-link hover-underline-animation">
                Login
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to="/register"
                className="nav-link hover-underline-animation"
              >
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
