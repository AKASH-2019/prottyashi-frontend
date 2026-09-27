import { Fragment } from "react";

const ITEM_COLUMNS = [
  { key: "bun",    label: "বনরুটি" },
  { key: "egg",    label: "সিদ্ধ ডিম" },
  { key: "banana", label: "কলা" },
];

export default function Form12SchoolPage({ school, month, year, isLast }) {
  const safe = (value) =>
    value === null || value === undefined || value === "" ? "-" : value;

  const stock = (key) => school[key] ?? {};

  return (
    <div
      className={`bg-white p-4 sm:p-8 border border-black ${
        isLast ? "" : "print:break-after-page"
      } mb-10 print:mb-0`}
    >
      <div className="flex justify-end">
        <div className="border-2 border-black px-4 py-1 font-bold text-xs sm:text-sm">
          নমুনা ফরম-১২
        </div>
      </div>

      <h1 className="text-center text-base sm:text-xl font-bold -mt-6">
        সরকারি প্রাথমিক বিদ্যালয়ে ফিডিং কর্মসূচি
      </h1>
      <h2 className="text-center text-sm sm:text-lg font-semibold mt-1">
        বিদ্যালয়ের মাসিক স্টক প্রতিবেদন
      </h2>
      <p className="text-center font-semibold mt-1 mb-4 text-sm sm:text-base">
        মাস: {safe(month)}&nbsp;&nbsp;&nbsp;&nbsp;সাল: {safe(year)}
      </p>

      {/* Info box — only fields your JSON actually has */}
      <div className="overflow-x-auto print:overflow-visible">
      <table className="w-full min-w-[500px] print:min-w-0 border-collapse text-xs sm:text-sm mb-0">
        <tbody>
          <tr>
            <td className="border border-black px-3 py-2 font-semibold w-40">বিদ্যালয়ের নাম:</td>
            <td className="border border-black px-3 py-2">{safe(school.school_name)}</td>
            <td className="border border-black px-3 py-2 font-semibold w-40">ইএমআইএস কোড:</td>
            <td className="border border-black px-3 py-2">{safe(school.emis_code)}</td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* Stock table — no total column, no total row */}
      <div className="overflow-x-auto print:overflow-visible">
      <table className="w-full min-w-[700px] print:min-w-0 border-collapse text-xs mt-4">
        <thead>
          <tr className="bg-gray-100">
            {ITEM_COLUMNS.map((col) => (
              <th key={col.key} colSpan={3} className="border border-black p-2">
                {col.label}
              </th>
            ))}
          </tr>
          <tr className="bg-gray-100">
            {ITEM_COLUMNS.map((col) => (
              <Fragment key={col.key + "-sub"}>
                <th className="border border-black p-2">পূর্ববর্তী মাসের স্থিতিসহ গৃহীত</th>
                <th className="border border-black p-2">বিতরণ</th>
                <th className="border border-black p-2">মাস শেষে স্থিতি</th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="break-inside-avoid">
            {ITEM_COLUMNS.map((col) => {
              const s = stock(col.key);
              return (
                <Fragment key={col.key}>
                  <td className="border border-black p-2 text-center">{safe(s.received)}</td>
                  <td className="border border-black p-2 text-center">{safe(s.distributed)}</td>
                  <td className="border border-black p-2 text-center">{safe(s.balance)}</td>
                </Fragment>
              );
            })}
          </tr>
        </tbody>
      </table>
      </div>

      {/* Signature blocks — stacked on mobile, 2-up on tablet/print */}
      <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 border border-black mt-4 text-sm">
        <div className="border-b sm:border-r border-black p-4 min-h-[110px]">
          <p className="font-semibold mb-10">টিফিন ম্যানেজারের স্বাক্ষর ও সিল:</p>
          <p>তারিখ:</p>
          <p>মোবাইল নম্বর:</p>
        </div>
        <div className="border-b border-black p-4 min-h-[110px]">
          <p className="font-semibold mb-10">প্রধান শিক্ষকের স্বাক্ষর ও সিল:</p>
          <p>তারিখ:</p>
          <p>মোবাইল নম্বর:</p>
        </div>
        <div className="border-b sm:border-r sm:border-b-0 border-black p-4 min-h-[110px]">
          <p className="font-semibold mb-10">সহকারী উপজেলা প্রাথমিক শিক্ষা অফিসারের স্বাক্ষর ও সিল:</p>
          <p>তারিখ:</p>
          <p>মোবাইল নম্বর:</p>
        </div>
        <div className="p-4 min-h-[110px]">
          <p className="font-semibold mb-10">উপজেলা প্রাথমিক শিক্ষা অফিসারের স্বাক্ষর ও সিল:</p>
          <p>তারিখ:</p>
          <p>মোবাইল নম্বর:</p>
        </div>
      </div>
    </div>
  );
}

// import { Fragment } from "react";

// const ITEM_COLUMNS = [
//   { key: "bun",    label: "বনরুটি" },
//   { key: "egg",    label: "সিদ্ধ ডিম" },
//   { key: "banana", label: "কলা" },
// ];

// export default function Form12SchoolPage({ school, month, year, isLast }) {
//   const safe = (value) =>
//     value === null || value === undefined || value === "" ? "-" : value;

//   const stock = (key) => school[key] ?? {};

//   return (
//     <div
//       className={`bg-white p-8 border border-black ${
//         isLast ? "" : "print:break-after-page"
//       } mb-10 print:mb-0`}
//     >
//       <div className="flex justify-end">
//         <div className="border-2 border-black px-4 py-1 font-bold text-sm">
//           নমুনা ফরম-১২
//         </div>
//       </div>

//       <h1 className="text-center text-xl font-bold -mt-6">
//         সরকারি প্রাথমিক বিদ্যালয়ে ফিডিং কর্মসূচি
//       </h1>
//       <h2 className="text-center text-lg font-semibold mt-1">
//         বিদ্যালয়ের মাসিক স্টক প্রতিবেদন
//       </h2>
//       <p className="text-center font-semibold mt-1 mb-4">
//         মাস: {safe(month)}&nbsp;&nbsp;&nbsp;&nbsp;সাল: {safe(year)}
//       </p>

//       {/* Info box — only fields your JSON actually has */}
//       <table className="w-full border-collapse text-sm mb-0">
//         <tbody>
//           <tr>
//             <td className="border border-black px-3 py-2 font-semibold w-40">বিদ্যালয়ের নাম:</td>
//             <td className="border border-black px-3 py-2">{safe(school.school_name)}</td>
//             <td className="border border-black px-3 py-2 font-semibold w-40">ইএমআইএস কোড:</td>
//             <td className="border border-black px-3 py-2">{safe(school.emis_code)}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Stock table — no total column, no total row */}
//       <table className="w-full border-collapse text-xs mt-4">
//         <thead>
//           <tr className="bg-gray-100">
//             {ITEM_COLUMNS.map((col) => (
//               <th key={col.key} colSpan={3} className="border border-black p-2">
//                 {col.label}
//               </th>
//             ))}
//           </tr>
//           <tr className="bg-gray-100">
//             {ITEM_COLUMNS.map((col) => (
//               <Fragment key={col.key + "-sub"}>
//                 <th className="border border-black p-2">পূর্ববর্তী মাসের স্থিতিসহ গৃহীত</th>
//                 <th className="border border-black p-2">বিতরণ</th>
//                 <th className="border border-black p-2">মাস শেষে স্থিতি</th>
//               </Fragment>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="break-inside-avoid">
//             {ITEM_COLUMNS.map((col) => {
//               const s = stock(col.key);
//               return (
//                 <Fragment key={col.key}>
//                   <td className="border border-black p-2 text-center">{safe(s.received)}</td>
//                   <td className="border border-black p-2 text-center">{safe(s.distributed)}</td>
//                   <td className="border border-black p-2 text-center">{safe(s.balance)}</td>
//                 </Fragment>
//               );
//             })}
//           </tr>
//         </tbody>
//       </table>

//       {/* Signature blocks */}
//       <div className="grid grid-cols-2 border border-black mt-4 text-sm">
//         <div className="border-r border-b border-black p-4 min-h-[110px]">
//           <p className="font-semibold mb-10">টিফিন ম্যানেজারের স্বাক্ষর ও সিল:</p>
//           <p>তারিখ:</p>
//           <p>মোবাইল নম্বর:</p>
//         </div>
//         <div className="border-b border-black p-4 min-h-[110px]">
//           <p className="font-semibold mb-10">প্রধান শিক্ষকের স্বাক্ষর ও সিল:</p>
//           <p>তারিখ:</p>
//           <p>মোবাইল নম্বর:</p>
//         </div>
//         <div className="border-r border-black p-4 min-h-[110px]">
//           <p className="font-semibold mb-10">সহকারী উপজেলা প্রাথমিক শিক্ষা অফিসারের স্বাক্ষর ও সিল:</p>
//           <p>তারিখ:</p>
//           <p>মোবাইল নম্বর:</p>
//         </div>
//         <div className="p-4 min-h-[110px]">
//           <p className="font-semibold mb-10">উপজেলা প্রাথমিক শিক্ষা অফিসারের স্বাক্ষর ও সিল:</p>
//           <p>তারিখ:</p>
//           <p>মোবাইল নম্বর:</p>
//         </div>
//       </div>
//     </div>
//   );
// }