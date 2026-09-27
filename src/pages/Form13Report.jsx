import { useEffect, useState } from "react";
import Form13SchoolPage from "../components/Form13SchoolPage";
import { getForm1213Report } from "../services/reportService";
import { useSearchParams } from 'react-router-dom';


const MONTHS_BN = [
  "", "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

export default function Form13Report() {
  const [report, setReport] = useState(null);
  const [searchParams] = useSearchParams(); 

  const month = searchParams.get("month") || 9;
  const year = searchParams.get("year") || 2026;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getForm1213Report(month, year);
    setReport(data);
  };

  if (!report) return <div className="p-5">Loading...</div>;

  return (
    <div className="p-5 print:p-0 bg-gray-200 print:bg-white">
      <button
        onClick={() => window.print()}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-5 print:hidden"
      >
        Download PDF
      </button>

      <Form13SchoolPage
        schools={report.schools ?? []}
        month={MONTHS_BN[report.month]}
        year={report.year}
      />
    </div>
  );
}