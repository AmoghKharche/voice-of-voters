import { useState } from "react";
import axios from "axios";

function TrackComplaint() {
  const [ticketId, setTicketId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    try {
      const response = await axios.get(`/complaints/${ticketId}`);
      setComplaint(response.data);
    } catch (error) {
      setError("Invalid ticket ID");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ticket ID"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <button onClick={handleTrack}>Track</button>
      {complaint ? (
        <div>
          <p>Ticket ID: {complaint.ticketId}</p>
          <p>Name: {complaint.name}</p>
          <p>Email: {complaint.email}</p>
          <p>Phone: {complaint.phone}</p>
          <p>Complaint: {complaint.complaint}</p>
          <p>Status: {complaint.status}</p>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default TrackComplaint;
