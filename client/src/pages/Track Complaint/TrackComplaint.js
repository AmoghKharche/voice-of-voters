import { useState } from 'react';
import { fetchComplaint } from '../../api/api';

function TrackComplaint() {
  const [ticketId, setTicketId] = useState('');

  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const fetchedComplaint = await fetchComplaint(ticketId);
    setComplaint(fetchedComplaint);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ticket ID"
        value={ticketId}
        onChange={e => setTicketId(e.target.value)}
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
