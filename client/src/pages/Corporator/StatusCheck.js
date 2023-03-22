import React from "react";
import { useState } from "react";

function StatusCheck() {
  const [user, setUser] = useState({
    name: "",
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
    const { text } = user;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Text:
          <input
            type="text"
            name="text"
            value={user.text}
            onChange={handleInput}
          />
        </label>

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StatusCheck;
