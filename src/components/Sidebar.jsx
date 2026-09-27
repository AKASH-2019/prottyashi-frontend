import { Link } from "react-router-dom";

export default function Sidebar() {
    const role = localStorage.getItem("role");
  return (
    <div className="w-64 min-h-screen bg-slate-800 text-white">

      <div className="p-5 text-xl font-bold border-b">
        Feeding System
      </div>

      <nav className="p-4">

        <ul className="space-y-3">
            {role === "ADMIN" && (
            <>
                <li>
                <Link to="/schools">
                    Schools
                </Link>
                </li>

                <li>
                <Link to="/holidays">
                    Holidays
                </Link>
                </li>

                <li>
                <Link to="/reports">
                    Reports
                </Link>
                </li>
                <li>
                <Link to="/ration-setting">
                    Demand
                </Link>
                </li>
            </>
            )}
            {role === "FIELD" && (
            <>
                <li>
                <Link to="/deliveries">
                    Deliveries
                </Link>
                </li>
            </>
            )}
        </ul>
        <button
            onClick={() => {
                localStorage.clear();
                window.location.href = "/";
            }}
            className="mt-8 bg-red-500 px-4 py-2 rounded"
            >
            Logout
        </button>

      </nav>

    </div>
  );
}