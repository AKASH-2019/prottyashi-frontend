import {
  useEffect,
  useState,
} from "react";

import Form4SchoolPage
  from "../components/Form4SchoolPage";
import { useSearchParams } from 'react-router-dom';


import {
  getForm4Report,
} from "../services/reportService";

export default function Form4Report() {

  const [report,
    setReport] =
    useState(null);
const [searchParams] = useSearchParams(); 

  const month = searchParams.get("month") || 9;
  const year = searchParams.get("year") || 2026;

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      const data =
        await getForm4Report(
          month,
          year
        );

      setReport(data);
    };

  if (!report)
    return (
      <div>
        Loading...
      </div>
    );

  return (

    <div className="p-5">

      <button
        onClick={() =>
          window.print()
        }
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>

      {report.schools.map((school, i) => (
        <Form4SchoolPage
            key={school.school_id}
            school={school}
            month={9}
            year={2026}
            isLast={i === report.schools.length - 1}
        />
        ))}

    </div>

  );
}