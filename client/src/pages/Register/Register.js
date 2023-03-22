import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./Register.css";
import { Link } from "react-router-dom";
import registerlogo from "../../assets/register.jpg";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    ward: "",
    voterid: "",
    password: "",
  });
  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, voterid, ward, password } = user;

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        voterid,
        ward,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 404) {
      window.alert("Registration Failed as VoterId not found");
      console.log("Registration Failed as VoterId not found");
    } else if (res.status === 422) {
      window.alert("Fill all the details");
    } else if (res.status === 400) {
      window.alert("Registration Failed as VoterId or Name did not match");
      console.log("Registration Failed as VoterId or Name did not match");
    } else {
      window.alert("Registration Succesful");
      console.log("Registration Succesful");
      navigate("/login");
    }
  };
  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5 border-0 no-borderr">
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
              id="form-card"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Register
              </p>

              <form action="post" onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    id="form1"
                    type="text"
                    className="w-100"
                    name="name"
                    value={user.name}
                    onChange={handleInput}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form2"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon
                    fas
                    icon="fa-sharp fa-solid fa-warehouse"
                    size="lg"
                    className="ward"
                  />
                  <MDBInput
                    label="Ward Number"
                    id="form4"
                    type="text"
                    name="ward"
                    value={user.ward}
                    onChange={handleInput}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon
                    fas
                    icon="person-booth"
                    size="lg"
                    className="voterid"
                  />
                  <MDBInput
                    label="VoterID"
                    id="form4"
                    type="text"
                    name="voterid"
                    value={user.voterid}
                    onChange={handleInput}
                  />
                </div>
                <MDBBtn className="mb-4" size="lg" color="warning">
                  Register
                </MDBBtn>
              </form>

              <div className="already-registered-row">
                <Link to="/login" className="already-registered">
                  Already Registerd? Login Here
                </Link>
              </div>
            </MDBCol>
            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage src={registerlogo} className="registerlogo" fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
