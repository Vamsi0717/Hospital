import React from "react";

function About() {

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
          About Us
        </h1>

      </div>


      <section className="px-[5%] py-20">

        <div className="mx-auto max-w-4xl text-center">

          <h2
            className="
              mb-5
              text-3xl
              font-bold
              text-[#087f9d]
            "
          >
            About Medicare Healthcare
          </h2>

          <p className="leading-8 text-gray-600">

            Medicare Healthcare is a fictional healthcare
            brand created for this React.js project.

            The platform demonstrates a modern healthcare
            website experience with doctors, hospitals,
            specialties, health packages and appointment
            booking.

          </p>

        </div>

      </section>

    </>
  );
}

export default About;