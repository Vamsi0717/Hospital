import React, { useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Arun Kumar",
    specialty: "Cardiologist",
    hospital: "Medicare Hyderabad",
    location: "Hyderabad",
    experience: "15 years",
    phone: "+91 9876543210",
    availability: "Monday - Saturday",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialty: "Gynecologist",
    hospital: "Medicare Chennai",
    location: "Chennai",
    experience: "12 years",
    phone: "+91 9876543211",
    availability: "Monday - Friday",
  },
  {
    id: 3,
    name: "Dr. Rahul Reddy",
    specialty: "Orthopedic",
    hospital: "Medicare Bengaluru",
    location: "Bengaluru",
    experience: "10 years",
    phone: "+91 9876543212",
    availability: "Monday - Saturday",
  },
  {
    id: 4,
    name: "Dr. Sneha Rao",
    specialty: "Dermatologist",
    hospital: "Medicare Hyderabad",
    location: "Hyderabad",
    experience: "8 years",
    phone: "+91 9876543213",
    availability: "Tuesday - Saturday",
  },
  {
    id: 5,
    name: "Dr. Vikram Singh",
    specialty: "Neurologist",
    hospital: "Medicare Chennai",
    location: "Chennai",
    experience: "18 years",
    phone: "+91 9876543214",
    availability: "Monday - Friday",
  },
  {
    id: 6,
    name: "Dr. Anjali Mehta",
    specialty: "Pediatrician",
    hospital: "Medicare Bengaluru",
    location: "Bengaluru",
    experience: "9 years",
    phone: "+91 9876543215",
    availability: "Monday - Saturday",
  },
  {
    id: 7,
    name: "Dr. Karthik Rao",
    specialty: "General Physician",
    hospital: "Medicare Hyderabad",
    location: "Hyderabad",
    experience: "11 years",
    phone: "+91 9876543216",
    availability: "Monday - Saturday",
  },
  {
    id: 8,
    name: "Dr. Meera Iyer",
    specialty: "ENT Specialist",
    hospital: "Medicare Chennai",
    location: "Chennai",
    experience: "14 years",
    phone: "+91 9876543217",
    availability: "Monday - Friday",
  },
  {
    id: 9,
    name: "Dr. Suresh Reddy",
    specialty: "Urologist",
    hospital: "Medicare Bengaluru",
    location: "Bengaluru",
    experience: "16 years",
    phone: "+91 9876543218",
    availability: "Monday - Saturday",
  },
  {
    id: 10,
    name: "Dr. Kavya Nair",
    specialty: "Ophthalmologist",
    hospital: "Medicare Hyderabad",
    location: "Hyderabad",
    experience: "7 years",
    phone: "+91 9876543219",
    availability: "Tuesday - Saturday",
  },
  {
    id: 11,
    name: "Dr. Ramesh Verma",
    specialty: "Cardiologist",
    hospital: "Medicare Chennai",
    location: "Chennai",
    experience: "20 years",
    phone: "+91 9876543220",
    availability: "Monday - Friday",
  },
  {
    id: 12,
    name: "Dr. Neha Kapoor",
    specialty: "Psychiatrist",
    hospital: "Medicare Bengaluru",
    location: "Bengaluru",
    experience: "13 years",
    phone: "+91 9876543221",
    availability: "Monday - Saturday",
  },
];

