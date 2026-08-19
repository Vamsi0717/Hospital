import React from "react";
import { Link } from "react-router-dom";

function HospitalCard({
  hospital,
}) {

  return (
    <div
      className="
        overflow-hidden
        rounded-lg
        bg-white
        shadow-card
        transition
        hover:-translate-y-1
      "
    >

      <img
        src={hospital.image}
        alt={hospital.name}
        className="
          h-52
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
          {hospital.name}
        </h3>

        <p
          className="
            mb-3
            text-sm
            font-medium
            text-gray-600
          "
        >
          📍 {hospital.location}
        </p>

        <p
          className="
            mb-5
            text-sm
            leading-6
            text-gray-500
          "
        >
          {hospital.description}
        </p>

        <Link to={`/hospitals/${hospital.id}`}>

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
            View Hospital
          </button>

        </Link>

      </div>

    </div>
  );
}

export default HospitalCard;