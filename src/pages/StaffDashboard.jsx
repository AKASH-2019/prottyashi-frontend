import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getStaffDashboard,
} from "../services/staffDashboardService";

import StaffDashboardCards from "../components/StaffDashboardCards";

import StaffSchoolTable from "../components/StaffSchoolTable";

export default function StaffDashboard() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadData = async () => {

      try {

        const result =
          await getStaffDashboard();

        setData(result);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    loadData();

  }, []);

  if (loading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Staff Dashboard
        </h1>

        <p className="text-gray-500">
          {data.staff_name}
        </p>

      </div>

      <StaffDashboardCards
        data={data}
      />

      <StaffSchoolTable
        schools={data.schools}
      />

    </MainLayout>
  );
}