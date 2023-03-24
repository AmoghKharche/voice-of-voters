// ComplaintStatusForm.js

import React, { useState } from "react";
import axios from "axios";

const ComplaintStatusForm = ({ complaints }) => {
  const [selectedComplaintId, setSelectedComplaintId] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `/api/register-complaint/${selectedComplaintId}/status`,
        { status }
      );
      alert("Status updated successfully");
    } catch (error) {
      alert("Failed to update status");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select a complaint:
        <select
          value={selectedComplaintId}
          onChange={(event) => setSelectedComplaintId(event.target.value)}
        >
          <option value="">-- Select --</option>
          {complaints.map((complaint) => (
            <option key={complaint.ticketId} value={complaint.id}>
              {complaint.complaint}
            </option>
          ))}
        </select>
      </label>
      <label>
        Status:
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>
      <button type="submit">Update Status</button>
    </form>
  );
};

export default ComplaintStatusForm;
