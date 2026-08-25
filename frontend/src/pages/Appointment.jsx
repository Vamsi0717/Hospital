import React, {
  useState,
} from "react";

import { bookAppointment, sendOtp, verifyOtp } from "../services/api";

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

  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // If phone number changes after verifying, require re-verification
    if (e.target.name === "phone" && otpVerified) {
      setOtpVerified(false);
      setOtpSent(false);
      setOtpCode("");
    }

  };


  const handleSendOtp = async () => {

    setOtpError("");
    setOtpMessage("");

    if (!formData.phone) {
      setOtpError("Please enter your phone number first.");
      return;
    }

    setOtpSending(true);

    try {

      const response = await sendOtp(formData.phone);
      setOtpSent(true);
      setOtpMessage(response.data.message || "OTP sent successfully.");

    } catch (error) {

      console.error(error);
      setOtpError(
        error.response?.data?.error || "Failed to send OTP. Please try again."
      );

    } finally {

      setOtpSending(false);

    }

  };


  const handleVerifyOtp = async () => {

    setOtpError("");
    setOtpMessage("");

    if (!otpCode) {
      setOtpError("Please enter the OTP.");
      return;
    }

    setOtpVerifying(true);

    try {

      await verifyOtp(formData.phone, otpCode);
      setOtpVerified(true);
      setOtpMessage("Phone number verified successfully.");

    } catch (error) {

      console.error(error);
      setOtpError(
        error.response?.data?.error || "Invalid or expired OTP. Please try again."
      );

    } finally {

      setOtpVerifying(false);

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!otpVerified) {
      setErrorMsg("Please verify your phone number with OTP before booking.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {

      const response = await bookAppointment(formData);

      alert(
        response.data.message ||
        "Appointment request submitted successfully!"
      );

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

      setOtpSent(false);
      setOtpVerified(false);
      setOtpCode("");
      setOtpMessage("");

    } catch (error) {

      console.error(error);

      const details = error.response?.data?.details;

      setErrorMsg(
        details
          ? details.join(", ")
          : error.response?.data?.error ||
            "Something went wrong while booking your appointment. Please try again."
      );

    } finally {

      setSubmitting(false);

    }

  };


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
          Book an Appointment
        </h1>

      </div>


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

            <Input
              label="Patient Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />


            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />


            <div>

              <label className="mb-2 block text-sm font-semibold">
                Phone
              </label>

              <div className="flex gap-2">

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  disabled={otpVerified}
                  className="
                    w-full
                    rounded
                    border
                    border-gray-300
                    p-3
                    outline-none
                    focus:border-[#087f9d]
                    disabled:bg-gray-100
                  "
                />

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpSending || otpVerified}
                  className="
                    whitespace-nowrap
                    rounded
                    bg-[#087f9d]
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-[#075d72]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {otpVerified
                    ? "Verified"
                    : otpSending
                    ? "Sending..."
                    : otpSent
                    ? "Resend OTP"
                    : "Send OTP"}
                </button>

              </div>

            </div>


            {otpSent && !otpVerified && (

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Enter OTP
                </label>

                <div className="flex gap-2">

                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="6-digit code"
                    maxLength={6}
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

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={otpVerifying}
                    className="
                      whitespace-nowrap
                      rounded
                      bg-green-600
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      hover:bg-green-700
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {otpVerifying ? "Verifying..." : "Verify"}
                  </button>

                </div>

              </div>

            )}


            {(otpError || otpMessage) && (

              <div className="md:col-span-2">

                {otpError && (
                  <p className="text-sm font-medium text-red-600">
                    {otpError}
                  </p>
                )}

                {!otpError && otpMessage && (
                  <p className="text-sm font-medium text-green-600">
                    {otpMessage}
                  </p>
                )}

              </div>

            )}


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


            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />


            <Input
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />


            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold">
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


          <button
            type="submit"
            disabled={submitting || !otpVerified}
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
              : !otpVerified
              ? "VERIFY PHONE TO BOOK"
              : "BOOK APPOINTMENT"}
          </button>

        </form>

      </section>

    </>
  );
}


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

      <label className="mb-2 block text-sm font-semibold">
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


function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {

  return (
    <div>

      <label className="mb-2 block text-sm font-semibold">
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