import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplaintStatusForm from "./ComplaintStatusForm";

const CorporatorDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await axios.get("/api/register-complaint");
      setComplaints(response.data);
    };
    fetchComplaints();
  }, []);

  return (
    <div>
      <h1>Corporator Dashboard</h1>
      <ComplaintStatusForm complaints={complaints} />
      <h2>Complaints</h2>
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Complaint Description</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.ticketId}>
              <td>{complaint.ticketId}</td>
              <td>{complaint.complaint}</td>
              <td>{complaint.address}</td>
              <td>{complaint.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CorporatorDashboard;
