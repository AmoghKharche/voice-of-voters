import { useState, useEffect } from "react";
import { fetchComplaint } from "../../api/api";
import { useNavigate } from "react-router-dom";

function TrackComplaint() {
  const [ticketId, setTicketId] = useState("");

  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchedComplaint = await fetchComplaint(ticketId);
    setComplaint(fetchedComplaint);
  };
  const navigate = useNavigate();
  const callAnnouncements = async () => {
    try {
      const res = await fetch("/track-complaint", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAnnouncements();
  }, []);
  return (
    <div>
      <input
        type="text"
        placeholder="Enter ticket ID"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <button onClick={handleSubmit}>Track</button>
      {complaint ? (
        <div>
          <p>Ticket ID: {complaint.ticketId}</p>
          <p>Complaint: {complaint.complaint}</p>
          <p>Ward: {complaint.ward}</p>
          <p>Tag: {complaint.tag}</p>
          <p>Status: {complaint.status}</p>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default TrackComplaint;
