import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./CorporatorLogin.css";

function CorporatorRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ward, setWard] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCorporator = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/corporator/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        ward,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 404) {
      window.alert("Registration Failed as Name not found");
      console.log("Registration Failed as Name not found");
    } else if (res.status === 422) {
      window.alert("Fill all the details");
    } else if (res.status === 400) {
      window.alert("Registration Failed as Ward or Name did not match");
      console.log("Registration Failed as Ward or Name did not match");
    } else {
      window.alert("Registration Succesful");
      console.log("Registration Succesful");
      navigate("/corporator/login");
    }
  };
  return (
    <div>
      <form class="login-form" method="POST" onSubmit={handleCorporator}>
        <h2>Corporator Registration</h2>
        <div class="form-group">
          <label for="email">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="ward">Ward:</label>
          <input
            type="text"
            id="ward"
            name="ward"
            required
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        <div className="already-registered-row">
          <Link to="/corporator/login" className="already-registered">
            Login Here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CorporatorRegister;
