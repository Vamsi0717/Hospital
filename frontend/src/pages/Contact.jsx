import React from "react";

function Contact() {

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
          Contact Us
        </h1>

      </div>


      <section
        className="
          bg-[#f7fafb]
          px-[5%]
          py-16
        "
      >

        <div className="mx-auto max-w-3xl">

          <div
            className="
              rounded-lg
              bg-white
              p-10
              text-center
              shadow-card
            "
          >

            <h2
              className="
                mb-8
                text-3xl
                font-bold
                text-[#087f9d]
              "
            >
              Get in Touch
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-bold">
                  ☎ Helpline
                </h3>

                <p className="mt-1 text-gray-600">
                  1800-500-1066
                </p>
              </div>


              <div>
                <h3 className="font-bold">
                  ✉ Email
                </h3>

                <p className="mt-1 text-gray-600">
                  support@medicare.com
                </p>
              </div>


              <div>
                <h3 className="font-bold">
                  📍 Address
                </h3>

                <p className="mt-1 text-gray-600">
                  Hyderabad, Telangana, India
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}

export default Contact;