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
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#dceff2]
        bg-white
        shadow-[0_10px_35px_rgba(8,127,157,0.09)]
        transition-all
        duration-500
        ease-out

        hover:-translate-y-3
        hover:border-[#a9dce3]
        hover:shadow-[0_22px_55px_rgba(8,127,157,0.18)]
      "
    >

      {/* =========================================
          DOCTOR IMAGE
      ========================================== */}

      <div
        className="
          relative
          h-72
          overflow-hidden
          bg-[#eaf7fa]
        "
      >

        <img
          src={doctor.image}
          alt={doctor.name}
          className="
            h-full
            w-full
            object-cover
            object-center
            transition-transform
            duration-700
            ease-out

            group-hover:scale-105
          "
        />

        {/* Image Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#064e60]/70
            via-transparent
            to-transparent
            opacity-70
            transition-opacity
            duration-500

            group-hover:opacity-90
          "
        />

        {/* Top Badge */}

        <div
          className="
            absolute
            left-4
            top-4
            rounded-full
            border
            border-white/30
            bg-white/90
            px-3
            py-1.5
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            text-[#087f9d]
            shadow-lg
            backdrop-blur-md
          "
        >
          Specialist
        </div>

        {/* Experience Badge */}

        <div
          className="
            absolute
            bottom-4
            right-4
            rounded-full
            border
            border-white/20
            bg-[#075d72]/90
            px-3
            py-1.5
            text-xs
            font-semibold
            text-white
            shadow-lg
            backdrop-blur-md
          "
        >
          {doctor.experience}
        </div>

      </div>


      {/* =========================================
          DOCTOR INFORMATION
      ========================================== */}

      <div
        className="
          relative
          p-6
          text-center
        "
      >

        {/* Small Accent */}

        <div
          className="
            mx-auto
            mb-4
            h-1
            w-10
            rounded-full
            bg-gradient-to-r
            from-[#087f9d]
            to-[#ffd000]
            transition-all
            duration-300

            group-hover:w-16
          "
        />


        {/* Doctor Name */}

        <h3
          className="
            mb-2
            text-xl
            font-extrabold
            tracking-tight
            text-[#164653]
            transition-colors
            duration-300

            group-hover:text-[#087f9d]
          "
        >
          {doctor.name}
        </h3>


        {/* Specialty */}

        <p
          className="
            mb-2
            text-sm
            font-bold
            text-[#087f9d]
          "
        >
          {doctor.specialty}
        </p>


        {/* Experience */}

        <p
          className="
            mb-6
            text-sm
            leading-6
            text-gray-500
          "
        >
          {doctor.experience}
        </p>


        {/* =========================================
            APPOINTMENT BUTTON
        ========================================== */}

        <Link
          to="/appointment"
          className="
            inline-block
            w-full
          "
        >

          <button
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-[#087f9d]
              bg-[#087f9d]
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-[0_7px_18px_rgba(8,127,157,0.18)]
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:bg-[#075d72]
              hover:shadow-[0_10px_25px_rgba(8,127,157,0.28)]
            "
          >

            <span>
              Book Appointment
            </span>

            <span
              className="
                text-base
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            >
              →
            </span>

          </button>

        </Link>

      </div>


      {/* =========================================
          BOTTOM ACCENT
      ========================================== */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-1
          w-0
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-[#087f9d]
          via-[#ffd000]
          to-[#087f9d]
          transition-all
          duration-500

          group-hover:w-2/3
        "
      />

    </div>
  );
}

export default DoctorCard;
