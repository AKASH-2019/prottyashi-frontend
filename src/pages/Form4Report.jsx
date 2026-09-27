import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Form4SchoolPage
  from "../components/Form4SchoolPage";

import {
  getForm4Report,
} from "../services/reportService";

export default function Form4Report() {

  const { month, year } =
    useParams();

  const [report,
    setReport] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const loadData =
      async () => {

        try {

          console.log(
            "Loading Form4:",
            month,
            year
          );

          const data =
            await getForm4Report(
              month,
              year
            );

          setReport(data);

        } catch (error) {

          console.error(
            "Form4 Error:",
            error
          );

        } finally {

          setLoading(false);

        }
      };

    loadData();

  }, [month, year]);

  if (loading) {
    return (
      <div className="p-5">
        Loading...
      </div>
    );
  }

  if (
    !report ||
    !report.schools
  ) {
    return (
      <div className="p-5 text-red-600">
        No report data found
      </div>
    );
  }

  return (

    <div className="p-5">

      <button
        onClick={() =>
          window.print()
        }
        className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded
          mb-5
          print:hidden
        "
      >
        Download PDF
      </button>

      {report.schools.length === 0 ? (

        <div className="
          bg-white
          p-8
          rounded
          text-center
          text-red-600
          font-semibold
        ">
          এই মাসের কোনো তথ্য পাওয়া যায়নি
        </div>

      ) : (

        report.schools.map(
          (
            school,
            i
          ) => (

            <Form4SchoolPage
              key={
                school.school_id
              }
              school={school}
              month={Number(month)}
              year={Number(year)}
              isLast={
                i ===
                report.schools.length - 1
              }
            />

          )
        )

      )}

    </div>

  );
}


// import {
//   useEffect,
//   useState,
// } from "react";

// import Form4SchoolPage
//   from "../components/Form4SchoolPage";
// import { useSearchParams } from 'react-router-dom';


// import {
//   getForm4Report,
// } from "../services/reportService";

// export default function Form4Report() {

//   const [report,
//     setReport] =
//     useState(null);
// const [searchParams] = useSearchParams(); 

//   const month = searchParams.get("month") || 9;
//   const year = searchParams.get("year") || 2026;

//   useEffect(() => {

//     loadData();

//   }, []);

//   const loadData =
//     async () => {

//       const data =
//         await getForm4Report(
//           month,
//           year
//         );

//       setReport(data);
//     };

//   if (!report)
//     return (
//       <div>
//         Loading...
//       </div>
//     );

//   return (

//     <div className="p-5">

//       <button
//         onClick={() =>
//           window.print()
//         }
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Download PDF
//       </button>

//       {report.schools.map((school, i) => (
//         <Form4SchoolPage
//             key={school.school_id}
//             school={school}
//             month={9}
//             year={2026}
//             isLast={i === report.schools.length - 1}
//         />
//         ))}

//     </div>

//   );
// }