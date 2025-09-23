
import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import NextPage from "./components/NextPage";
import Dashboard from "./pages/Dashboard";
import StaffSalary from "./pages/StaffSalary";
import Work from "./pages/Work";
import LearnMore from "./components/LearnMore";

import AdminWork from "./pages/AdminWork";
import OwnerProfile from "./pages/OwnerProfile";
import Managementwork from "./pages/Managementwork";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={ <Dashboard />} />
      <Route path="/Management-work" element={ <Managementwork />} />
      <Route path="/Staff-Work"element={<Work/>}/>
      <Route path="/Next" element={<NextPage/>}/>
     <Route path="/learn-more" element={<LearnMore />} />
      <Route path="/Staff-Salary"  element={<StaffSalary/>}/>
      <Route path="/Admin-Work" element={<AdminWork/>}/>
      <Route path="/OwnerProfile" element={<OwnerProfile/>}/>
    </Routes>
  );
};

export default App;
