import "./App.css";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Feedback from "./pages/Feedback/Feedback";
import TrackComplaint from "./pages/TrackComplaint/TrackComplaint";
import RegisterAComplaint from "./pages/RegisterAComplaint/RegisterAComplaint";
import Navbar from "./components/Header/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/track-complaint" element={<TrackComplaint />} />
            <Route
              path="/register-a-complaint"
              element={<RegisterAComplaint />}
            />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
