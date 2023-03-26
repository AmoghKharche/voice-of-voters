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
import Logout from "./pages/Logout";
import KnowYourCorporator from "./pages/Home/KnowYourCorporator";
import Mumbai from "./pages/KnowYourWard/Mumbai"
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer/UseReducer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
export const UserContext = createContext();

const Routing = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-complaint" element={<RegisterComplaint />} />
        <Route path="/track-complaint" element={<TrackComplaint />} />
        <Route path="/corporator/login" element={<CorporatorLogin />} />
        <Route path="/corporator/register" element={<CorporatorRegister />} />
        <Route path="/corporator/dashboard" element={<CorporatorDashboard />} />
        <Route path="/ward/mumbai" element={<Mumbai/>}/>
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/knowyourcorporator" element={<KnowYourCorporator/>}/>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routing></Routing>
      </UserContext.Provider>
    </>
  );
}

export default App;
