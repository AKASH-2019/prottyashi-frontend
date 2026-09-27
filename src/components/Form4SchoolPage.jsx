

// Turns almost any date representation into a plain "YYYY-MM-DD" key for comparison.
function normalizeDate(input) {
  if (!input) return null;

  // Case 1: already a Date object
  if (input instanceof Date) {
    return input.toISOString().slice(0, 10);
  }

  const str = String(input).trim();

  // Case 2: ISO-like "2026-06-07" or "2026-06-07T00:00:00Z"
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return str.slice(0, 10);
  }

  // Case 3: "DD/MM/YYYY" or "D/M/YYYY" or "DD-MM-YYYY"
  const match = str.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (match) {
    const [, d, m, y] = match;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }

  // Fallback: let the JS Date parser try
  const parsed = new Date(str);
  return isNaN(parsed) ? null : parsed.toISOString().slice(0, 10);
}

function buildFullMonthRows(rows, month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const pad = (n) => String(n).padStart(2, "0");

  // Pre-index existing rows by normalized date, once, instead of re-scanning the array per day
  const rowsByDate = {};
  rows.forEach((r) => {
    const key = normalizeDate(r.food_receive_date);
    if (key) rowsByDate[key] = r;
  });

  return Array.from({ length: daysInMonth }, (_, idx) => {
    const day = idx + 1;
    const displayDate = `${pad(day)}/${pad(month)}/${year}`;
    const key = `${year}-${pad(month)}-${pad(day)}`;
    const existing = rowsByDate[key];

    if (existing) {
      return { ...existing, sl: day, food_receive_date: displayDate };
    }
    return {
      sl: day,
      food_receive_date: displayDate,
      chalan_no: "-",
      chalan_date: "-",
      bun: "-",
      egg: "-",
      banana: "-",
      biscuit: "-",
      milk: "-",
    };
  });
}

function formatDate(input) {
  if (!input || input === "-") return "-";

  const str = String(input).trim();

  // Case 1: "YYYY-MM-DD" or ISO format
  const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    return `${d}/${m}/${y}`;
  }

  // Case 2: "DD-MM-YYYY" (hyphenated) -> replace hyphens with slashes
  const dashMatch = str.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (dashMatch) {
    const [, d, m, y] = dashMatch;
    return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
  }

  // Fallback: try parsing as a JS date
  const parsed = new Date(str);
  if (!isNaN(parsed)) {
    const d = String(parsed.getDate()).padStart(2, "0");
    const m = String(parsed.getMonth() + 1).padStart(2, "0");
    const y = parsed.getFullYear();
    return `${d}/${m}/${y}`;
  }

  return str;
}

const banglaMonths = [
  "", // index 0 placeholder
  "জানুয়ারি", // January
  "ফেব্রুয়ারি", // February
  "মার্চ", // March
  "এপ্রিল", // April
  "মে", // May
  "জুন", // June
  "জুলাই", // July
  "আগস্ট", // August
  "সেপ্টেম্বর", // সেপ্টেম্বর (September)
  "অক্টোবর", // October
  "নভেম্বর", // November
  "ডিসেম্বর" // December
];

const getBanglaMonth = (m) => banglaMonths[Number(m)] || m;

export default function Form4SchoolPage({ school, month, year, isLast }) {
  const safe = (value) =>
    value === null || value === undefined || value === "" ? "-" : value;

  // Full 1..30/31 list, with JSON rows merged in by date
  const rows = buildFullMonthRows(school.rows ?? [], month, year);

  return (
    <div
      className={`bg-white ${isLast ? "" : "print:break-after-page"} print:mb-0`}
    >
      <div className="flex justify-end">
        <div className="border-2 border-black px-4 font-bold text-sm">
          নমুনা ফরম-০৪
        </div>
      </div>

      <h1 className="text-center font-bold -mt-6">
        সরকারি প্রাথমিক বিদ্যালয়ে ফিডিং কর্মসূচি
      </h1>
      <h2 className="text-center font-semibold">
        বিদ্যালয়ে গৃহীত খাদ্যের মাসিক প্রতিবেদন
      </h2>
      <p className="text-center font-semibold">
        মাস: {getBanglaMonth(month)}&nbsp;&nbsp;&nbsp;&nbsp;সাল: {safe(year)}
      </p>

      <table className="w-full border-collapse text-sm mb-4">
        <tbody>
          <tr>
            <td className="border border-black px-3 font-semibold w-40">বিদ্যালয়ের নাম:</td>
            <td className="border border-black px-3 ">{safe(school.school_name)}</td>
            <td className="border border-black px-3 font-semibold w-40">স্কুল কোড:</td>
            <td className="border border-black px-3">{safe(school.emis_code)}</td>
          </tr>
          <tr>
            <td className="border border-black px-3 font-semibold">জেলা:</td>
            <td className="border border-black px-3">{safe(school.district)}</td>
            <td className="border border-black px-3 font-semibold">উপজেলা:</td>
            <td className="border border-black px-3">{safe(school.upazila)}</td>
          </tr>
          <tr>
            <td className="border border-black px-3 font-semibold">ইউনিয়ন:</td>
            <td className="border border-black px-3">{safe(school.union)}</td>
            <td className="border border-black px-3 font-semibold">ক্লাস্টার:</td>
            <td className="border border-black px-3">{safe(school.cluster)}</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th rowSpan={2} className="border border-black px-1">ক্রমিক নং</th>
            <th rowSpan={2} className="border border-black px-1">খাদ্য গ্রহণের তারিখ</th>
            <th rowSpan={2} className="border border-black px-1">চালান নম্বর</th>
            <th rowSpan={2} className="border border-black px-1">চালানের তারিখ</th>
            <th colSpan={5} className="border border-black px-1">গৃহীত খাদ্যসামগ্রী (পিস/প্যাকেট)</th>
            <th rowSpan={2} className="border border-black px-1">গ্রহণকারীর স্বাক্ষর</th>
            <th rowSpan={2} className="border border-black px-1">মন্তব্য</th>
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-black px-1">বনরুটি (প্যাকেট)</th>
            <th className="border border-black px-1">সিদ্ধ ডিম (পিস)</th>
            <th className="border border-black px-1">কলা (পিস)</th>
            <th className="border border-black px-1">ফর্টিফাইড বিস্কুট (প্যাকেট)</th>
            <th className="border border-black px-1">ইউএইচটি দুধ (প্যাকেট)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.sl} className="break-inside-avoid">
              <td className="border border-black p-1 text-center text-[8px]">{row.sl}</td>
              <td className="border border-black p-1 text-center text-[8px]">{row.food_receive_date}</td>
              <td className="border border-black p-1 text-center text-[8px]">{safe(row.chalan_no)}</td>
              {/* <td className="border border-black p-1 text-center">{safe(row.chalan_date)}</td> */}
              <td className="border border-black p-1 text-center text-[8px]">
                    {formatDate(row.chalan_date)}
               </td>
              <td className="border border-black p-1 text-center text-[8px]">{safe(row.bun)}</td>
              <td className="border border-black p-1 text-center text-[8px]">{safe(row.egg)}</td>
              <td className="border border-black p-1 text-center text-[8px]">{safe(row.banana)}</td>
              <td className="border border-black p-1 text-center text-[8px]">{safe(row.biscuit)}</td>
              <td className="border border-black p-1 text-center text-[8px]">{safe(row.milk)}</td>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}