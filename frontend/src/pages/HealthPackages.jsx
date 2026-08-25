import React, { useEffect, useState } from "react";

import HealthPackageCard from "../components/HealthPackageCard";

import { getHealthPackages } from "../services/api";

function HealthPackages() {

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {

    const fetchPackages = async () => {

      try {

        const response = await getHealthPackages();
        setPackages(response.data);

      } catch (error) {

        console.error(error);
        setErrorMsg("Unable to load health packages right now. Please try again later.");

      } finally {

        setLoading(false);

      }

    };

    fetchPackages();

  }, []);

  return (
    <>

      <div className="flex h-56 items-center justify-center bg-[#087f9d] text-white">
        <h1 className="text-4xl font-bold">Health Check Packages</h1>
      </div>

      <section className="px-[5%] py-16">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-3xl font-bold text-[#087f9d]">
            Preventive Health Packages
          </h2>

          <p className="mb-10 mt-3 text-center text-gray-500">
            Choose a package that suits your healthcare needs
          </p>

          {loading && (
            <p className="text-center text-gray-500">Loading packages...</p>
          )}

          {!loading && errorMsg && (
            <p className="text-center text-red-600">{errorMsg}</p>
          )}

          {!loading && !errorMsg && packages.length === 0 && (
            <p className="text-center text-gray-500">No health packages found.</p>
          )}

          {!loading && !errorMsg && packages.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {packages.map((item) => (
                <HealthPackageCard key={item.id} item={item} />
              ))}

            </div>
          )}

        </div>

      </section>

    </>
  );
}

export default HealthPackages;