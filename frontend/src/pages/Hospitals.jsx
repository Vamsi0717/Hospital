import React, { useEffect, useState } from "react";

import HospitalCard from "../components/HospitalCard";

import { getHospitals } from "../services/api";

function Hospitals() {

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {

    const fetchHospitals = async () => {

      try {

        const response = await getHospitals();
        setHospitals(response.data);

      } catch (error) {

        console.error(error);
        setErrorMsg("Unable to load hospitals right now. Please try again later.");

      } finally {

        setLoading(false);

      }

    };

    fetchHospitals();

  }, []);

  return (
    <>

      <div className="flex h-56 items-center justify-center bg-[#087f9d] text-white">
        <h1 className="text-4xl font-bold">Our Hospitals</h1>
      </div>

      <section className="bg-[#f5f9fa] px-[5%] py-16">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-3xl font-bold text-[#087f9d]">
            Find a Hospital
          </h2>

          <p className="mb-10 mt-3 text-center text-gray-500">
            Explore our healthcare facilities
          </p>

          {loading && (
            <p className="text-center text-gray-500">Loading hospitals...</p>
          )}

          {!loading && errorMsg && (
            <p className="text-center text-red-600">{errorMsg}</p>
          )}

          {!loading && !errorMsg && hospitals.length === 0 && (
            <p className="text-center text-gray-500">No hospitals found.</p>
          )}

          {!loading && !errorMsg && hospitals.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {hospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}

            </div>
          )}

        </div>

      </section>

    </>
  );
}

export default Hospitals;