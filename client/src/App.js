import "./App.css";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Announcements from "./pages/Announcements/Announcements";
import RegisterComplaint from "./pages/Register Complaint/RegisterComplaint";
import TrackComplaint from "./pages/Track Complaint/TrackComplaint";
import Corporator from "./pages/Corporator/Corporator";
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
            <Route path="/register" element={<Register />} />
            <Route path="/register-complaint" element={<RegisterComplaint />} />
            <Route path="/track-complaint" element={<TrackComplaint />} />
            <Route path="/corporator" element={<Corporator />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
