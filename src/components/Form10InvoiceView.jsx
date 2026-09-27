const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

function bn(n) {
  return String(n).replace(/[0-9]/g, (d) => bnDigits[d]);
}

function bnNumber(n, maxDecimals = 2) {
  if (n === null || n === undefined || isNaN(n)) return '-';
  const formatted = Number(n).toLocaleString('en-IN', {
    maximumFractionDigits: maxDecimals,
  });
  return bn(formatted);
}

const ONES = ['শূন্য','এক','দুই','তিন','চার','পাঁচ','ছয়','সাত','আট','নয়','দশ',
'এগারো','বারো','তেরো','চৌদ্দ','পনেরো','ষোলো','সতেরো','আঠারো','উনিশ','বিশ',
'একুশ','বাইশ','তেইশ','চব্বিশ','পঁচিশ','ছাব্বিশ','সাতাশ','আটাশ','ঊনত্রিশ','ত্রিশ',
'একত্রিশ','বত্রিশ','তেত্রিশ','চৌত্রিশ','পঁয়ত্রিশ','ছত্রিশ','সাঁইত্রিশ','আটত্রিশ','ঊনচল্লিশ','চল্লিশ',
'একচল্লিশ','বিয়াল্লিশ','তেতাল্লিশ','চুয়াল্লিশ','পঁয়তাল্লিশ','ছেচল্লিশ','সাতচল্লিশ','আটচল্লিশ','ঊনপঞ্চাশ','পঞ্চাশ',
'একান্ন','বায়ান্ন','তিপ্পান্ন','চুয়ান্ন','পঞ্চান্ন','ছাপ্পান্ন','সাতান্ন','আটান্ন','ঊনষাট','ষাট',
'একষট্টি','বাষট্টি','তেষট্টি','চৌষট্টি','পঁয়ষট্টি','ছেষট্টি','সাতষট্টি','আটষট্টি','ঊনসত্তর','সত্তর',
'একাত্তর','বাহাত্তর','তিয়াত্তর','চুয়াত্তর','পঁচাত্তর','ছিয়াত্তর','সাতাত্তর','আটাত্তর','ঊনআশি','আশি',
'একাশি','বিরাশি','তিরাশি','চুরাশি','পঁচাশি','ছিয়াশি','সাতাশি','আটাশি','ঊননব্বই','নব্বই',
'একানব্বই','বিরানব্বই','তিরানব্বই','চুরানব্বই','পঁচানব্বই','ছিয়ানব্বই','সাতানব্বই','আটানব্বই','নিরানব্বই'];

function taakaToWords(num) {
  num = Math.round(Number(num) || 0);
  if (num === 0) return 'শূন্য টাকা মাত্র';
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const hundred = Math.floor((num % 1000) / 100);
  const rest = num % 100;
  const parts = [];
  if (crore) parts.push(ONES[crore] + ' কোটি');
  if (lakh) parts.push(ONES[lakh] + ' লক্ষ');
  if (thousand) parts.push(ONES[thousand] + ' হাজার');
  if (hundred) parts.push(ONES[hundred] + 'শত');
  if (rest) parts.push(ONES[rest]);
  return parts.join(' ') + ' টাকা মাত্র';
}

