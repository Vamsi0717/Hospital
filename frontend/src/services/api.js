import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getDoctors = () => {
  return API.get("/doctors");
};

export const getHospitals = () => {
  return API.get("/hospitals");
};

export const getHealthPackages = () => {
  return API.get("/health-packages");
};

export const bookAppointment = (data) => {
  return API.post("/appointments", data);
};

export const createAppointment = (appointmentData) => {
  return API.post("/appointments/", appointmentData);
};

export const getHospitalById = (id) => {
  return API.get(`/hospitals/${id}/`);
};

export default API;