import React, {
  useState,
} from "react";

import {
  createAppointment,
  sendOtp,
  verifyOtp,
} from "../services/api";

function Appointment() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    hospital: "",
    date: "",
    time: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // --- Phone validation state ---
  const [phoneError, setPhoneError] = useState("");

  // --- OTP verification state ---
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpMsg, setOtpMsg] = useState("");
  const [otpError, setOtpError] = useState("");


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    // ========================================
    // PHONE NUMBER
    // ========================================

    if (name === "phone") {

      // Allow numbers only
      const onlyNumbers = value.replace(/\D/g, "");

      // Maximum 10 digits
      const phone = onlyNumbers.slice(0, 10);

      setFormData({
        ...formData,
        phone,
      });

      // Reset phone error while typing
      if (phone.length === 0) {

        setPhoneError("");

      } else if (phone.length < 10) {

        setPhoneError(
          "Please enter a 10-digit mobile number."
        );

      } else {

        // Exactly 10 digits
        setPhoneError("");

      }

      return;
    }


    // ========================================
    // OTHER FIELDS
    // ========================================

    setFormData({
      ...formData,
      [name]: value,
    });


    // Any change to email invalidates
    // previous OTP verification.

    if (name === "email") {

      setOtpSent(false);
      setOtpVerified(false);
      setOtpToken("");
      setOtpCode("");
      setOtpMsg("");
      setOtpError("");

    }

  };


  // ==========================================
  // SEND OTP
  // ==========================================

  const handleSendOtp = async () => {

    if (!formData.email) {

      setOtpError(
        "Enter your email first."
      );

      return;
    }


    setOtpSending(true);
    setOtpError("");
    setOtpMsg("");


    try {

      const response = await sendOtp(
        formData.email
      );


      setOtpSent(true);

      setOtpMsg(
        response.data.message ||
        "OTP sent. Check your email."
      );

    } catch (error) {

      console.error(error);

      const details =
        error.response?.data?.details;


      setOtpError(
        details
          ? details.join(", ")
          : "Could not send OTP. Please try again."
      );

    } finally {

      setOtpSending(false);

    }

  };


  // ==========================================
  // VERIFY OTP
  // ==========================================

  const handleVerifyOtp = async () => {

    if (!otpCode) {

      setOtpError(
        "Enter the OTP you received."
      );

      return;
    }


    setOtpVerifying(true);
    setOtpError("");


    try {

      const response = await verifyOtp(
        formData.email,
        otpCode
      );


      setOtpVerified(true);

      setOtpToken(
        response.data.otp_token
      );

      setOtpMsg(
        response.data.message ||
        "Email verified."
      );

    } catch (error) {

      console.error(error);

      const details =
        error.response?.data?.details;


      setOtpError(
        details
          ? details.join(", ")
          : "OTP verification failed. Please try again."
      );

    } finally {

      setOtpVerifying(false);

    }

  };


  // ==========================================
  // SUBMIT APPOINTMENT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErrorMsg("");


    // ========================================
    // PHONE VALIDATION
    // ========================================

    if (formData.phone.length !== 10) {

      setPhoneError(
        "Please enter a valid 10-digit mobile number."
      );

      setErrorMsg(
        "Please enter a valid 10-digit mobile number."
      );

      return;
    }


    // ========================================
    // EMAIL OTP VALIDATION
    // ========================================

    if (!otpVerified) {

      setErrorMsg(
        "Please verify your email with the OTP before booking."
      );

      return;
    }


    setSubmitting(true);


    try {

      const response =
        await createAppointment({
          ...formData,
          otp_token: otpToken,
        });


      alert(
        response.data.message ||
        "Appointment request submitted successfully!"
      );


      // ======================================
      // RESET FORM
      // ======================================

      setFormData({
        name: "",
        email: "",
        phone: "",
        doctor: "",
        hospital: "",
        date: "",
        time: "",
        message: "",
      });


      setPhoneError("");

      setOtpCode("");
      setOtpSent(false);
      setOtpVerified(false);
      setOtpToken("");
      setOtpMsg("");
      setOtpError("");

    } catch (error) {

      console.error(error);

      const details =
        error.response?.data?.details;


      setErrorMsg(
        details
          ? details.join(", ")
          : error.response?.data?.message ||
            "Something went wrong while booking your appointment. Please try again."
      );

    } finally {

      setSubmitting(false);

    }

  };


  return (
    <>

      {/* =====================================
          HEADER
      ====================================== */}

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
          Book an Appointment
        </h1>

      </div>


      {/* =====================================
          FORM SECTION
      ====================================== */}

      <section className="bg-[#f7fafb] px-[5%] py-16">

        <form
          onSubmit={handleSubmit}
          className="
            mx-auto
            max-w-4xl
            rounded-lg
            bg-white
            p-8
            shadow-card
          "
        >

          {/* =================================
              GENERAL ERROR
          ================================== */}

          {errorMsg && (

            <div
              className="
                mb-5
                rounded
                border
                border-red-300
                bg-red-50
                p-3
                text-sm
                text-red-700
              "
            >
              {errorMsg}
            </div>

          )}


          <div
            className="
              grid
              gap-5
              md:grid-cols-2
            "
          >

            {/* =================================
                PATIENT NAME
            ================================== */}

            <Input
              label="Patient Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />


            {/* =================================
                EMAIL + OTP
            ================================== */}

            <div>

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />


              {otpVerified ? (

                <p
                  className="
                    mt-2
                    text-sm
                    font-medium
                    text-green-600
                  "
                >
                  ✓ Email verified
                </p>

              ) : (

                <div className="mt-2">

                  {!otpSent ? (

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={
                        otpSending ||
                        !formData.email
                      }
                      className="
                        rounded
                        border
                        border-[#087f9d]
                        px-3
                        py-1.5
                        text-sm
                        font-semibold
                        text-[#087f9d]
                        hover:bg-[#e6f4f7]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {otpSending
                        ? "Sending..."
                        : "Send OTP"}
                    </button>

                  ) : (

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                      "
                    >

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => {

                          const value =
                            e.target.value.replace(
                              /\D/g,
                              ""
                            );

                          setOtpCode(value);

                        }}
                        placeholder="Enter OTP"
                        className="
                          w-32
                          rounded
                          border
                          border-gray-300
                          p-2
                          text-sm
                          outline-none
                          focus:border-[#087f9d]
                        "
                      />


                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={
                          otpVerifying ||
                          !otpCode
                        }
                        className="
                          rounded
                          bg-[#087f9d]
                          px-3
                          py-2
                          text-sm
                          font-semibold
                          text-white
                          hover:bg-[#075d72]
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                        "
                      >
                        {otpVerifying
                          ? "Verifying..."
                          : "Verify"}
                      </button>


                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpSending}
                        className="
                          text-sm
                          font-medium
                          text-[#087f9d]
                          underline
                          disabled:opacity-60
                        "
                      >
                        {otpSending
                          ? "Sending..."
                          : "Resend"}
                      </button>

                    </div>

                  )}


                  {otpMsg && (

                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-500
                      "
                    >
                      {otpMsg}
                    </p>

                  )}


                  {otpError && (

                    <p
                      className="
                        mt-1
                        text-xs
                        text-red-600
                      "
                    >
                      {otpError}
                    </p>

                  )}

                </div>

              )}

            </div>


            {/* =================================
                PHONE NUMBER
            ================================== */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                "
              >
                Phone
              </label>


              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                inputMode="numeric"
                required
                className={`
                  w-full
                  rounded
                  border
                  p-3
                  outline-none
                  ${
                    phoneError
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-[#087f9d]"
                  }
                `}
              />


              {/* Phone validation message */}

              {phoneError && (

                <p
                  className="
                    mt-1
                    text-sm
                    text-red-600
                  "
                >
                  {phoneError}
                </p>

              )}


              {/* Character counter */}

              <p
                className={`
                  mt-1
                  text-xs
                  ${
                    formData.phone.length === 10
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                `}
              >
                {formData.phone.length}/10 digits

                {formData.phone.length === 10 &&
                  " ✓"}
              </p>

            </div>


            {/* =================================
                DOCTOR
            ================================== */}

            <Select
              label="Select Doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              options={[
                "Dr. Arun Kumar",
                "Dr. Priya Sharma",
                "Dr. Rahul Reddy",
                "Dr. Sneha Rao",
                "Dr. Vikram Singh",
                "Dr. Anjali Mehta",
                "Dr. Karthik Rao",
                "Dr. Meera Iyer",
                "Dr. Suresh Reddy",
                "Dr. Kavya Nair",
                "Dr. Ramesh Verma",
                "Dr. Neha Kapoor",
              ]}
            />


            {/* =================================
                HOSPITAL
            ================================== */}

            <Select
              label="Select Hospital"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              options={[
                "Medicare Hyderabad",
                "Medicare Chennai",
                "Medicare Bengaluru",
              ]}
            />


            {/* =================================
                DATE
            ================================== */}

            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />


            {/* =================================
                TIME
            ================================== */}

            <Input
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />


            {/* =================================
                MESSAGE
            ================================== */}

            <div className="md:col-span-2">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                "
              >
                Message
              </label>


              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your requirement"
                className="
                  min-h-28
                  w-full
                  rounded
                  border
                  border-gray-300
                  p-3
                  outline-none
                  focus:border-[#087f9d]
                "
              />

            </div>

          </div>


          {/* ===================================
              BOOK APPOINTMENT
          ==================================== */}

          <button
            type="submit"
            disabled={
              submitting ||
              !otpVerified ||
              formData.phone.length !== 10
            }
            title={
              !otpVerified
                ? "Verify your email with the OTP first"
                : formData.phone.length !== 10
                ? "Enter a 10-digit mobile number"
                : undefined
            }
            className="
              mt-6
              rounded
              bg-[#087f9d]
              px-8
              py-3
              font-semibold
              text-white
              hover:bg-[#075d72]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {submitting
              ? "BOOKING..."
              : "BOOK APPOINTMENT"}
          </button>

        </form>

      </section>

    </>
  );
}


/* =========================================
   INPUT COMPONENT
========================================= */

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {

  return (

    <div>

      <label
        className="
          mb-2
          block
          text-sm
          font-semibold
        "
      >
        {label}
      </label>


      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="
          w-full
          rounded
          border
          border-gray-300
          p-3
          outline-none
          focus:border-[#087f9d]
        "
      />

    </div>

  );
}


/* =========================================
   SELECT COMPONENT
========================================= */

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {

  return (

    <div>

      <label
        className="
          mb-2
          block
          text-sm
          font-semibold
        "
      >
        {label}
      </label>


      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="
          w-full
          rounded
          border
          border-gray-300
          bg-white
          p-3
          outline-none
          focus:border-[#087f9d]
        "
      >

        <option value="">
          Select {label}
        </option>


        {options.map((option) => (

          <option
            key={option}
            value={option}
          >
            {option}
          </option>

        ))}

      </select>

    </div>

  );
}


export default Appointment;
