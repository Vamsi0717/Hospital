import React from "react";
import { Link } from "react-router-dom";

function InternationalPatients() {
  return (
    <div className="bg-[#f7fafb]">

      {/* Hero */}

      <section
        className="
          flex
          min-h-[360px]
          items-center
          justify-center
          bg-[#087f9d]
          px-[5%]
          text-center
          text-white
        "
      >
        <div className="max-w-4xl">

          <p
            className="
              mb-4
              text-lg
              font-semibold
              text-[#ffd000]
            "
          >
            WORLD-CLASS HEALTHCARE
          </p>

          <h1
            className="
              text-4xl
              font-bold
              md:text-5xl
            "
          >
            International Patients
          </h1>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-white/90
            "
          >
            Medicare Healthcare provides comprehensive
            medical care and personalized support for
            patients travelling from around the world.
          </p>

        </div>
      </section>


      {/* Services */}

      <section className="px-[5%] py-16">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">

            <h2
              className="
                text-3xl
                font-bold
                text-[#075b70]
              "
            >
              International Patient Services
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              From your first enquiry to your recovery,
              our team is here to support your healthcare journey.
            </p>

          </div>


          <div
            className="
              grid
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            <ServiceCard
              title="Medical Consultation"
              description="Connect with experienced specialists and receive guidance about your treatment options."
              icon="🩺"
            />

            <ServiceCard
              title="Visa Assistance"
              description="Get guidance and supporting documentation for your medical travel requirements."
              icon="📋"
            />

            <ServiceCard
              title="Travel Assistance"
              description="Information and support for travel, accommodation and local transportation."
              icon="✈️"
            />

            <ServiceCard
              title="Airport Assistance"
              description="We help international patients coordinate their arrival and hospital visit."
              icon="🚕"
            />

            <ServiceCard
              title="Language Support"
              description="Our international patient team can help coordinate communication during your care."
              icon="🌎"
            />

            <ServiceCard
              title="Follow-up Care"
              description="Continue receiving appropriate medical guidance after your treatment."
              icon="❤️"
            />

          </div>

        </div>

      </section>


      {/* How it works */}

      <section className="bg-white px-[5%] py-16">

        <div className="mx-auto max-w-6xl">

          <h2
            className="
              text-center
              text-3xl
              font-bold
              text-[#075b70]
            "
          >
            How It Works
          </h2>


          <div
            className="
              mt-10
              grid
              gap-8
              md:grid-cols-4
            "
          >

            <Step
              number="01"
              title="Send Your Enquiry"
              text="Tell us about your medical requirement."
            />

            <Step
              number="02"
              title="Medical Review"
              text="Our team reviews your requirement and connects you with the right specialist."
            />

            <Step
              number="03"
              title="Plan Your Visit"
              text="We help coordinate your appointment and travel requirements."
            />

            <Step
              number="04"
              title="Receive Treatment"
              text="Visit our hospital and receive personalized medical care."
            />

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="bg-[#075b70] px-[5%] py-14 text-center">

        <h2 className="text-3xl font-bold text-white">
          Planning Your Medical Treatment?
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-white/80">
          Contact our team or request an appointment
          to begin your healthcare journey.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-4">

          <Link
            to="/appointment"
            className="
              rounded-lg
              bg-[#ffd000]
              px-7
              py-3
              font-semibold
              text-gray-900
              transition
              hover:bg-yellow-400
            "
          >
            Book Appointment
          </Link>

          <Link
            to="/contact"
            className="
              rounded-lg
              border
              border-white
              px-7
              py-3
              font-semibold
              text-white
              transition
              hover:bg-white
              hover:text-[#075b70]
            "
          >
            Contact Us
          </Link>

        </div>

      </section>

    </div>
  );
}


function ServiceCard({
  title,
  description,
  icon,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-gray-100
        bg-white
        p-6
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="text-3xl">
        {icon}
      </div>

      <h3
        className="
          mt-4
          text-xl
          font-bold
          text-[#075b70]
        "
      >
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}


function Step({
  number,
  title,
  text,
}) {
  return (
    <div className="text-center">

      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#087f9d]
          font-bold
          text-white
        "
      >
        {number}
      </div>

      <h3
        className="
          mt-4
          font-bold
          text-[#075b70]
        "
      >
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {text}
      </p>

    </div>
  );
}


export default InternationalPatients;
