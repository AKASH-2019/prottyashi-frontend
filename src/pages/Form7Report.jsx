import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Form7SchoolPage
  from "../components/Form7SchoolPage";

import {
  getForm7Report,
} from "../services/reportService";

const MONTHS_BN = [
  "",
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

const meta = {
  upazila: "আনোয়ারা",
  district: "চট্টগ্রাম",
  supplierName: "স্বদেশপল্লী",
};

export default function Form7Report() {

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
            "Loading Form7:",
            month,
            year
          );

          const data =
            await getForm7Report(
              month,
              year
            );

          setReport(data);

        } catch (error) {

          console.error(
            "Form7 Error:",
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

  if (!report) {
    return (
      <div className="p-5 text-red-600">
        No report data found
      </div>
    );
  }

  return (

    <div className="p-5 print:p-0 bg-gray-200 print:bg-white">

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

      {(!report.rows ||
        report.rows.length === 0) ? (

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

        <Form7SchoolPage
          rows={report.rows}
          month={{
            label:
              MONTHS_BN[
                Number(month)
              ],
            ...meta,
          }}
          year={Number(year)}
        />

      )}

    </div>

  );
}