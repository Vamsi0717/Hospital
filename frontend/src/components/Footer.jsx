import React from "react";

import {
  Link,
} from "react-router-dom";

function Footer() {

  return (
    <footer
      className="
        bg-[#123f4d]
        px-[5%]
        pb-5
        pt-14
        text-white
      "
    >

      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-10

          md:grid-cols-2
          lg:grid-cols-4
        "
      >

        <div>

          <h3 className="mb-4 text-lg font-bold">
            MEDICARE HEALTHCARE
          </h3>

          <p
            className="
              text-sm
              leading-7
              text-gray-300
            "
          >
            Providing trusted and compassionate
            healthcare through experienced doctors,
            advanced technology and patient-focused
            services.
          </p>

        </div>


        <div>

          <h3 className="mb-4 font-bold">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">

            <li>
              <Link
                to="/doctors"
                className="text-gray-300 hover:text-white"
              >
                Our Doctors
              </Link>
            </li>

            <li>
              <Link
                to="/hospitals"
                className="text-gray-300 hover:text-white"
              >
                Hospitals
              </Link>
            </li>

            <li>
              <Link
                to="/specialties"
                className="text-gray-300 hover:text-white"
              >
                Specialties
              </Link>
            </li>

            <li>
              <Link
                to="/health-packages"
                className="text-gray-300 hover:text-white"
              >
                Health Packages
              </Link>
            </li>

          </ul>

        </div>


        <div>

          <h3 className="mb-4 font-bold">
            Patient Services
          </h3>

          <ul className="space-y-3 text-sm">

            <li>
              <Link
                to="/appointment"
                className="text-gray-300 hover:text-white"
              >
                Book Appointment
              </Link>
            </li>

            <li className="text-gray-300">
              Online Consultation
            </li>

            <li className="text-gray-300">
              Emergency Care
            </li>

            <li className="text-gray-300">
              Insurance
            </li>

          </ul>

        </div>


        <div>

          <h3 className="mb-4 font-bold">
            Contact Us
          </h3>

          <div className="space-y-3 text-sm text-gray-300">

            <p>
              ☎ 1800-500-1066
            </p>

            <p>
              ✉ support@medicare.com
            </p>

            <p>
              📍 Hyderabad, India
            </p>

          </div>

        </div>

      </div>


      <div
        className="
          mx-auto
          mt-10
          max-w-7xl
          border-t
          border-white/20
          pt-5
          text-center
          text-xs
          text-gray-300
        "
      >
        © 2026 Medicare Healthcare.
        All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;