import React from "react";

function ServiceCard({
  icon,
  title,
  description,
}) {

  return (
    <div
      className="
        group
        rounded-lg
        bg-white
        p-7
        text-center
        shadow-card
        transition
        duration-300
        hover:-translate-y-2
      "
    >

      <div
        className="
          mx-auto
          mb-5
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#e4f7fa]
          text-3xl
          text-[#087f9d]
        "
      >
        {icon}
      </div>

      <h3
        className="
          mb-3
          text-lg
          font-bold
          text-gray-800
        "
      >
        {title}
      </h3>

      <p
        className="
          mb-5
          text-sm
          leading-6
          text-gray-500
        "
      >
        {description}
      </p>

      <button
        className="
          rounded
          bg-[#087f9d]
          px-5
          py-2
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-[#075d72]
        "
      >
        Explore
      </button>

    </div>
  );
}

export default ServiceCard;