const hospitals = [
  {
    id: 1,
    name: "Medicare Hyderabad",
    location: "Hyderabad",
    address: "Banjara Hills, Hyderabad, Telangana",
    phone: "+91 40 12345678",
    emergency: "24/7 Emergency",
    departments: "Cardiology, Neurology, Orthopedics, General Medicine",
  },
  {
    id: 2,
    name: "Medicare Chennai",
    location: "Chennai",
    address: "T Nagar, Chennai, Tamil Nadu",
    phone: "+91 44 12345678",
    emergency: "24/7 Emergency",
    departments: "Cardiology, Gynecology, Dermatology, ENT",
  },
  {
    id: 3,
    name: "Medicare Bengaluru",
    location: "Bengaluru",
    address: "Whitefield, Bengaluru, Karnataka",
    phone: "+91 80 12345678",
    emergency: "24/7 Emergency",
    departments: "Orthopedics, Pediatrics, Urology, Ophthalmology",
  },
];

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({
    doctors: [],
    hospitals: [],
  });

  const [searched, setSearched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = search.trim().toLowerCase();

    if (!query) {
      alert("Please enter something to search");
      return;
    }

    // Search doctors
    const doctorResults = doctors.filter((doctor) => {
      return (
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.hospital.toLowerCase().includes(query) ||
        doctor.location.toLowerCase().includes(query)
      );
    });

    // Search hospitals
    const hospitalResults = hospitals.filter((hospital) => {
      return (
        hospital.name.toLowerCase().includes(query) ||
        hospital.location.toLowerCase().includes(query) ||
        hospital.address.toLowerCase().includes(query) ||
        hospital.departments.toLowerCase().includes(query)
      );
    });

    setResults({
      doctors: doctorResults,
      hospitals: hospitalResults,
    });

    setSearched(true);
  };

  const handleClear = () => {
    setSearch("");

    setResults({
      doctors: [],
      hospitals: [],
    });

    setSearched(false);
  };

  return (
    <div className="w-full max-w-xl">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="
          flex
          h-11
          w-full
          items-center
          border
          border-gray-300
          bg-white
        "
      >
        <input
          type="text"
          placeholder="Find hospitals, locations, doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            h-full
            flex-1
            px-5
            text-sm
            outline-none
          "
        />

        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="
              px-2
              text-lg
              text-gray-400
              hover:text-gray-700
            "
          >
            ×
          </button>
        )}

        <button
          type="submit"
          className="
            h-full
            px-4
            text-2xl
            text-gray-700
            hover:text-[#0783a0]
          "
        >
          ⌕
        </button>
      </form>

      {/* Search Results */}
      {searched && (
        <div
          className="
            mt-4
            max-h-[600px]
            overflow-y-auto
            rounded-lg
            border
            border-gray-200
            bg-white
            p-4
            shadow-lg
          "
        >
          {/* Doctors */}
          {results.doctors.length > 0 && (
            <div>
              <h2
                className="
                  mb-3
                  text-lg
                  font-bold
                  text-[#087f9d]
                "
              >
                Doctors
              </h2>

              <div className="space-y-3">
                {results.doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="
                      rounded-lg
                      border
                      border-gray-200
                      p-4
                      hover:border-[#087f9d]
                      hover:bg-[#f7fafb]
                    "
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {doctor.name}
                    </h3>

                    <p className="mt-1 font-medium text-[#087f9d]">
                      {doctor.specialty}
                    </p>

                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p>
                        <strong>Hospital:</strong>{" "}
                        {doctor.hospital}
                      </p>

                      <p>
                        <strong>Location:</strong>{" "}
                        {doctor.location}
                      </p>

                      <p>
                        <strong>Experience:</strong>{" "}
                        {doctor.experience}
                      </p>

                      <p>
                        <strong>Phone:</strong>{" "}
                        {doctor.phone}
                      </p>

                      <p>
                        <strong>Availability:</strong>{" "}
                        {doctor.availability}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hospitals */}
          {results.hospitals.length > 0 && (
            <div className="mt-6">
              <h2
                className="
                  mb-3
                  text-lg
                  font-bold
                  text-[#087f9d]
                "
              >
                Hospitals
              </h2>

              <div className="space-y-3">
                {results.hospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="
                      rounded-lg
                      border
                      border-gray-200
                      p-4
                      hover:border-[#087f9d]
                      hover:bg-[#f7fafb]
                    "
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {hospital.name}
                    </h3>

                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p>
                        <strong>Location:</strong>{" "}
                        {hospital.location}
                      </p>

                      <p>
                        <strong>Address:</strong>{" "}
                        {hospital.address}
                      </p>

                      <p>
                        <strong>Phone:</strong>{" "}
                        {hospital.phone}
                      </p>

                      <p>
                        <strong>Emergency:</strong>{" "}
                        {hospital.emergency}
                      </p>

                      <p>
                        <strong>Departments:</strong>{" "}
                        {hospital.departments}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {results.doctors.length === 0 &&
            results.hospitals.length === 0 && (
              <div className="py-6 text-center">
                <p className="text-gray-500">
                  No doctors or hospitals found for:
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  "{search}"
                </p>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
