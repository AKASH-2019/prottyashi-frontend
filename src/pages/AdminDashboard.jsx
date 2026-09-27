import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { getDashboardData } from "../services/dashboardService";

export default function AdminDashboard() {

  const [data, setData] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const result =
          await getDashboardData();

        setData(result);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    loadDashboard();

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

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded shadow">
          <h3>Bun</h3>

          <p>
            Demand:
            {data?.bun_demand}
          </p>

          <p>
            Delivered:
            {data?.bun_delivered}
          </p>

          <p>
            Shortfall:
            {data?.bun_shortfall}
          </p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Egg</h3>

          <p>
            Demand:
            {data?.egg_demand}
          </p>

          <p>
            Delivered:
            {data?.egg_delivered}
          </p>

          <p>
            Shortfall:
            {data?.egg_shortfall}
          </p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Banana</h3>

          <p>
            Demand:
            {data?.banana_demand}
          </p>

          <p>
            Delivered:
            {data?.banana_delivered}
          </p>

          <p>
            Shortfall:
            {data?.banana_shortfall}
          </p>
        </div>

      </div>

      <div className="mt-8 bg-white p-5 rounded shadow">

        <h2 className="text-xl font-semibold mb-4">
          Schools With Shortfall
        </h2>

        <table className="w-full border">

          <thead>

            <tr>

              <th className="border p-2">
                School
              </th>

              {/* <th className="border p-2">
                Item
              </th> */}

              <th className="border p-2">
                Shortfall
              </th>

            </tr>

          </thead>

          <tbody>
            {data?.shortfall_schools?.map((school) => (
              <tr key={school.school_id}>
                <td className="border p-2">
                  {school.school_name}
                </td>

                <td className="border p-2 text-center">
                  {school.bun_demand - school.bun_delivered}
                </td>

                <td className="border p-2 text-center">
                  {school.egg_demand - school.egg_delivered}
                </td>

                <td className="border p-2 text-center">
                  {school.banana_demand - school.banana_delivered}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}