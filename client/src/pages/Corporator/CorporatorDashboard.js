import React, { useEffect, useState } from "react";
import { fetchComplaints } from "../../api/api";
import ComplaintStatusForm from "./ComplaintStatusForm";

const CorporatorDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const getComplaints = async () => {
      const complaints = (await fetchComplaints()) || {};
      setComplaints(complaints);
    };
    getComplaints();
  }, [complaints]);

  return (
    <div>
      <h1>Corporator Dashboard</h1>
      <ComplaintStatusForm complaints={complaints} />
      <h2>Complaints</h2>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Name</th>
            <th>Complaint</th>
            <th>Ward</th>
            <th>Tag</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => {
            return (
              <tr>
                <td>{complaint.ticketId}</td>
                <td>{complaint.name}</td>
                <td>{complaint.complaint}</td>
                <td>{complaint.ward}</td>
                <td>{complaint.tag}</td>
                <td>{complaint.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CorporatorDashboard;
