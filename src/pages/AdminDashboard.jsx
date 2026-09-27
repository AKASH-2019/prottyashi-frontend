import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { getDashboardData } from "../services/dashboardService";

export default function AdminDashboard() {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const result =
          await getDashboardData();

        setData(result);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    loadDashboard();

  }, []);

  if (loading) {

    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );

  }

  return (

    <MainLayout>

      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 -m-6 p-4 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-sky-800">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">

        <div className="bg-white p-3 sm:p-5 rounded-xl shadow border border-sky-100">
          <h3 className="font-semibold text-xs sm:text-sm text-gray-500">
            Total Students
          </h3>

          <p className="text-xl sm:text-2xl font-bold text-sky-800 mt-1">
            {data?.total_students}
          </p>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl shadow border border-sky-100">
          <h3 className="font-semibold text-xs sm:text-sm text-gray-500">
            Total Delivered
          </h3>

          <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">
            {data?.total_food_delivered}
          </p>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl shadow border border-sky-100">
          <h3 className="font-semibold text-xs sm:text-sm text-gray-500">
            Total Shortfall
          </h3>

          <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">
            {data?.total_shortfall}
          </p>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl shadow border border-sky-100">
          <h3 className="font-semibold text-xs sm:text-sm text-gray-500">
            Total Bun
          </h3>

          <p className="text-xl sm:text-2xl font-bold text-sky-800 mt-1">
            {data?.total_bun}
          </p>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl shadow border border-sky-100">
          <h3 className="font-semibold text-xs sm:text-sm text-gray-500">
            Total Egg
          </h3>

          <p className="text-xl sm:text-2xl font-bold text-sky-800 mt-1">
            {data?.total_egg}
          </p>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl shadow border border-sky-100">
          <h3 className="font-semibold text-xs sm:text-sm text-gray-500">
            Total Banana
          </h3>

          <p className="text-xl sm:text-2xl font-bold text-sky-800 mt-1">
            {data?.total_banana}
          </p>
        </div>

      </div>

      {/* School Wise Report */}

      <div className="mt-8 bg-white p-3 sm:p-5 rounded-xl shadow border border-sky-100">

        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-sky-800">
          School Wise Delivery
        </h2>

        {/* Desktop / tablet table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-sky-500">

                <th className="border border-sky-600 p-2 text-white">
                  School
                </th>

                <th className="border border-sky-600 p-2 text-white">
                  Students
                </th>

                <th className="border border-sky-600 p-2 text-white">
                  Bun
                </th>

                <th className="border border-sky-600 p-2 text-white">
                  Egg
                </th>

                <th className="border border-sky-600 p-2 text-white">
                  Banana
                </th>

                <th className="border border-sky-600 p-2 text-white">
                  Delivered
                </th>

                <th className="border border-sky-600 p-2 text-white">
                  Shortfall
                </th>

              </tr>

            </thead>

            <tbody>

              {data?.schools?.map((school) => (

                <tr
                  key={school.school_id}
                  className="hover:bg-sky-50/50"
                >

                  <td className="border border-sky-100 p-2">
                    {school.school_name}
                  </td>

                  <td className="border border-sky-100 p-2 text-center">
                    {school.student_count}
                  </td>

                  <td className="border border-sky-100 p-2 text-center">
                    {school.bun_delivered}
                  </td>

                  <td className="border border-sky-100 p-2 text-center">
                    {school.egg_delivered}
                  </td>

                  <td className="border border-sky-100 p-2 text-center">
                    {school.banana_delivered}
                  </td>

                  <td className="border border-sky-100 p-2 text-center font-semibold">
                    {school.food_delivered}
                  </td>

                  <td
                    className={`border border-sky-100 p-2 text-center font-semibold ${
                      school.shortfall > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {school.shortfall}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

        {/* Mobile card layout */}
        <div className="md:hidden flex flex-col gap-3">
          {data?.schools?.map((school) => (
            <div
              key={school.school_id}
              className="border border-sky-100 rounded-xl p-3 bg-sky-50/40"
            >
              <p className="font-semibold text-sky-800 mb-2">
                {school.school_name}
              </p>

              <div className="grid grid-cols-3 gap-2">
                <div className="border border-sky-100 rounded-lg p-2 bg-white">
                  <span className="text-[11px] text-gray-400 uppercase">Students</span>
                  <p className="text-sm font-semibold">{school.student_count}</p>
                </div>
                <div className="border border-sky-100 rounded-lg p-2 bg-white">
                  <span className="text-[11px] text-gray-400 uppercase">Bun</span>
                  <p className="text-sm font-semibold">{school.bun_delivered}</p>
                </div>
                <div className="border border-sky-100 rounded-lg p-2 bg-white">
                  <span className="text-[11px] text-gray-400 uppercase">Egg</span>
                  <p className="text-sm font-semibold">{school.egg_delivered}</p>
                </div>
                <div className="border border-sky-100 rounded-lg p-2 bg-white">
                  <span className="text-[11px] text-gray-400 uppercase">Banana</span>
                  <p className="text-sm font-semibold">{school.banana_delivered}</p>
                </div>
                <div className="border border-sky-100 rounded-lg p-2 bg-white">
                  <span className="text-[11px] text-gray-400 uppercase">Delivered</span>
                  <p className="text-sm font-semibold">{school.food_delivered}</p>
                </div>
                <div className="border border-sky-100 rounded-lg p-2 bg-white">
                  <span className="text-[11px] text-gray-400 uppercase">Shortfall</span>
                  <p
                    className={`text-sm font-semibold ${
                      school.shortfall > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {school.shortfall}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Shortfall Schools */}

      <div className="mt-8 bg-white p-3 sm:p-5 rounded-xl shadow border border-sky-100">

        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-sky-800">
          Schools With Shortfall
        </h2>

        {data?.shortfall_schools?.length === 0 ? (

          <p className="text-green-600 font-medium">
            No shortfall today.
          </p>

        ) : (
          <>
            {/* Desktop / tablet table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-sky-500">

                    <th className="border border-sky-600 p-2 text-white">
                      School
                    </th>

                    <th className="border border-sky-600 p-2 text-white">
                      Shortfall
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {data.shortfall_schools.map(
                    (school) => (

                      <tr
                        key={school.school_id}
                        className="hover:bg-sky-50/50"
                      >

                        <td className="border border-sky-100 p-2">
                          {school.school_name}
                        </td>

                        <td className="border border-sky-100 p-2 text-center text-red-600 font-semibold">
                          {school.shortfall}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>
            </div>

            {/* Mobile card layout */}
            <div className="md:hidden flex flex-col gap-2">
              {data.shortfall_schools.map((school) => (
                <div
                  key={school.school_id}
                  className="flex items-center justify-between border border-sky-100 rounded-lg p-3 bg-sky-50/40"
                >
                  <span className="text-sm font-medium text-sky-800">
                    {school.school_name}
                  </span>
                  <span className="text-sm font-semibold text-red-600">
                    {school.shortfall}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      </div>

    </MainLayout>

  );

}


// import { useEffect, useState } from "react";

// import MainLayout from "../layouts/MainLayout";

// import { getDashboardData } from "../services/dashboardService";

// export default function AdminDashboard() {

//   const [data, setData] = useState(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const loadDashboard = async () => {

//       try {

//         const result =
//           await getDashboardData();

//         setData(result);

//       } catch (error) {

//         console.error(error);

//       } finally {

//         setLoading(false);

//       }

//     };

//     loadDashboard();

//   }, []);

//   if (loading) {

//     return (
//       <MainLayout>
//         <p>Loading...</p>
//       </MainLayout>
//     );

//   }

//   return (

//     <MainLayout>

//       <h1 className="text-3xl font-bold mb-6">
//         Admin Dashboard
//       </h1>

//       {/* Summary Cards */}

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">

//         <div className="bg-white p-5 rounded shadow">
//           <h3 className="font-semibold">
//             Total Students
//           </h3>

//           <p className="text-2xl font-bold">
//             {data?.total_students}
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded shadow">
//           <h3 className="font-semibold">
//             Total Delivered
//           </h3>

//           <p className="text-2xl font-bold text-green-600">
//             {data?.total_food_delivered}
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded shadow">
//           <h3 className="font-semibold">
//             Total Shortfall
//           </h3>

//           <p className="text-2xl font-bold text-red-600">
//             {data?.total_shortfall}
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded shadow">
//           <h3 className="font-semibold">
//             Total Bun
//           </h3>

//           <p className="text-2xl font-bold">
//             {data?.total_bun}
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded shadow">
//           <h3 className="font-semibold">
//             Total Egg
//           </h3>

//           <p className="text-2xl font-bold">
//             {data?.total_egg}
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded shadow">
//           <h3 className="font-semibold">
//             Total Banana
//           </h3>

//           <p className="text-2xl font-bold">
//             {data?.total_banana}
//           </p>
//         </div>

//       </div>

//       {/* School Wise Report */}

//       <div className="mt-8 bg-white p-5 rounded shadow overflow-x-auto">

//         <h2 className="text-xl font-semibold mb-4">
//           School Wise Delivery
//         </h2>

//         <table className="w-full border-collapse border">

//           <thead>

//             <tr className="bg-gray-100">

//               <th className="border p-2">
//                 School
//               </th>

//               <th className="border p-2">
//                 Students
//               </th>

//               <th className="border p-2">
//                 Bun
//               </th>

//               <th className="border p-2">
//                 Egg
//               </th>

//               <th className="border p-2">
//                 Banana
//               </th>

//               <th className="border p-2">
//                 Delivered
//               </th>

//               <th className="border p-2">
//                 Shortfall
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {data?.schools?.map((school) => (

//               <tr
//                 key={school.school_id}
//               >

//                 <td className="border p-2">
//                   {school.school_name}
//                 </td>

//                 <td className="border p-2 text-center">
//                   {school.student_count}
//                 </td>

//                 <td className="border p-2 text-center">
//                   {school.bun_delivered}
//                 </td>

//                 <td className="border p-2 text-center">
//                   {school.egg_delivered}
//                 </td>

//                 <td className="border p-2 text-center">
//                   {school.banana_delivered}
//                 </td>

//                 <td className="border p-2 text-center font-semibold">
//                   {school.food_delivered}
//                 </td>

//                 <td
//                   className={`border p-2 text-center font-semibold ${
//                     school.shortfall > 0
//                       ? "text-red-600"
//                       : "text-green-600"
//                   }`}
//                 >
//                   {school.shortfall}
//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//       {/* Shortfall Schools */}

//       <div className="mt-8 bg-white p-5 rounded shadow">

//         <h2 className="text-xl font-semibold mb-4">
//           Schools With Shortfall
//         </h2>

//         {data?.shortfall_schools?.length === 0 ? (

//           <p className="text-green-600 font-medium">
//             No shortfall today.
//           </p>

//         ) : (

//           <table className="w-full border">

//             <thead>

//               <tr>

//                 <th className="border p-2">
//                   School
//                 </th>

//                 <th className="border p-2">
//                   Shortfall
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {data.shortfall_schools.map(
//                 (school) => (

//                   <tr
//                     key={school.school_id}
//                   >

//                     <td className="border p-2">
//                       {school.school_name}
//                     </td>

//                     <td className="border p-2 text-center text-red-600 font-semibold">
//                       {school.shortfall}
//                     </td>

//                   </tr>

//                 )
//               )}

//             </tbody>

//           </table>

//         )}

//       </div>

//     </MainLayout>

//   );

// }