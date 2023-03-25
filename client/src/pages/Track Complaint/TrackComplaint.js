
import { useState } from "react";
import { fetchComplaint } from "../../api/api";
import "./TrackComplaint.css";

function TrackComplaint() {
  const [ticketId, setTicketId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchedComplaint = await fetchComplaint(ticketId);
    setComplaint(fetchedComplaint);
    setError("");
  };

  return (
    <div className="track-complaint-container">
      <h2>Track Complaint</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ticketId">Enter Ticket ID:</label>
        <input
          id="ticketId"
          type="text"
          placeholder="e.g. fHyn23"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />
        <button>Track</button>
      </form>
      {complaint && (
        <div className="complaint-details">
          <p><strong>Ticket ID:</strong> {complaint.ticketId}</p>
          <p><strong>Complaint:</strong> {complaint.complaint}</p>
          <p><strong>Ward:</strong> {complaint.ward}</p>
          <p><strong>Tag:</strong> {complaint.tag}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
        </div>
      )}
      {error && (
        <p className="error-message">Error: {error}</p>
      )}
    </div>
  );
}

export default TrackComplaint;