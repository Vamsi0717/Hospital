import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getDoctors = () => API.get("/doctors/");
export const getHospitals = () => API.get("/hospitals/");
export const getHospitalById = (id) => API.get(`/hospitals/${id}/`);
export const getHealthPackages = () => API.get("/health-packages/");

export const bookAppointment = (data) => API.post("/appointments/", data);

export const createAppointment = (appointmentData) => {
  const payload = {
    name: appointmentData.patient_name,
    email: appointmentData.email,
    phone: appointmentData.phone,
    doctor: appointmentData.doctor_name,
    hospital: appointmentData.hospital_name,
    date: appointmentData.appointment_date,
    time: appointmentData.appointment_time,
    message: appointmentData.reason || "",
  };
  return API.post("/appointments/", payload);
};

export const sendOtp = (phone) => API.post("/otp/send/", { phone });
export const verifyOtp = (phone, code) => API.post("/otp/verify/", { phone, code });

export default API;