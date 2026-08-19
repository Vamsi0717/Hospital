import React from "react";

import {
  Link,
} from "react-router-dom";

function FloatingActions() {

  return (
    <div
      className="
        fixed
        bottom-5
        right-3
        z-50
        flex
        w-52
        flex-col
        gap-2
      "
    >

      {/* Phone */}

      <div
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-full
          bg-white
          px-4
          py-3
          text-sm
          shadow-xl
        "
      >

        <span
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#5149c7]
            text-white
          "
        >
          ☎
        </span>

        08069991034

      </div>


      {/* Health */}

      <Link to="/health-packages">

        <button
          className="
            w-full
            rounded
            bg-[#4b47c6]
            px-5
            py-4
            text-white
            shadow-lg
            transition
            hover:bg-[#3935a7]
          "
        >
          Book Health Check
        </button>

      </Link>


      {/* Appointment */}

      <Link to="/appointment">

        <button
          className="
            w-full
            rounded
            bg-yellow-400
            px-5
            py-4
            text-gray-900
            shadow-lg
            transition
            hover:bg-yellow-300
          "
        >
          Book Appointment
        </button>

      </Link>

    </div>
  );
}

export default FloatingActions;