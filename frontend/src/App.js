import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";



import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import FloatingActions from "./components/FloatingActions";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Hospitals from "./pages/Hospitals";
import Specialties from "./pages/Specialties";
import HealthPackages from "./pages/HealthPackages";
import Appointment from "./pages/Appointment";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Payment from "./pages/Payment";
import HospitalDetail from "./pages/HospitalDetail";
import InternationalPatients from "./pages/InternationalPatients";
import Resources from "./pages/Resources";

function App() {
  return (
    <div className="min-h-screen bg-white">

      <TopBar />

      <Header />

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/doctors"
          element={<Doctors />}
        />

        <Route
          path="/hospitals"
          element={<Hospitals />}
        />

        <Route
          path="/specialties"
          element={<Specialties />}
        />

        <Route
          path="/health-packages"
          element={<HealthPackages />}
        />

        <Route
          path="/appointment"
          element={<Appointment />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route path="/payment" element={<Payment />} />

        <Route
          path="/hospitals/:id"
          element={<HospitalDetail />}
        />

        <Route
          path="/international-patients"
          element={<InternationalPatients />}
        />


        <Route
          path="/resources"
          element={<Resources />}
        />

        



      </Routes>



      <FloatingActions />

      <Footer />

    </div>
  );
}

export default App;