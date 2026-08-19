
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createAppointment } from "../services/api";

const HospitalDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hospital = location.state?.hospital || {
    name: "Apollo Hospital",
    location: "Hyderabad",
    address: "Jubilee Hills, Hyderabad",
    phone: "+91 40 2360 7777",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    specialties: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "General Medicine",
    ],
  };

  const [formData, setFormData] = useState({
    patient_name: "",
    email: "",
    phone: "",
    doctor_name: "",
    hospital_name: hospital.name || "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await createAppointment(formData);

      console.log("Appointment saved:", response.data);

      setMessage("Appointment booked successfully!");

      setFormData({
        patient_name: "",
        email: "",
        phone: "",
        doctor_name: "",
        hospital_name: hospital.name || "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
      });
    } catch (err) {
      console.error("Appointment booking error:", err);

      if (err.response?.data) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Unable to book appointment. Please check your details."
        );
      } else {
        setError(
          "Unable to connect to the backend. Please make sure Django is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const getDirection = () => {
    const address = encodeURIComponent(
      `${hospital.name}, ${hospital.address || hospital.location}`
    );

    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                         text-slate-700 font-medium
                         hover:bg-slate-100 transition duration-200"
            >
              <span className="text-xl">←</span>
              Back
            </button>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              Hospital Details
            </h1>

            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hospital Hero */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Hospital Image */}
            <div className="h-64 sm:h-80 lg:h-full min-h-[400px]">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hospital Information */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">

              <div className="inline-flex w-fit items-center px-3 py-1 mb-4
                              rounded-full bg-blue-50 text-blue-700
                              text-sm font-semibold">
                🏥 Trusted Hospital
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {hospital.name}
              </h2>

              <div className="space-y-3 text-slate-600">

                <p className="flex items-start gap-3">
                  <span className="text-lg">📍</span>
                  <span>
                    <strong className="text-slate-800">Location:</strong>{" "}
                    {hospital.location}
                  </span>
                </p>

                <p className="flex items-start gap-3">
                  <span className="text-lg">🏢</span>
                  <span>
                    <strong className="text-slate-800">Address:</strong>{" "}
                    {hospital.address}
                  </span>
                </p>

                <p className="flex items-center gap-3">
                  <span className="text-lg">⭐</span>
                  <span>
                    <strong className="text-slate-800">Rating:</strong>{" "}
                    {hospital.rating || "4.5"} / 5
                  </span>
                </p>

                <p className="flex items-center gap-3">
                  <span className="text-lg">📞</span>
                  <span>
                    <strong className="text-slate-800">Phone:</strong>{" "}
                    {hospital.phone}
                  </span>
                </p>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-7">

                <a
                  href={`tel:${hospital.phone}`}
                  className="flex-1 text-center px-5 py-3
                             bg-blue-600 text-white rounded-xl
                             font-semibold hover:bg-blue-700
                             transition duration-200 shadow-sm"
                >
                  📞 Call Hospital
                </a>

                <a
                  href={getDirection()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-5 py-3
                             bg-slate-100 text-slate-800 rounded-xl
                             font-semibold hover:bg-slate-200
                             transition duration-200"
                >
                  📍 Get Direction ↗
                </a>

              </div>
            </div>
          </div>
        </section>

        {/* Specialties */}
        <section className="mt-10">

          <div className="mb-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Available Specialties
            </h2>

            <p className="text-slate-500 mt-2">
              Explore the medical specialties available at this hospital.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {hospital.specialties?.map((specialty, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200
                           rounded-xl p-5 shadow-sm
                           hover:shadow-md hover:-translate-y-1
                           transition duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-blue-50
                                flex items-center justify-center
                                text-xl mb-4">
                  🩺
                </div>

                <h3 className="font-semibold text-slate-800">
                  {specialty}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Expert medical care
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* Appointment Section */}
        <section className="mt-10 mb-10">

          <div className="bg-white rounded-2xl shadow-sm
                          border border-slate-200 overflow-hidden">

            {/* Appointment Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600
                            px-6 sm:px-8 py-7 text-white">

              <h2 className="text-2xl sm:text-3xl font-bold">
                Book an Appointment
              </h2>

              <p className="mt-2 text-blue-50">
                Fill in your details and select your preferred
                appointment date and time.
              </p>

            </div>

            <div className="p-6 sm:p-8">

              {/* Success Message */}
              {message && (
                <div className="mb-6 rounded-xl bg-green-50
                                border border-green-200
                                text-green-700 px-4 py-3
                                font-medium">
                  ✅ {message}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 rounded-xl bg-red-50
                                border border-red-200
                                text-red-700 px-4 py-3
                                font-medium">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Patient Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label
                      htmlFor="patient_name"
                      className="block text-sm font-semibold
                                 text-slate-700 mb-2"
                    >
                      Patient Name
                    </label>

                    <input
                      id="patient_name"
                      type="text"
                      name="patient_name"
                      value={formData.patient_name}
                      onChange={handleChange}
                      placeholder="Enter patient name"
                      required
                      className="w-full px-4 py-3 rounded-xl
                                 border border-slate-300
                                 outline-none
                                 focus:ring-2 focus:ring-blue-500
                                 focus:border-blue-500
                                 transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold
                                 text-slate-700 mb-2"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                      className="w-full px-4 py-3 rounded-xl
                                 border border-slate-300
                                 outline-none
                                 focus:ring-2 focus:ring-blue-500
                                 focus:border-blue-500
                                 transition"
                    />
                  </div>

                </div>

                {/* Phone + Doctor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold
                                 text-slate-700 mb-2"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      className="w-full px-4 py-3 rounded-xl
                                 border border-slate-300
                                 outline-none
                                 focus:ring-2 focus:ring-blue-500
                                 focus:border-blue-500
                                 transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="doctor_name"
                      className="block text-sm font-semibold
                                 text-slate-700 mb-2"
                    >
                      Doctor Name
                    </label>

                    <input
                      id="doctor_name"
                      type="text"
                      name="doctor_name"
                      value={formData.doctor_name}
                      onChange={handleChange}
                      placeholder="Enter doctor name"
                      required
                      className="w-full px-4 py-3 rounded-xl
                                 border border-slate-300
                                 outline-none
                                 focus:ring-2 focus:ring-blue-500
                                 focus:border-blue-500
                                 transition"
                    />
                  </div>

                </div>

                {/* Hospital */}
                <div>
                  <label
                    htmlFor="hospital_name"
                    className="block text-sm font-semibold
                               text-slate-700 mb-2"
                  >
                    Hospital
                  </label>

                  <input
                    id="hospital_name"
                    type="text"
                    name="hospital_name"
                    value={formData.hospital_name}
                    onChange={handleChange}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl
                               border border-slate-300
                               bg-slate-100 text-slate-600
                               cursor-not-allowed"
                  />
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label
                      htmlFor="appointment_date"
                      className="block text-sm font-semibold
                                 text-slate-700 mb-2"
                    >
                      Appointment Date
                    </label>

                    <input
                      id="appointment_date"
                      type="date"
                      name="appointment_date"
                      value={formData.appointment_date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl
                                 border border-slate-300
                                 outline-none
                                 focus:ring-2 focus:ring-blue-500
                                 focus:border-blue-500
                                 transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="appointment_time"
                      className="block text-sm font-semibold
                                 text-slate-700 mb-2"
                    >
                      Appointment Time
                    </label>

                    <input
                      id="appointment_time"
                      type="time"
                      name="appointment_time"
                      value={formData.appointment_time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl
                                 border border-slate-300
                                 outline-none
                                 focus:ring-2 focus:ring-blue-500
                                 focus:border-blue-500
                                 transition"
                    />
                  </div>

                </div>

                {/* Reason */}
                <div>
                  <label
                    htmlFor="reason"
                    className="block text-sm font-semibold
                               text-slate-700 mb-2"
                  >
                    Reason for Appointment
                  </label>

                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Enter reason for appointment"
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl
                               border border-slate-300
                               outline-none resize-none
                               focus:ring-2 focus:ring-blue-500
                               focus:border-blue-500
                               transition"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl
                             bg-blue-600 text-white
                             font-bold text-lg
                             hover:bg-blue-700
                             active:scale-[0.99]
                             disabled:bg-blue-300
                             disabled:cursor-not-allowed
                             transition duration-200
                             shadow-lg shadow-blue-100"
                >
                  {loading ? "⏳ Booking..." : "📅 Book Appointment"}
                </button>

              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2026 Hospital Appointment System. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HospitalDetail;

