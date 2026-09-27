import AdminDashboard from "./AdminDashboard";
import FieldDashboard from "./FieldDashboard";

export default function Dashboard() {

  const role =
    localStorage.getItem("role");

  if (role === "ADMIN") {
    return <AdminDashboard />;
  }

  return <FieldDashboard />;
}