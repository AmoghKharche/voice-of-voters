// ComplaintStatusForm.js

import React, { useState } from "react";
import { updateStatus } from "../../api/api";

const ComplaintStatusForm = ({ complaints }) => {
  const [selectedComplaintTicketId, setSelectedComplaintTicketId] =
    useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await updateStatus(selectedComplaintTicketId, selectedStatus);
    console.log(
      "🚀 ~ file: ComplaintStatusForm.js:13 ~ handleSubmit ~ res:",
      res
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select a complaint:
        <select
          value={selectedComplaintTicketId}
          onChange={(event) => setSelectedComplaintTicketId(event.target.value)}
        >
          <option value="">-- Select --</option>
          {complaints.length > 0 &&
            complaints.map((complaint) => (
              <option key={complaint.ticketId} value={complaint.ticketId}>
                {complaint.name}
              </option>
            ))}
        </select>
      </label>
      <label>
        Status:
        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>
      <button type="submit">Update Status</button>
    </form>
  );
};

export default ComplaintStatusForm;
