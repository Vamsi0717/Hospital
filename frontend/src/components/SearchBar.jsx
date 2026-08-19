import React, { useState } from "react";

function SearchBar() {

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!search.trim()) {
      alert("Please enter something to search");
      return;
    }

    alert(`Searching for: ${search}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        h-11
        w-full
        max-w-xl
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
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          h-full
          flex-1
          px-5
          text-sm
          outline-none
        "
      />

      <button
        type="submit"
        className="
          px-4
          text-2xl
          text-gray-700
          hover:text-[#0783a0]
        "
      >
        ⌕
      </button>

    </form>
  );
}

export default SearchBar;