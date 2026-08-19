import React from "react";

import SearchBar from "./SearchBar";

function Header() {
  return (
    <header
      className="
        flex
        min-h-[105px]
        flex-col
        items-center
        justify-between
        gap-5
        bg-white
        px-5
        py-5

        lg:flex-row
        lg:px-[4%]
      "
    >

      {/* LOGO */}

      <div className="shrink-0">

        <h1
          className="
            text-3xl
            font-extrabold
            leading-none
            text-[#087f9d]
          "
        >
          MEDICARE
        </h1>

        <p
          className="
            mt-1
            text-center
            text-xs
            font-bold
            tracking-[4px]
            text-[#087f9d]
          "
        >
          HEALTHCARE
        </p>

      </div>


      {/* SEARCH */}

      <SearchBar />


      {/* RIGHT */}

      <div
        className="
          hidden
          items-center
          gap-2
          lg:flex
        "
      >

        {/* Emergency */}

        <div
          className="
            flex
            h-12
            w-36
            flex-col
            items-center
            justify-center
            bg-red-600
            text-white
          "
        >

          <span className="text-[10px] font-bold">
            EMERGENCY
          </span>

          <strong className="text-base">
            1066
          </strong>

        </div>


        {/* Helpline */}

        <div
          className="
            flex
            h-12
            w-48
            items-center
            justify-center
            gap-2
            bg-[#214a59]
            text-white
          "
        >

          <span className="text-2xl">
            ☎
          </span>

          <div>

            <small className="block text-[9px]">
              24/7 HELPLINE
            </small>

            <strong className="text-xs">
              1800-500-1066
            </strong>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;