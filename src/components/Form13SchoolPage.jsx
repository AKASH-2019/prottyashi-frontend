import { Fragment } from "react";

const ITEM_COLUMNS = [
  { key: "bun",    label: "বনরুটি" },
  { key: "egg",    label: "সিদ্ধ ডিম" },
  { key: "banana", label: "কলা" },
];

export default function Form13SchoolPage({ schools, month, year }) {
  const safe = (value) =>
    value === null || value === undefined || value === "" ? "-" : value;

  const stock = (school, key) => school[key] ?? {};

  const sumField = (key, field) =>
    schools.reduce((total, school) => {
      const v = school[key]?.[field];
      return total + (typeof v === "number" ? v : 0);
    }, 0);

  return (
    <div className="bg-white p-8 print:p-0">
      <div className="flex justify-end">
        <div className="border-2 border-black px-4 py-1 font-bold text-sm">
          নমুনা ফরম-১৩
        </div>
      </div>

      <h1 className="text-center text-xl font-bold -mt-6">
        সরকারি প্রাথমিক বিদ্যালয়ে ফিডিং কর্মসূচি
      </h1>
      <h2 className="text-center text-lg font-semibold mt-1">
        উপজেলা পর্যায়ের মাসিক স্টক প্রতিবেদন
      </h2>
      <p className="text-center font-semibold mt-1 mb-6">
        মাস: {safe(month)}&nbsp;&nbsp;&nbsp;&nbsp;সাল: {safe(year)}
      </p>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th rowSpan={2} className="border border-black p-2 w-14">ক্রমিক নং</th>
            <th rowSpan={2} className="border border-black p-2 min-w-[160px]">বিদ্যালয়ের নাম</th>
            <th rowSpan={2} className="border border-black p-2 w-28">ইএমআইএস কোড</th>
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
          {schools.map((school) => (
            <tr key={school.school_id} className="break-inside-avoid">
              <td className="border border-black p-1 text-center">{safe(school.sl)}</td>
              <td className="border border-black p-1 text-left pl-2 whitespace-nowrap">
                {safe(school.school_name)}
              </td>
              <td className="border border-black p-1 text-center">{safe(school.emis_code)}</td>
              {ITEM_COLUMNS.map((col) => {
                const s = stock(school, col.key);
                return (
                  <Fragment key={col.key}>
                    <td className="border border-black p-1 text-center">{safe(s.received)}</td>
                    <td className="border border-black p-1 text-center">{safe(s.distributed)}</td>
                    <td className="border border-black p-1 text-center">{safe(s.balance)}</td>
                  </Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td colSpan={3} className="border border-black p-2">মোট</td>
            {ITEM_COLUMNS.map((col) => (
              <Fragment key={col.key + "-tot"}>
                <td className="border border-black p-2 text-center">{sumField(col.key, "received")}</td>
                <td className="border border-black p-2 text-center">{sumField(col.key, "distributed")}</td>
                <td className="border border-black p-2 text-center">{sumField(col.key, "balance")}</td>
              </Fragment>
            ))}
          </tr>
        </tfoot>
      </table>
        <div className="mt-16 text-center text-sm">
            <p className="font-semibold mb-10">উপজেলা প্রাথমিক শিক্ষা অফিসারের</p>
            <p>স্বাক্ষর ও সিল:</p>
            <p className="mt-2">তারিখ:</p>
            <p>মোবাইল নম্বর:</p>
        </div>
    </div>
  );
}