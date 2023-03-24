import "./App.css";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Announcements from "./pages/Announcements/Announcements";
import RegisterComplaint from "./pages/Register Complaint/RegisterComplaint";
import TrackComplaint from "./pages/Track Complaint/TrackComplaint";
import CorporatorLogin from "./pages/Corporator/CorporatorLogin";
import CorporatorRegister from "./pages/Corporator/CorporatorRegister";
import CorporatorDashboard from "./pages/Corporator/CorporatorDashboard";
import Login from "./pages/Login/Login";

import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-complaint" element={<RegisterComplaint />} />
            <Route path="/track-complaint" element={<TrackComplaint />} />
            <Route path="/corporator/login" element={<CorporatorLogin />} />
            <Route
              path="/corporator/register"
              element={<CorporatorRegister />}
            />
            <Route
              path="/corporator/dashboard"
              element={<CorporatorDashboard />}
            />

            <Route path="/announcements" element={<Announcements />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
