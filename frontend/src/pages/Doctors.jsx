// import React from "react";

// import DoctorCard from "../components/DoctorCard";

// import doctors from "../data/doctors";

// function Doctors() {

//   return (
//     <>

//       <PageBanner title="Our Doctors" />

//       <section className="px-[5%] py-16">

//         <div className="mx-auto max-w-7xl">

//           <h2
//             className="
//               mb-3
//               text-center
//               text-3xl
//               font-bold
//               text-[#087f9d]
//             "
//           >
//             Find the Right Doctor
//           </h2>

//           <p className="mb-10 text-center text-gray-500">
//             Experienced specialists ready to care for you
//           </p>

//           <div
//             className="
//               grid
//               gap-6

//               sm:grid-cols-2
//               lg:grid-cols-4
//             "
//           >

//             {doctors.map((doctor) => (
//               <DoctorCard
//                 key={doctor.id}
//                 doctor={doctor}
//               />
//             ))}

//           </div>

//         </div>

//       </section>

//     </>
//   );
// }

// function PageBanner({ title }) {

//   return (
//     <div
//       className="
//         flex
//         h-56
//         items-center
//         justify-center
//         bg-[#087f9d]
//         text-white
//       "
//     >

//       <h1 className="text-4xl font-bold">
//         {title}
//       </h1>

//     </div>
//   );
// }

// export default Doctors;




import React, { useEffect, useState } from "react";

import DoctorCard from "../components/DoctorCard";

import { getDoctors } from "../services/api";

function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {

    const fetchDoctors = async () => {

      try {

        const response = await getDoctors();
        setDoctors(response.data);

      } catch (error) {

        console.error(error);
        setErrorMsg("Unable to load doctors right now. Please try again later.");

      } finally {

        setLoading(false);

      }

    };

    fetchDoctors();

  }, []);

  return (
    <>

      <PageBanner title="Our Doctors" />

      <section className="px-[5%] py-16">

        <div className="mx-auto max-w-7xl">

          <h2
            className="
              mb-3
              text-center
              text-3xl
              font-bold
              text-[#087f9d]
            "
          >
            Find the Right Doctor
          </h2>

          <p className="mb-10 text-center text-gray-500">
            Experienced specialists ready to care for you
          </p>

          {loading && (
            <p className="text-center text-gray-500">Loading doctors...</p>
          )}

          {!loading && errorMsg && (
            <p className="text-center text-red-600">{errorMsg}</p>
          )}

          {!loading && !errorMsg && doctors.length === 0 && (
            <p className="text-center text-gray-500">No doctors found.</p>
          )}

          {!loading && !errorMsg && doctors.length > 0 && (
            <div
              className="
                grid
                gap-6

                sm:grid-cols-2
                lg:grid-cols-4
              "
            >

              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                />
              ))}

            </div>
          )}

        </div>

      </section>

    </>
  );
}

function PageBanner({ title }) {

  return (
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
        {title}
      </h1>

    </div>
  );
}

export default Doctors;