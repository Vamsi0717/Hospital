import React from "react";

import HospitalCard from "../components/HospitalCard";

import hospitals from "../data/hospitals";

function Hospitals() {

  return (
    <>

      <div
        className="
          flex
          h-56
          items-center
          justify-center
          bg-[#087f9d]
          text-white
        "
      >
        <h1 className="text-4xl font-bold">
          Our Hospitals
        </h1>
      </div>


      <section
        className="
          bg-[#f5f9fa]
          px-[5%]
          py-16
        "
      >

        <div className="mx-auto max-w-7xl">

          <h2
            className="
              text-center
              text-3xl
              font-bold
              text-[#087f9d]
            "
          >
            Find a Hospital
          </h2>

          <p className="mb-10 mt-3 text-center text-gray-500">
            Explore our healthcare facilities
          </p>


          <div
            className="
              grid
              gap-6

              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            {hospitals.map((hospital) => (

              <HospitalCard
                key={hospital.id}
                hospital={hospital}
              />

            ))}

          </div>

        </div>

      </section>

    </>
  );
}

export default Hospitals;