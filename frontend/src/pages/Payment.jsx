import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [showSuccess, setShowSuccess] = useState(false);

  const packageName =
    location.state?.packageName || "Health Package";

  const price =
    location.state?.price || 1499;

  const handlePayment = () => {
    // Demo payment process
    setTimeout(() => {
      setShowSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10">

      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-center text-3xl font-bold text-[#087f9d]">
          Complete Your Payment
        </h1>

        <div className="grid gap-8 md:grid-cols-2">

          {/* Package Details */}
          <div className="rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-5 text-xl font-bold text-gray-800">
              Order Summary
            </h2>

            <div className="border-b pb-5">

              <h3 className="text-lg font-semibold text-[#087f9d]">
                {packageName}
              </h3>

              <p className="mt-2 text-gray-500">
                Health Check Package
              </p>

            </div>

            <div className="mt-5 flex justify-between">

              <span className="text-gray-600">
                Package Price
              </span>

              <span className="font-bold">
                ₹{price}
              </span>

            </div>

            <div className="mt-4 flex justify-between border-t pt-4">

              <span className="text-lg font-bold">
                Total
              </span>

              <span className="text-xl font-bold text-red-600">
                ₹{price}
              </span>

            </div>

          </div>


          {/* Payment Section */}
          <div className="rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-5 text-xl font-bold text-gray-800">
              Payment Method
            </h2>

            {/* UPI */}
            <label
              className="
                mb-3
                flex
                cursor-pointer
                items-center
                rounded-lg
                border
                p-4
                hover:bg-gray-50
              "
            >
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
                className="mr-3"
              />

              <span className="font-medium">
                UPI
              </span>
            </label>


            {/* Card */}
            <label
              className="
                mb-3
                flex
                cursor-pointer
                items-center
                rounded-lg
                border
                p-4
                hover:bg-gray-50
              "
            >
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
                className="mr-3"
              />

              <span className="font-medium">
                Credit / Debit Card
              </span>
            </label>


            {/* Net Banking */}
            <label
              className="
                mb-6
                flex
                cursor-pointer
                items-center
                rounded-lg
                border
                p-4
                hover:bg-gray-50
              "
            >
              <input
                type="radio"
                value="netbanking"
                checked={paymentMethod === "netbanking"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
                className="mr-3"
              />

              <span className="font-medium">
                Net Banking
              </span>
            </label>


            {/* Pay Button */}
            <button
              onClick={handlePayment}
              className="
                w-full
                rounded-lg
                bg-[#087f9d]
                py-3
                font-bold
                text-white
                transition
                hover:bg-[#075d72]
              "
            >
              Pay ₹{price}
            </button>

          </div>

        </div>

      </div>


      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            px-4
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-white
              p-8
              text-center
              shadow-2xl
            "
          >

            {/* Success Icon */}
            <div
              className="
                mx-auto
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-green-100
              "
            >
              <span className="text-5xl text-green-600">
                ✓
              </span>
            </div>


            <h2 className="text-2xl font-bold text-green-600">
              Payment Successful!
            </h2>


            <p className="mt-3 text-gray-600">
              Your payment has been completed successfully.
            </p>


            <div className="mt-5 rounded-lg bg-gray-50 p-4">

              <p className="text-sm text-gray-500">
                Package
              </p>

              <p className="font-semibold text-gray-800">
                {packageName}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Amount Paid
              </p>

              <p className="font-bold text-[#087f9d]">
                ₹{price}
              </p>

            </div>


            <button
              onClick={() => navigate("/")}
              className="
                mt-6
                w-full
                rounded-lg
                bg-[#087f9d]
                py-3
                font-semibold
                text-white
                hover:bg-[#075d72]
              "
            >
              Continue to Home
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Payment;