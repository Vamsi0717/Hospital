import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const links = [
    {
      name: "HOME",
      path: "/",
    },
    {
      name: "CENTRES OF EXCELLENCE",
      path: "/specialties",
      dropdown: true,
      menu: [
        {
          name: "Cardiology",
          path: "/specialties/cardiology",
        },
        {
          name: "Neurology",
          path: "/specialties/neurology",
        },
        {
          name: "Orthopedics",
          path: "/specialties/orthopedics",
        },
        {
          name: "Oncology",
          path: "/specialties/oncology",
        },
        {
          name: "Gastroenterology",
          path: "/specialties/gastroenterology",
        },
        {
          name: "View All Specialties",
          path: "/specialties",
        },
      ],
    },
    {
      name: "OUR DOCTORS",
      path: "/doctors",
    },
    {
      name: "HOSPITALS",
      path: "/hospitals",
      dropdown: true,
      menu: [
        {
          name: "Medicare Hyderabad",
          path: "/hospitals/hyderabad",
        },
        {
          name: "Medicare Chennai",
          path: "/hospitals/chennai",
        },
        {
          name: "Medicare Bengaluru",
          path: "/hospitals/bengaluru",
        },
        {
          name: "Medicare Mumbai",
          path: "/hospitals/mumbai",
        },
        {
          name: "Medicare Delhi",
          path: "/hospitals/delhi",
        },
        {
          name: "All Hospitals",
          path: "/hospitals",
        },
      ],
    },
    {
      name: "HEALTH CHECK PACKAGES",
      path: "/health-packages",
    },

    // ========================================
    // INTERNATIONAL PATIENTS
    // ========================================

    {
      name: "INTERNATIONAL PATIENTS",
      path: "/international-patients",
      dropdown: true,
      menu: [
        {
          name: "International Patient Services",
          path: "/international-patients",
        },
        {
          name: "Why Choose Medicare",
          path: "/international-patients/why-medicare",
        },
        {
          name: "Visa Assistance",
          path: "/international-patients/visa-assistance",
        },
        {
          name: "Travel & Accommodation",
          path: "/international-patients/travel-accommodation",
        },
        {
          name: "International Patient Guide",
          path: "/international-patients/patient-guide",
        },
        {
          name: "Request an Appointment",
          path: "/appointment",
        },
      ],
    },

    // ========================================
    // RESOURCES
    // ========================================

    {
      name: "RESOURCES",
      path: "/resources",
      dropdown: true,
      menu: [
        {
          name: "Health Blog",
          path: "/resources/blog",
        },
        {
          name: "Health Tips",
          path: "/resources/health-tips",
        },
        {
          name: "FAQs",
          path: "/resources/faqs",
        },
        {
          name: "Patient Stories",
          path: "/resources/patient-stories",
        },
        {
          name: "Health Videos",
          path: "/resources/videos",
        },
        {
          name: "Downloadable Resources",
          path: "/resources/downloads",
        },
      ],
    },

    // ========================================
    // CONTACT
    // ========================================

    {
      name: "CONTACT US",
      path: "/contact",
      dropdown: true,
      menu: [
        {
          name: "Contact Us",
          path: "/contact",
        },
        {
          name: "Book Appointment",
          path: "/appointment",
        },
        {
          name: "Emergency",
          path: "/contact/emergency",
        },
      ],
    },
  ];

  return (
    <nav
      className="
        absolute
        left-0
        top-0
        z-[100]
        hidden
        min-h-[58px]
        w-full
        items-center
        justify-center
        px-6
        py-2
        lg:flex

        bg-transparent
      "
    >
      {/* =========================================
          NAVBAR INNER CONTAINER
      ========================================== */}

      <div
        className="
          flex
          h-full
          items-center
          justify-center
          gap-1
          rounded-full
          border
          border-white/20
          bg-[#075b70]/35
          px-2
          py-1
          shadow-[0_4px_25px_rgba(0,0,0,0.18)]
          backdrop-blur-md
        "
      >
        {links.map((link) => {
          const hasDropdown =
            link.dropdown &&
            link.menu &&
            link.menu.length > 0;

          return (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() =>
                hasDropdown &&
                setOpenDropdown(link.name)
              }
              onMouseLeave={() =>
                hasDropdown &&
                setOpenDropdown(null)
              }
            >
              {/* ====================================
                  MAIN NAVIGATION LINK
              ==================================== */}

              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `
                  group
                  relative
                  flex
                  min-h-[42px]
                  items-center
                  justify-center
                  whitespace-nowrap
                  rounded-full
                  px-4
                  text-[11px]
                  font-semibold
                  tracking-[0.4px]
                  transition-all
                  duration-300
                  ease-out

                  ${
                    isActive
                      ? `
                        bg-white
                        text-[#075b70]
                        shadow-[0_4px_14px_rgba(0,0,0,0.15)]
                      `
                      : `
                        text-white
                        hover:bg-white/15
                        hover:text-[#ffd000]
                      `
                  }
                `
                }
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.name}

                  {/* Dropdown Arrow */}

                  {hasDropdown && (
                    <span
                      className={`
                        flex
                        h-[15px]
                        w-[15px]
                        items-center
                        justify-center
                        rounded-full
                        bg-white/15
                        text-[7px]
                        text-white
                        transition-all
                        duration-300

                        ${
                          openDropdown === link.name
                            ? "rotate-180 bg-[#ffd000] text-[#075b70]"
                            : ""
                        }
                      `}
                    >
                      ▼
                    </span>
                  )}
                </span>

                {/* =================================
                    HOVER UNDERLINE
                ================================= */}

                <span
                  className="
                    absolute
                    bottom-[5px]
                    left-1/2
                    h-[2px]
                    w-0
                    -translate-x-1/2
                    rounded-full
                    bg-[#ffd000]
                    transition-all
                    duration-300
                    group-hover:w-1/2
                  "
                />
              </NavLink>

              {/* ====================================
                  DROPDOWN MENU
              ==================================== */}

              {hasDropdown &&
                openDropdown === link.name && (
                  <div
                    className="
                      absolute
                      left-1/2
                      top-full
                      z-[200]
                      mt-2
                      w-64
                      -translate-x-1/2

                      overflow-hidden
                      rounded-xl

                      border
                      border-white/40

                      bg-white/95

                      p-2

                      shadow-[0_15px_40px_rgba(0,0,0,0.25)]

                      backdrop-blur-xl
                    "
                  >
                    {/* =================================
                        DROPDOWN ARROW
                    ================================= */}

                    <div
                      className="
                        absolute
                        -top-2
                        left-1/2
                        h-4
                        w-4
                        -translate-x-1/2
                        rotate-45

                        border-l
                        border-t
                        border-white/40

                        bg-white
                      "
                    />

                    {/* =================================
                        DROPDOWN ITEMS
                    ================================= */}

                    <div className="relative z-10">
                      {link.menu.map((item, index) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`
                            group
                            block
                            rounded-lg
                            px-4
                            py-3
                            text-sm
                            font-medium
                            text-gray-700
                            transition-all
                            duration-200

                            hover:bg-[#eaf7fa]
                            hover:pl-5
                            hover:text-[#087f9d]

                            ${
                              index ===
                              link.menu.length - 1
                                ? "border-t border-gray-100"
                                : ""
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <span>
                              {item.name}
                            </span>

                            {/* Arrow */}

                            <span
                              className="
                                translate-x-1
                                text-xs
                                text-[#087f9d]
                                opacity-0
                                transition-all
                                duration-200

                                group-hover:translate-x-0
                                group-hover:opacity-100
                              "
                            >
                              →
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
