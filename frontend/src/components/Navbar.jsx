

import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const links = [
    {
      name: "HOME",
      path: "/",
    },
    {
      name: "CENTRES OF EXCELLENCE",
      path: "/specialties",
      dropdown: true,
    },
    {
      name: "OUR DOCTORS",
      path: "/doctors",
    },
    {
      name: "HOSPITALS",
      path: "/hospitals",
      dropdown: true,
    },
    {
      name: "HEALTH CHECK PACKAGES",
      path: "/health-packages",
    },
    {
      name: "INTERNATIONAL PATIENTS",
      path: "#",
      dropdown: true,
    },
    {
      name: "RESOURCES",
      path: "#",
      dropdown: true,
    },
    {
      name: "CONTACT US",
      path: "/contact",
      dropdown: true,
    },
  ];

  return (
    <nav
      className="
        hidden
        min-h-[58px]
        items-center
        justify-center
        gap-1
        bg-gradient-to-r
        from-[#075b70]
        via-[#087c94]
        to-[#075b70]
        px-6
        py-2
        shadow-[0_4px_20px_rgba(0,0,0,0.15)]
        lg:flex
      "
    >
      <div
        className="
          flex
          h-full
          items-center
          justify-center
          gap-1
          rounded-full
          border
          border-white/10
          bg-white/[0.06]
          px-2
          py-1
          backdrop-blur-md
        "
      >
        {links.map((link) => (
          <NavLink
            key={link.name}
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
                    text-white/95
                    hover:bg-white/10
                    hover:text-[#ffd000]
                  `
              }
            `
            }
          >
            <span className="relative z-10 flex items-center gap-1.5">
              {link.name}

              {link.dropdown && (
                <span
                  className="
                    flex
                    h-[15px]
                    w-[15px]
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    text-[7px]
                    transition-all
                    duration-300
                    group-hover:rotate-180
                    group-hover:bg-[#ffd000]
                    group-hover:text-[#075b70]
                  "
                >
                  ▼
                </span>
              )}
            </span>

            {/* Premium hover underline */}
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
        ))}
      </div>
    </nav>
  );
}

export default Navbar;