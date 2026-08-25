import React, {
  useEffect,
  useState,
} from "react";

const slides = [
  {
    image: "/images/hero1.jpg",

    subtitle:
      "From humble beginnings to better healthcare",

    title:
      "COMPASSIONATE CARE FOR EVERY COMMUNITY",
  },

  {
    image: "/images/hero2.jpg",

    subtitle:
      "Advanced technology. Experienced specialists.",

    title:
      "YOUR HEALTH IS OUR HIGHEST PRIORITY",
  },

  {
    image: "/images/hero3.jpg",

    subtitle:
      "Healthcare designed around you",

    title:
      "EXPERT CARE FOR A HEALTHIER TOMORROW",
  },
];

function Hero() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrent((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );

    }, 5000);

    return () => clearInterval(timer);

  }, []);

  const slide = slides[current];

  return (
    <section
      className="
        relative
        flex
        min-h-[480px]
        items-center
        justify-center
        overflow-hidden
        bg-cover
        bg-center
        text-center
      "
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,135,165,.70),
            rgba(0,135,165,.70)
          ),
          url(${slide.image})
        `,
      }}
    >

      {/* Decorative circles */}

      <div
        className="
          absolute
          left-[7%]
          top-[15%]
          hidden
          h-28
          w-28
          rounded-full
          border-[8px]
          border-yellow-400
          opacity-90

          md:block
        "
      />

      <div
        className="
          absolute
          right-[8%]
          bottom-[18%]
          hidden
          h-32
          w-32
          rounded-full
          border-[8px]
          border-yellow-400
          opacity-90

          md:block
        "
      />


      {/* Content */}

      <div className="relative z-10 max-w-4xl px-5 text-white">

        <p
          className="
            mb-3
            text-lg
            font-bold
            text-yellow-400

            md:text-2xl
          "
        >
          {slide.subtitle}
        </p>

        <h1
          className="
            mb-7
            text-3xl
            font-extrabold
            leading-tight

            md:text-5xl
          "
        >
          {slide.title}
        </h1>

        <button
          className="
            rounded
            bg-yellow-400
            px-7
            py-3
            font-bold
            text-gray-900
            transition
            hover:bg-white
          "
        >
          ▶ LEARN MORE
        </button>

      </div>


      {/* Dots */}

      <div
        className="
          absolute
          bottom-6
          flex
          gap-2
        "
      >

        {slides.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              h-3
              w-3
              rounded-full
              border-none

              ${
                current === index
                  ? "bg-yellow-400"
                  : "bg-white"
              }
            `}
          />

        ))}

      </div>

    </section>
  );
}

export default Hero;