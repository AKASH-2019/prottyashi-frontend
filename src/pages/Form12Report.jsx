import { useEffect, useState } from "react";
import Form12SchoolPage from "../components/Form12SchoolPage";
import { getForm1213Report } from "../services/reportService";
import { useSearchParams } from 'react-router-dom';


const MONTHS_BN = [
  "", "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

export default function Form12Report() {
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

  const schools = report.schools ?? [];

  return (
    <div className="p-5 print:p-0 bg-gray-200 print:bg-white">
      <button
        onClick={() => window.print()}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-5 print:hidden"
      >
        Download PDF
      </button>

      {schools.map((school, i) => (
        <Form12SchoolPage
          key={school.school_id}
          school={school}
          month={MONTHS_BN[report.month]}
          year={report.year}
          isLast={i === schools.length - 1}
        />
      ))}
    </div>
  );
}