import React from "react";

import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import DoctorCard from "../components/DoctorCard";
import HospitalCard from "../components/HospitalCard";
import HealthPackageCard from "../components/HealthPackageCard";

import doctors from "../data/doctors";
import hospitals from "../data/hospitals";
import packages from "../data/packages";

function Home() {

  return (
    <>

      <Hero />


      {/* SERVICES */}

      <section
        className="
          bg-[#f7fafb]
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
            Healthcare Services
          </h2>

          <p
            className="
              mb-10
              mt-3
              text-center
              text-gray-500
            "
          >
            Everything you need for your healthcare journey
          </p>


          <div
            className="
              grid
              gap-5

              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            <ServiceCard
              icon="👨‍⚕️"
              title="Find a Doctor"
              description="Find experienced doctors and specialists."
            />

            <ServiceCard
              icon="🏥"
              title="Find a Hospital"
              description="Find hospitals near your location."
            />

            <ServiceCard
              icon="📅"
              title="Book Appointment"
              description="Schedule an appointment with a doctor."
            />

            <ServiceCard
              icon="❤️"
              title="Health Checkup"
              description="Choose from preventive health packages."
            />

          </div>

        </div>

      </section>


      {/* DOCTORS */}

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
            Our Doctors
          </h2>

          <p
            className="
              mb-10
              mt-3
              text-center
              text-gray-500
            "
          >
            Meet our experienced healthcare specialists
          </p>


          <div
            className="
              grid
              gap-6

              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            {doctors.map((doctor) => (

              <DoctorCard
                key={doctor.id}
                doctor={doctor}
              />

            ))}

          </div>

        </div>

      </section>


      {/* HOSPITALS */}

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
            Our Hospitals
          </h2>

          <p
            className="
              mb-10
              mt-3
              text-center
              text-gray-500
            "
          >
            Quality healthcare across multiple locations
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


      {/* PACKAGES */}

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
            Health Check Packages
          </h2>

          <p
            className="
              mb-10
              mt-3
              text-center
              text-gray-500
            "
          >
            Take control of your health with preventive screening
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

export default Home;