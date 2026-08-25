import React from "react";

function ServiceCard({
  icon,
  title,
  description,
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#d9eef2]
        bg-gradient-to-br
        from-white
        via-white
        to-[#f3fbfc]
        p-7
        text-center
        shadow-[0_10px_35px_rgba(8,127,157,0.08)]
        transition-all
        duration-500
        ease-out

        hover:-translate-y-3
        hover:border-[#8dd5df]
        hover:shadow-[0_20px_50px_rgba(8,127,157,0.18)]
      "
    >
      {/* Decorative top glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-12
          -top-12
          h-32
          w-32
          rounded-full
          bg-[#087f9d]/10
          blur-2xl
          transition-all
          duration-500

          group-hover:bg-[#ffd000]/20
          group-hover:scale-150
        "
      />

      {/* Decorative bottom glow */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-16
          -left-16
          h-36
          w-36
          rounded-full
          bg-[#087f9d]/5
          blur-2xl
          transition-all
          duration-500

          group-hover:bg-[#087f9d]/10
          group-hover:scale-125
        "
      />

      {/* Content */}

      <div className="relative z-10">

        {/* Icon */}

        <div
          className="
            relative
            mx-auto
            mb-6
            flex
            h-[78px]
            w-[78px]
            items-center
            justify-center
            rounded-2xl
            border
            border-[#bde6ec]
            bg-gradient-to-br
            from-[#eafafd]
            to-[#d7f2f6]
            text-3xl
            text-[#087f9d]
            shadow-[0_8px_20px_rgba(8,127,157,0.10)]
            transition-all
            duration-500

            group-hover:-translate-y-1
            group-hover:rotate-2
            group-hover:border-[#087f9d]
            group-hover:bg-gradient-to-br
            group-hover:from-[#087f9d]
            group-hover:to-[#075d72]
            group-hover:text-white
            group-hover:shadow-[0_10px_25px_rgba(8,127,157,0.25)]
          "
        >
          {/* Icon glow */}

          <span
            className="
              absolute
              inset-[-5px]
              -z-10
              rounded-2xl
              border
              border-[#087f9d]/10
              opacity-0
              transition-all
              duration-500

              group-hover:scale-110
              group-hover:opacity-100
            "
          />

          <span className="relative z-10">
            {icon}
          </span>
        </div>

        {/* Title */}

        <h3
          className="
            mb-3
            text-xl
            font-extrabold
            tracking-tight
            text-[#164653]
            transition-colors
            duration-300

            group-hover:text-[#087f9d]
          "
        >
          {title}
        </h3>

        {/* Description */}

        <p
          className="
            mx-auto
            mb-6
            max-w-[280px]
            text-sm
            leading-6
            text-gray-500
            transition-colors
            duration-300

            group-hover:text-gray-600
          "
        >
          {description}
        </p>

        {/* Explore Button */}

        <button
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-[#087f9d]
            bg-transparent
            px-6
            py-2.5
            text-sm
            font-bold
            text-[#087f9d]
            transition-all
            duration-300

            group-hover:border-[#087f9d]
            group-hover:bg-[#087f9d]
            group-hover:text-white
            group-hover:shadow-[0_8px_20px_rgba(8,127,157,0.22)]
          "
        >
          <span>Explore</span>

          <span
            className="
              text-base
              transition-transform
              duration-300

              group-hover:translate-x-1
            "
          >
            →
          </span>
        </button>

      </div>

      {/* Bottom accent */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-1
          w-0
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-[#087f9d]
          via-[#ffd000]
          to-[#087f9d]
          transition-all
          duration-500

          group-hover:w-1/2
        "
      />
    </div>
  );
}

export default ServiceCard;