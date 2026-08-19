import React from "react";

import HealthPackageCard
  from "../components/HealthPackageCard";

import packages from "../data/packages";

function HealthPackages() {

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
          Health Check Packages
        </h1>

      </div>


      <section className="px-[5%] py-16">

        <div className="mx-auto max-w-7xl">

          <h2
            className="
              text-center
              text-3xl
              font-bold
              text-[#087f9d]
            "
          >
            Preventive Health Packages
          </h2>

          <p className="mb-10 mt-3 text-center text-gray-500">
            Choose a package that suits your healthcare needs
          </p>


          <div
            className="
              grid
              gap-6

              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            {packages.map((item) => (

              <HealthPackageCard
                key={item.id}
                item={item}
              />

            ))}

          </div>

        </div>

      </section>

    </>
  );
}

export default HealthPackages;