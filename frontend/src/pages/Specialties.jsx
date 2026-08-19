import React from "react";

const specialties = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Oncology",
  "Gastroenterology",
  "Nephrology",
  "Pediatrics",
  "Dermatology",
  "Urology",
  "Pulmonology",
  "ENT",
  "General Medicine",
];

function Specialties() {

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
          Centres of Excellence
        </h1>

      </div>


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
            Our Specialties
          </h2>

          <p className="mb-10 mt-3 text-center text-gray-500">
            Specialized medical care from experienced teams
          </p>


          <div
            className="
              grid
              gap-5

              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            "
          >

            {specialties.map((specialty) => (

              <div
                key={specialty}
                className="
                  rounded-lg
                  bg-white
                  p-7
                  text-center
                  shadow-card
                  transition
                  hover:-translate-y-1
                "
              >

                <div className="mb-4 text-4xl">
                  🩺
                </div>

                <h3
                  className="
                    mb-3
                    font-bold
                    text-[#087f9d]
                  "
                >
                  {specialty}
                </h3>

                <p className="text-sm text-gray-500">
                  Advanced diagnosis and treatment
                  by experienced specialists.
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

    </>
  );
}

export default Specialties;