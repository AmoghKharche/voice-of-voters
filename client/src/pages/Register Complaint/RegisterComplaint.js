import React from "react";
import { useState } from "react";

function RegisterComplaint() {
  const [user, setUser] = useState({
    name: "",
    complaint: "",
    ward: "",
    tag: "",
    address: "",
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
    const { name, complaint, ward, address, tag } = user;

    const res = await fetch("/register-complaint", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        complaint,
        ward,
        address,
        tag,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Complaint Did Not Register");
      console.log("Complaint Did not Register");
    } else {
      window.alert("Complaint Registered");
      console.log("Complaint Registered");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInput}
        />
      </label>
      <br />
      <label>
        Complaint:
        <textarea
          name="complaint"
          value={user.complaint}
          onChange={handleInput}
        />
      </label>
      <br />

      <label>
        Ward:
        <input
          type="number"
          name="ward"
          value={user.ward}
          onChange={handleInput}
        />
      </label>
      <br />
      <label>
        Tag:
        <input type="text" name="tag" value={user.tag} onChange={handleInput} />
      </label>
      <br />
      <label>
        Address:
        <textarea name="address" value={user.address} onChange={handleInput} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegisterComplaint;
