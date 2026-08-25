import React from "react";

import {
  Link,
} from "react-router-dom";

function DoctorCard({
  doctor,
}) {

  return (
    <div
      className="
        overflow-hidden
        rounded-lg
        bg-white
        text-center
        shadow-card
        transition
        hover:-translate-y-1
      "
    >

      <img
        src={doctor.image}
        alt={doctor.name}
        className="
          h-60
          w-full
          object-cover
        "
      />

      <div className="p-5">

        <h3
          className="
            mb-2
            text-lg
            font-bold
            text-[#087f9d]
          "
        >
          {doctor.name}
        </h3>

        <p
          className="
            mb-1
            font-semibold
            text-gray-700
          "
        >
          {doctor.specialty}
        </p>

        <p
          className="
            mb-4
            text-sm
            text-gray-500
          "
        >
          {doctor.experience}
        </p>

        <Link to="/appointment">

          <button
            className="
              rounded
              bg-[#087f9d]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              hover:bg-[#075d72]
            "
          >
            Book Appointment
          </button>

        </Link>

      </div>

    </div>
  );
}

export default DoctorCard;