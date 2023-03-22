import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Announcements() {
  const navigate = useNavigate();
  const callAnnouncements = async () => {
    try {
      const res = await fetch("/announcements", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (!res.status === 200) {
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
      <form method="GET">Hello World</form>
    </div>
  );
}

export default Announcements;