export default function Form10InvoiceView({ items, summary, month, year, invoiceMeta }) {
  const safe = (v) => (v === null || v === undefined || v === "" ? "-" : v);

  return (
    <div className="bg-white p-10 print:p-0 text-[15px] leading-relaxed">
      <div className="flex justify-end -mt-4">
        <div className="border-2 border-black px-4 py-1 font-bold text-sm">
          নমুনা ফরম-১০
        </div>
      </div>

      <h1 className="text-center text-2xl font-bold tracking-wide -mt-6 mb-5">
        সেলস ইনভয়েস
      </h1>

      <div className="flex gap-8 mb-4">
        <p><span className="font-semibold">ইনভয়েস নম্বর:</span> {safe(invoiceMeta?.invoiceNo)}</p>
        <p><span className="font-semibold">তারিখ:</span> {safe(invoiceMeta?.date)}</p>
      </div>

      <div className="my-4">
        <p className="font-semibold">প্রাপক</p>
        <p>প্রকল্প পরিচালক</p>
        <p>সরকারি প্রাথমিক বিদ্যালয়ে ফিডিং কর্মসূচি</p>
        <p>প্রাথমিক শিক্ষা অধিদপ্তর, সেকশন-২, মিরপুর, ঢাকা</p>
      </div>

      <p><span className="font-semibold">মাধ্যম:</span> উপজেলা প্রাথমিক শিক্ষা অফিসার, উপজেলা: {safe(invoiceMeta?.upazila)}, জেলা: {safe(invoiceMeta?.district)}</p>
      <p><span className="font-semibold">চুক্তি নম্বর:</span> {safe(invoiceMeta?.contractNo)}</p>

      <p className="font-semibold my-4">
        বিষয়: {safe(invoiceMeta?.upazila)} উপজেলার {safe(month)}-{safe(year)} মাসের বনরুটি, সিদ্ধ ডিম ও কলা সরবরাহের বিক্রয় ইনভয়েস।
      </p>

      <table className="w-full border-collapse text-[13.5px] mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2">খাদ্যপণ্য বিবরণ</th>
            <th className="border border-black p-2">সরবরাহকৃত পরিমাণ (প্যাকেট/পিস)</th>
            <th className="border border-black p-2">একক মূল্য (টাকা)</th>
            <th className="border border-black p-2">খাদ্যপণ্য মোট মূল্য (টাকা)</th>
            <th className="border border-black p-2">রিলেটেড সার্ভিস একক মূল্য (টাকা)</th>
            <th className="border border-black p-2">রিলেটেড সার্ভিস মোট মূল্য (টাকা)</th>
            <th className="border border-black p-2">মোট মূল্য (টাকা)</th>
          </tr>
        </thead>
        <tbody>

        {(!items || items.length === 0) ? (

          <tr>
            <td
              colSpan={7}
              className="
                border
                border-black
                py-8
                text-center
                font-bold
                text-red-600
              "
            >
              এই মাসের কোনো তথ্য পাওয়া যায়নি
            </td>
          </tr>

        ) : (

          items.map((item, i) => (

            <tr
              key={i}
              className="break-inside-avoid"
            >

              <td className="border border-black p-2 text-left pl-3">
                {safe(item.food_name)}
              </td>

              <td className="border border-black p-2 text-center">
                {bnNumber(item.quantity, 0)}
              </td>

              <td className="border border-black p-2 text-center">
                {bnNumber(item.unit_price)}
              </td>

              <td className="border border-black p-2 text-center">
                {bnNumber(item.food_total)}
              </td>

              <td className="border border-black p-2 text-center">
                {bnNumber(item.service_unit_price)}
              </td>

              <td className="border border-black p-2 text-center">
                {bnNumber(item.service_total)}
              </td>

              <td className="border border-black p-2 text-center">
                {bnNumber(item.grand_total)}
              </td>

            </tr>

          ))

        )}

      </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td colSpan={6} className="border border-black p-2">সর্বমোট টাকার পরিমাণ</td>
            <td className="border border-black p-2 text-center">{bnNumber(summary?.grand_total)}</td>
          </tr>
        </tfoot>
      </table>

      <p className="font-bold mt-4">সর্বমোট টাকার পরিমাণ: {bnNumber(summary?.grand_total)} টাকা</p>
      <p className="mb-5">কথায়: {taakaToWords(summary?.grand_total)}।</p>

      <p className="my-3">উপরিউক্ত {bnNumber(Math.round(summary?.grand_total ?? 0))}/- টাকার বিল প্রদানের জন্য অনুরোধ করা হলো।</p>
      <p className="my-3">সংযুক্তি: এই বিল সম্পর্কিত {bn(safe(invoiceMeta?.challanCount))} টি চালানের মূল কপি।</p>

      <div className="border border-black p-4 my-5">
        <p className="font-semibold">ব্যাংকিং তথ্য: বেনিফিসিয়ারি (সরবরাহকারী)</p>
        <p><span className="font-semibold">হিসাবের নাম:</span> {safe(invoiceMeta?.accountName)}</p>
        <p><span className="font-semibold">হিসাব নম্বর:</span> {safe(invoiceMeta?.accountNo)}</p>
        <p><span className="font-semibold">ব্যাংকের নাম:</span> {safe(invoiceMeta?.bankName)}</p>
        <p><span className="font-semibold">শাখার নাম:</span> {safe(invoiceMeta?.branchName)}</p>
        <p><span className="font-semibold">রাউটিং নম্বর:</span> {safe(invoiceMeta?.routingNo)}</p>
      </div>

      <div className="mt-10">
        <p>স্বাক্ষর ও সীল:</p>
        <hr className="border-black my-8 w-1/2" />
        <p>তারিখ:</p>
      </div>

      <p className="text-justify my-6">
        উপযুক্ত বিবরণ অনুযায়ী অত্র উপজেলার {bn(safe(invoiceMeta?.schoolCount))} টি সরকারি প্রাথমিক বিদ্যালয়ে
        {" "}{safe(month)}-{safe(year)} মাসের ডিস্ট্রিবিউশন অনুযায়ী বনরুটি, সিদ্ধ ডিম ও কলা সরবরাহের{" "}
        {bn(safe(invoiceMeta?.challanCount))} টি চালানের কপি অত্র কার্যালয়ে সংরক্ষিত আছে। নিম্ন স্বাক্ষরকারী কর্তৃক
        স্বাক্ষরিত ফরম নম্বর ৭ ও ফরম নম্বর ১৩ এতদসঙ্গে প্রেরণ করা হলো।
        <br /><br />
        এমতাবস্থায়, উক্ত ঠিকাদারকে {safe(month)}-{safe(year)} মাসের{" "}
        {bnNumber(items?.[0]?.quantity, 0)} প্যাকেট বনরুটি,{" "}
        {bnNumber(items?.[1]?.quantity, 0)} পিস সিদ্ধ ডিম ও{" "}
        {bnNumber(items?.[2]?.quantity, 0)} পিস কলা সরবরাহের{" "}
        {bnNumber(Math.round(summary?.grand_total ?? 0))}/- টাকার বিল পরিশোধ করার সুপারিশ করা হলো।
      </p>

      <div className="mt-10">
        <p className="font-semibold">উপজেলা প্রাথমিক শিক্ষা অফিসার</p>
        <p>স্বাক্ষর ও সীল:</p>
        <hr className="border-black my-8 w-1/2" />
        <p>তারিখ:</p>
        <p>মোবাইল নম্বর:</p>
      </div>
    </div>
  );
}