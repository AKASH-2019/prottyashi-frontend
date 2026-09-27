// src/pages/Reports.jsx

import { Link } from "react-router-dom";
import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

export default function Reports() {

  const now = new Date();

  const [month, setMonth] = useState(
    now.getMonth() + 1
  );

  const [year, setYear] = useState(
    now.getFullYear()
  );

  const monthNames = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const reports = [
    {
      title: "নমুনা ফরম-৪",
      subtitle: "সম্মিলিত প্রতিবেদন",
      path: `/reports/form4/${month}/${year}`,
    },
    {
      title: "নমুনা ফরম-৭",
      subtitle: "সম্মিলিত প্রতিবেদন",
      path: `/reports/form07/${month}/${year}`,
    },
    {
      title: "নমুনা ফরম-১০",
      subtitle: "সম্মিলিত প্রতিবেদন",
      path: `/reports/form10/${month}/${year}`,
    },
    {
      title: "নমুনা ফরম-১২",
      subtitle: "সম্মিলিত প্রতিবেদন",
      path: `/reports/form12/${month}/${year}`,
    },
    {
      title: "নমুনা ফরম-১৩",
      subtitle: "সম্মিলিত প্রতিবেদন",
      path: `/reports/form13/${month}/${year}`,
    },
  ];

  const years = [];

  for (
    let y = now.getFullYear() - 2;
    y <= now.getFullYear() + 5;
    y++
  ) {
    years.push(y);
  }

  return (
    <MainLayout>

      <div className="bg-white rounded-3xl shadow p-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

          <h2 className="text-2xl font-bold text-purple-700">
            সম্মিলিত প্রতিবেদন (
            {monthNames[month - 1]} {year}
            )
          </h2>

          <div className="flex gap-3">

            {/* Month */}

            <select
              value={month}
              onChange={(e) =>
                setMonth(
                  Number(e.target.value)
                )
              }
              className="
                border
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
              "
            >
              {monthNames.map(
                (name, index) => (
                  <option
                    key={index}
                    value={index + 1}
                  >
                    {name}
                  </option>
                )
              )}
            </select>

            {/* Year */}

            <select
              value={year}
              onChange={(e) =>
                setYear(
                  Number(e.target.value)
                )
              }
              className="
                border
                rounded-lg
                px-4
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
              "
            >
              {years.map((y) => (
                <option
                  key={y}
                  value={y}
                >
                  {y}
                </option>
              ))}
            </select>

          </div>

        </div>

        <div className="h-[2px] bg-blue-700 mb-8"></div>

        {/* Report Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {reports.map((report) => (

            <Link
              key={report.title}
              to={report.path}
              className="
                bg-gradient-to-r
                from-purple-600
                via-purple-700
                to-blue-700
                text-white
                rounded-2xl
                shadow-lg
                p-8
                flex
                flex-col
                items-center
                justify-center
                min-h-[170px]
                hover:scale-105
                transition-all
                duration-300
              "
            >

              <h3 className="text-2xl font-bold text-center">
                {report.title}
              </h3>

              <p className="text-sm mt-2 opacity-90 text-center">
                {report.subtitle}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </MainLayout>
  );
}


// // src/pages/Reports.jsx

// import { Link } from "react-router-dom";

// // import {
// //   Utensils,
// //   Truck,
// //   FileText,
// //   Package,
// //   Briefcase,
// //   CalendarDays,
// // } from "lucide-react";

// import MainLayout from "../layouts/MainLayout";

// export default function Reports() {

//   const now = new Date();
//   const month = now.getMonth() + 1;
//   const year = now.getFullYear();

//   const reports = [
//     {
//       title: "নমুনা ফরম-৪",
//       subtitle: "সম্মিলিত প্রতিবেদন",
//       path: `/reports/form4/${month}/${year}`,
//     },
//     {
//       title: "নমুনা ফরম-৭",
//       subtitle: "সম্মিলিত প্রতিবেদন",
//       path: `/reports/form07/${month}/${year}`,
//     },
//     {
//       title: "নমুনা ফরম-১০",
//       subtitle: "সম্মিলিত প্রতিবেদন",
//       path: `/reports/form10/${month}/${year}`,
//     },
//     {
//       title: "নমুনা ফরম-১২",
//       subtitle: "সম্মিলিত প্রতিবেদন",
//       path: `/reports/form12/${month}/${year}`,
//     },
//     {
//       title: "নমুনা ফরম-১৩",
//       subtitle: "সম্মিলিত প্রতিবেদন",
//       path: `/reports/form13/${month}/${year}`,
//     },
//   ];

//   return (
//     <MainLayout>

//       <div className="bg-white rounded-3xl shadow p-6">

//         {/* Header */}

//         <div className="flex items-center gap-3 mb-4">

//           {/* <CalendarDays
//             size={24}
//             className="text-purple-700"
//           /> */}

//           <h2 className="text-2xl font-bold text-purple-700">
//             সম্মিলিত প্রতিবেদন (৩১ দিন)
//           </h2>

//           <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
//             শনিবার + সরকারি ছুটি
//           </span>

//         </div>

//         <div className="h-[2px] bg-blue-700 mb-8"></div>

//         {/* Report Cards */}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

//           {reports.map((report) => (

//             <Link
//               key={report.title}
//               to={report.path}
//               className="
//                 bg-gradient-to-r
//                 from-purple-600
//                 via-purple-700
//                 to-blue-700
//                 text-white
//                 rounded-2xl
//                 shadow-lg
//                 p-8
//                 flex
//                 flex-col
//                 items-center
//                 justify-center
//                 min-h-[170px]
//                 hover:scale-105
//                 transition-all
//                 duration-300
//               "
//             >

//               <div className="mb-4">
//                 {report.icon}
//               </div>

//               <h3 className="text-2xl font-bold text-center">
//                 {report.title}
//               </h3>

//               <p className="text-sm mt-2 opacity-90 text-center">
//                 {report.subtitle}
//               </p>

//             </Link>

//           ))}

//         </div>

//       </div>

//     </MainLayout>
//   );
// }