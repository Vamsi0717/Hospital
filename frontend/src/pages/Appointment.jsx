import React, {
  useState,
} from "react";

import { createAppointment } from "../services/api";

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


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setSubmitting(true);
    setErrorMsg("");

    try {

      const response = await createAppointment(formData);

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

    } catch (error) {

      console.error(error);

      const details = error.response?.data?.details;

      setErrorMsg(
        details
          ? details.join(", ")
          : "Something went wrong while booking your appointment. Please try again."
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


            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />


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
            disabled={submitting}
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
            {submitting ? "BOOKING..." : "BOOK APPOINTMENT"}
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