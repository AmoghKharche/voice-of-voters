import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterComplaint.css";

function RegisterComplaint() {
  const [user, setUser] = useState({
    name: "",
    complaint: "",
    ward: "",
    tag: "",
    address: "",
  });

  const [ticketId, setTicketId] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, complaint, ward, address, tag } = user;

    const res = await fetch("http://localhost:5000/register-complaint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: isAnonymous ? "Anonymous" : name,
        complaint,
        ward,
        address,
        tag,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      window.alert("Complaint Did Not Register");
      console.log("Complaint Did not Register");
    } else {
      // window.alert("Complaint Registered");
      console.log("Complaint Registered");
      setTicketId(data.ticketId);

      console.log(ticketId);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div class="form-body">
          <div className="input-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInput}
              disabled={isAnonymous}
            />
            <div className="anonymous-toggle">
              <label htmlFor="anonymous-toggle">Make anonymous:</label>
              <input
                type="checkbox"
                id="anonymous-toggle"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInput}
            />
          </div>
          <div className="input-field">
            <label htmlFor="complaint">Complaint:</label>
            <textarea
              name="complaint"
              value={user.complaint}
              onChange={handleInput}
            />
          </div>
          <div className="input-field">
            <label htmlFor="ward">Ward:</label>
            <input
              type="number"
              name="ward"
              value={user.ward}
              onChange={handleInput}
            />
          </div>
          <div className="input-field">
            <label htmlFor="tag">Tag:</label>
            <select
              type="text"
              name="tag"
              value={user.tag}
              onChange={handleInput}
            >
              
                <option value="">Select a tag</option>
                <option value="Water Department">Water Department</option>
                <option value="Garbage Department">Garbage Department</option>
                <option value="Electricity Department">Electricity Department</option>
                <option value="Roads Department">Roads Department</option>
                <option value="Other"> Other</option>
              </select></div>
          
              <label for="image">Image:</label>
              <input type="file" id="image" name="image" accept="image/*" />
          
              <input type="submit" value="Submit"></input>
          <div className="ticket"> 
                {ticketId && <p>Ticket ID: {ticketId}</p>}</div>
        </div>
      </form>
    </>
  );
}

export default RegisterComplaint;

    // const navigate = useNavigate("");
    // let data;
    // const callAnnouncements = async () => {
    //   try {
    //     const res = await fetch("/register-complaint", {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       credentials: "include",
    //     });
  
    //     data = await res.json();
    //     console.log(" d", data);
  
    //     if (res.status !== 200) {
    //       const error = new Error(res.error);
    //       throw error;
    //     }
    //   } catch (err) {
    //     console.log("err: ", err);
    //     if (data.status == 401) {
    //       alert("not logged in");
    //     }
    //     navigate("/login");
    //   }
    // };
  
    // useEffect(() => {
    //   callAnnouncements();
    // }, []);