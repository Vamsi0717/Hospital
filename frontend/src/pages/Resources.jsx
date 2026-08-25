import React from "react";
import { Link } from "react-router-dom";

function Resources() {
  const resources = [
    {
      title: "Health Blog",
      description:
        "Read articles and expert information about common health conditions and treatments.",
      icon: "📰",
      path: "/resources/blog",
    },
    {
      title: "Health Tips",
      description:
        "Simple and practical tips to help you maintain a healthy lifestyle.",
      icon: "💚",
      path: "/resources/health-tips",
    },
    {
      title: "FAQs",
      description:
        "Find answers to common questions about appointments, treatments and our services.",
      icon: "❓",
      path: "/resources/faqs",
    },
    {
      title: "Patient Stories",
      description:
        "Read experiences and recovery stories from our patients.",
      icon: "❤️",
      path: "/resources/patient-stories",
    },
    {
      title: "Health Videos",
      description:
        "Watch educational videos from healthcare professionals and specialists.",
      icon: "▶️",
      path: "/resources/videos",
    },
    {
      title: "Downloadable Resources",
      description:
        "Download useful healthcare guides and patient information.",
      icon: "📥",
      path: "/resources/downloads",
    },
  ];

  return (
    <div className="bg-[#f7fafb]">

      {/* Hero */}

      <section
        className="
          flex
          min-h-[320px]
          items-center
          justify-center
          bg-[#087f9d]
          px-[5%]
          text-center
          text-white
        "
      >
        <div>

          <p
            className="
              mb-4
              font-semibold
              text-[#ffd000]
            "
          >
            MEDICARE HEALTHCARE
          </p>

          <h1
            className="
              text-4xl
              font-bold
              md:text-5xl
            "
          >
            Resources
          </h1>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              leading-7
              text-white/90
            "
          >
            Explore our healthcare resources, health
            information, patient guides and helpful tips.
          </p>

        </div>
      </section>


      {/* Resource cards */}

      <section className="px-[5%] py-16">

        <div className="mx-auto max-w-6xl">

          <h2
            className="
              text-center
              text-3xl
              font-bold
              text-[#075b70]
            "
          >
            Explore Our Resources
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-center
              text-gray-600
            "
          >
            Helpful information to support you and
            your family on your healthcare journey.
          </p>


          <div
            className="
              mt-10
              grid
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            {resources.map((resource) => (

              <Link
                key={resource.title}
                to={resource.path}
                className="
                  group
                  rounded-xl
                  border
                  border-gray-100
                  bg-white
                  p-7
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#087f9d]
                  hover:shadow-lg
                "
              >

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-[#e8f6f8]
                    text-2xl
                    transition
                    group-hover:bg-[#087f9d]
                  "
                >
                  {resource.icon}
                </div>


                <h3
                  className="
                    mt-5
                    text-xl
                    font-bold
                    text-[#075b70]
                  "
                >
                  {resource.title}
                </h3>


                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-gray-600
                  "
                >
                  {resource.description}
                </p>


                <div
                  className="
                    mt-5
                    font-semibold
                    text-[#087f9d]
                  "
                >
                  Explore →
                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* CTA */}

      <section
        className="
          bg-[#075b70]
          px-[5%]
          py-14
          text-center
        "
      >

        <h2 className="text-3xl font-bold text-white">
          Need More Information?
        </h2>

        <p
          className="
            mx-auto
            mt-3
            max-w-xl
            text-white/80
          "
        >
          Our team is available to help you with
          your healthcare questions and appointments.
        </p>

        <Link
          to="/contact"
          className="
            mt-7
            inline-block
            rounded-lg
            bg-[#ffd000]
            px-7
            py-3
            font-semibold
            text-gray-900
            transition
            hover:bg-yellow-400
          "
        >
          Contact Us
        </Link>

      </section>

    </div>
  );
}

export default Resources;
