import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserContext } from "../../App";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function Login() {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [voterid, setVoterid] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voterid,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 401) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successful");
      window.location.href = "/";
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100 ">
        <MDBCol col="12">
          <MDBCard
            className="bg-white text-dark my-5 mx-auto border-0 no-borderr"
            style={{ maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase heading">Login</h2>
              <p className="text-dark-50 mt-5 mb-5">
                Please enter your Voter Id and password!
              </p>

              <form method="POST">
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-dark"
                  label="Voter ID"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  name="voterid"
                  value={voterid}
                  onChange={(e) => setVoterid(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-dark"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MDBBtn
                  color="dark"
                  className="login-button"
                  color="warning"
                  onClick={loginUser}
                >
                  LOGIN
                </MDBBtn>
                <div>
                  <p className="mb-0 already">
                    Don't have an account?{" "}
                    <Link to="/signup" class="text-dark-50 fw-bold">
                      Register
                    </Link>
                  </p>
                </div>
                <div>
                  <p className="mb-0 already">
                    Corporator?{" "}
                    <Link
                      to="/corporator/register"
                      class="text-dark-50 fw-bold"
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
