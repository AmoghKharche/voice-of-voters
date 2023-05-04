import React from "react";
import { useState } from "react";
import "./CorporatorLogin.css";

function CorporatorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ward, setWard] = useState("");

  const handleCorporator = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/corporator/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ward,
        email,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 401) {
      window.alert("Invalid Credentials");
    } else {
      window.alert("Login Successful");
      window.location.href = "/corporator/dashboard";
    }
  };
  return (
    <div>
      <form class="login-form" method="POST" onSubmit={handleCorporator}>
        <h2>Corporator Login</h2>
        <div class="form-group">
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
            type="number"
            id="ward"
            name="ward"
            required
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default CorporatorLogin;
