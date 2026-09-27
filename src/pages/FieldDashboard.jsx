import MainLayout from "../layouts/MainLayout";

export default function FieldDashboard() {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Field Staff Dashboard
      </h1>

      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-xl font-semibold">
          Welcome Field Staff
        </h2>

        <p className="mt-2">
          Use the Delivery Entry page to submit
          daily school delivery information.
        </p>
      </div>

    </MainLayout>
  );
}