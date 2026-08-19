const axios = require("axios");

const doctors = require("../src/data/doctors").default;
const hospitals = require("../src/data/hospitals").default;
const packages = require("../src/data/packages").default;

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

async function seedDoctors() {
  for (const doc of doctors) {
    const { id, ...payload } = doc; // don't send the local id, let DB assign one
    try {
      await API.post("/doctors/", payload);
      console.log(`Doctor added: ${doc.name}`);
    } catch (err) {
      console.error(`Failed to add doctor ${doc.name}:`, err.response?.data || err.message);
    }
  }
}

async function seedHospitals() {
  for (const hosp of hospitals) {
    const { id, ...payload } = hosp;
    try {
      await API.post("/hospitals/", payload);
      console.log(`Hospital added: ${hosp.name}`);
    } catch (err) {
      console.error(`Failed to add hospital ${hosp.name}:`, err.response?.data || err.message);
    }
  }
}

async function seedHealthPackages() {
  for (const pkg of packages) {
    const { id, ...payload } = pkg;
    try {
      await API.post("/health-packages/", payload);
      console.log(`Package added: ${pkg.name}`);
    } catch (err) {
      console.error(`Failed to add package ${pkg.name}:`, err.response?.data || err.message);
    }
  }
}

async function run() {
  await seedDoctors();
  await seedHospitals();
  await seedHealthPackages();
  console.log("Seeding complete!");
}

run();