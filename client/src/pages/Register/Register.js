import React, { useState } from "react";

function Register() {
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

    const res = await fetch("/signup", {
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
    if (data.status === 404 || !data) {
      window.alert("Registration Failed as VoterId not found");
      console.log("Registration Failed as VoterId not found");
    } else if (data.status === 422 || !data) {
      window.alert("Fill all the details");
    } else if (data.status === 400 || !data) {
      window.alert("Registration Failed as VoterId or Name did not match");
      console.log("Registration Failed as VoterId or Name did not match");
    } else {
      window.alert("Registration Succesful");
      console.log("Registration Succesful");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleInput}
          required
        />
      </div>
      <div>
        <label htmlFor="ward">Ward Number:</label>
        <input
          type="number"
          id="ward"
          name="ward"
          value={user.wardNumber}
          onChange={handleInput}
          required
        />
      </div>
      <div>
        <label htmlFor="voterid">Voter ID:</label>
        <input
          type="text"
          id="voterid"
          name="voterid"
          value={user.voterid}
          onChange={handleInput}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleInput}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleInput}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Register;
