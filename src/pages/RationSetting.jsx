import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import RationForm from "../components/RationForm";
import RationList from "../components/RationList";

import {
  getRationSettings,
  createRationSetting,
  updateRationSetting,
} from "../services/rationService";

export default function RationSetting() {
  const [rations, setRations] = useState([]);
  const [todayRation, setTodayRation] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const response = await getRationSettings();

      const rationList =
        response.results || response || [];

      setRations(rationList);

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const existingToday = rationList.find(
        (item) => item.effective_date === today
      );

      if (existingToday) {
        setTodayRation(existingToday);
      } else {
        setTodayRation(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (todayRation) {
        await updateRationSetting(
          todayRation.id,
          formData
        );

        alert(
          "Today's ration updated successfully."
        );
      } else {
        await createRationSetting(
          formData
        );

        alert(
          "Today's ration created successfully."
        );
      }

      loadData();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
        "Failed to save ration setting."
      );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Ration Settings
          </h1>

          {todayRation ? (
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-sm">
              Today's demand already exists.
              Edit only.
            </span>
          ) : (
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded text-sm">
              Create today's ration.
            </span>
          )}
        </div>

        <RationForm
          initialData={todayRation}
          onSubmit={handleSubmit}
          editMode={!!todayRation}
        />

        <div className="mt-10">
          <RationList
            rations={rations}
          />
        </div>

      </div>
    </MainLayout>
  );
}