import { Fragment } from "react";

const ITEM_COLUMNS = [
  { key: "bun",    label: "বনরুটি (১২০ গ্রাম)", unit: "প্যাকেট" },
  { key: "egg",    label: "সিদ্ধ ডিম (৬০ গ্রাম)", unit: "পিস" },
  { key: "banana", label: "কলা (১০০ গ্রাম)",      unit: "পিস" },
];

const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
function bn(n) { return String(n).replace(/[0-9]/g, (d) => bnDigits[d]); }
function bnNumber(n) {
  if (n === null || n === undefined || isNaN(n)) return '-';
  return bn(Number(n).toLocaleString('en-IN'));
}

export default function Form7SchoolPage({ rows, month, year }) {
  const safe = (v) => (v === null || v === undefined || v === "" ? "-" : v);

  const sumField = (fieldSuffix) =>
    (rows ?? []).reduce((total, row) => {
      const v = row[fieldSuffix];
      return total + (typeof v === "number" ? v : 0);
    }, 0);

  return (
    <div className="bg-white p-8 print:p-0">
      <div className="flex justify-end">
        <div className="border-2 border-black px-4 py-1 font-bold text-sm">
          নমুনা ফরম-০৭
        </div>
      </div>

      <h1 className="text-center text-xl font-bold -mt-6">
        সরকারি প্রাথমিক বিদ্যালয়ে ফিডিং কর্মসূচি
      </h1>
      <p className="text-center font-semibold mt-2">উপজেলা প্রাথমিক শিক্ষা অফিস</p>
      <p className="text-center mt-1">উপজেলা: {safe(month?.upazila)}</p>
      <p className="text-center">জেলা: {safe(month?.district)}</p>

      <p className="text-center font-bold mt-5 mb-4">
        {safe(month?.label)}-{safe(year)} মাসের বনরুটি (১২০ গ্রাম), সিদ্ধ ডিম (৬০ গ্রাম) ও কলা (১০০ গ্রাম) বিদ্যালয় পর্যায়ে সরবরাহের বিবরণী
      </p>

      <hr className="border-t-4 border-black my-5" />

      <p className="font-semibold mb-4">সরবরাহকারী ঠিকাদারের নাম: {safe(month?.supplierName)}</p>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th rowSpan={2} className="border border-black p-2 w-14">ক্রমিক নং</th>
            <th rowSpan={2} className="border border-black p-2 min-w-[180px]">বিদ্যালয়ের নাম</th>
            <th rowSpan={2} className="border border-black p-2 w-28">ইএমআইএস কোড</th>
            {ITEM_COLUMNS.map((col) => (
              <th key={col.key} colSpan={2} className="border border-black p-2">
                {col.label}
              </th>
            ))}
          </tr>
          <tr className="bg-gray-100">
            {ITEM_COLUMNS.map((col) => (
              <Fragment key={col.key + "-sub"}>
                <th className="border border-black p-2">মোট চালানের সংখ্যা</th>
                <th className="border border-black p-2">মোট পরিমাণ ({col.unit})</th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rows ?? []).map((row) => (
            <tr key={row.sl} className="break-inside-avoid">
              <td className="border border-black p-1 text-center">{safe(row.sl)}</td>
              <td className="border border-black p-1 text-left pl-2 whitespace-nowrap">
                {safe(row.school_name)}
              </td>
              <td className="border border-black p-1 text-center">{safe(row.emis_code)}</td>
              {ITEM_COLUMNS.map((col) => (
                <Fragment key={col.key}>
                  <td className="border border-black p-1 text-center">
                    {bnNumber(row[`${col.key}_chalan_count`])}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {bnNumber(row[`${col.key}_total`])}
                  </td>
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td colSpan={3} className="border border-black p-2">মোট</td>
            {ITEM_COLUMNS.map((col) => (
              <Fragment key={col.key + "-tot"}>
                <td className="border border-black p-2 text-center">
                  {bnNumber(sumField(`${col.key}_chalan_count`))}
                </td>
                <td className="border border-black p-2 text-center">
                  {bnNumber(sumField(`${col.key}_total`))}
                </td>
              </Fragment>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}