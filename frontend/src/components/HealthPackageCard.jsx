import React from "react";
import { useNavigate } from "react-router-dom";

function HealthPackageCard({ item }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/payment", {
      state: {
        packageName: item.name,
        price: item.price,
      },
    });
  };

  return (
    <div
      className="
        rounded-lg
        border
        border-gray-200
        bg-white
        p-6
        shadow-card
      "
    >
      <h3
        className="
          mb-3
          text-xl
          font-bold
          text-[#087f9d]
        "
      >
        {item.name}
      </h3>

      <p
        className="
          text-sm
          leading-6
          text-gray-500
        "
      >
        {item.description}
      </p>

      <div
        className="
          my-5
          text-2xl
          font-bold
          text-red-600
        "
      >
        ₹{item.price}
      </div>

      <ul className="mb-6 space-y-2">
        {item.tests.map((test, index) => (
          <li
            key={index}
            className="text-sm text-gray-600"
          >
            <span className="mr-2 text-[#087f9d]">
              ✓
            </span>

            {test}
          </li>
        ))}
      </ul>

      <button
        onClick={handleBookNow}
        className="
          rounded
          bg-[#087f9d]
          px-5
          py-2.5
          font-semibold
          text-white
          hover:bg-[#075d72]
        "
      >
        Buy Now
      </button>
    </div>
  );
}

export default HealthPackageCard;