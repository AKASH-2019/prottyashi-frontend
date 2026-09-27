import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
    const role = localStorage.getItem("role");

  const navButtonClass =
    "border-2 border-sky-400 text-sky-700 hover:bg-sky-500 hover:text-white hover:border-sky-500 text-center px-4 py-2 rounded-lg font-medium transition";

  return (
    <div
      className={`
        fixed md:static top-0 left-0 h-full md:min-h-screen w-64 z-50
        bg-white text-sky-800 flex flex-col border-r-4 border-sky-400
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
    >

      <div className="flex items-center justify-between gap-2 p-6 border-b border-sky-100">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center">
            <span className="text-white text-xl font-bold">SF</span>
          </div>
          <span className="text-lg font-bold text-sky-700">
            Feeding System
          </span>
        </div>

        <button
          onClick={onClose}
          className="md:hidden text-sky-500 text-2xl leading-none"
          aria-label="Close sidebar"
        >
          &times;
        </button>
      </div>

      <nav className="p-4 flex flex-col flex-1 gap-2">

        <Link to="/dashboard" className={navButtonClass} onClick={onClose}>
            Dashboard
        </Link>

        {role === "ADMIN" && (
        <>
            <Link to="/schools" className={navButtonClass} onClick={onClose}>
                Schools
            </Link>

            <Link to="/holidays" className={navButtonClass} onClick={onClose}>
                Holidays
            </Link>

            <Link to="/reports" className={navButtonClass} onClick={onClose}>
                Reports
            </Link>

            <Link to="/ration-setting" className={navButtonClass} onClick={onClose}>
                Demand
            </Link>
        </>
        )}

        {role === "FIELD" && (
        <>
            <Link to="/deliveries" className={navButtonClass} onClick={onClose}>
                Deliveries
            </Link>
        </>
        )}

        <button
            onClick={() => {
                localStorage.clear();
                window.location.href = "/";
            }}
            className="mt-auto border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 px-4 py-2 rounded-lg font-semibold transition"
            >
            Logout
        </button>

      </nav>

    </div>
  );
}

// import { Link } from "react-router-dom";

// export default function Sidebar() {
//     const role = localStorage.getItem("role");

//   const navButtonClass =
//     "border-2 border-sky-400 text-sky-700 hover:bg-sky-500 hover:text-white hover:border-sky-500 text-center px-4 py-2 rounded-lg font-medium transition";

//   return (
//     <div className="w-64 min-h-screen bg-white text-sky-800 flex flex-col border-r-4 border-sky-400">

//       <div className="flex flex-col items-center gap-2 p-6 border-b border-sky-100">
//         <div className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center">
//           <span className="text-white text-xl font-bold">SF</span>
//         </div>
//         <span className="text-lg font-bold text-sky-700">
//           Feeding System
//         </span>
//       </div>

//       <nav className="p-4 flex flex-col flex-1 gap-2">

//         <Link to="/dashboard" className={navButtonClass}>
//             Dashboard
//         </Link>

//         {role === "ADMIN" && (
//         <>
//             <Link to="/schools" className={navButtonClass}>
//                 Schools
//             </Link>

//             <Link to="/holidays" className={navButtonClass}>
//                 Holidays
//             </Link>

//             <Link to="/reports" className={navButtonClass}>
//                 Reports
//             </Link>

//             <Link to="/ration-setting" className={navButtonClass}>
//                 Demand
//             </Link>
//         </>
//         )}

//         {role === "FIELD" && (
//         <>
//             <Link to="/deliveries" className={navButtonClass}>
//                 Deliveries
//             </Link>
//             <Link to="/reports" className={navButtonClass}>
//                 Reports
//             </Link>
//         </>
//         )}
        

//         <button
//             onClick={() => {
//                 localStorage.clear();
//                 window.location.href = "/";
//             }}
//             className="mt-auto border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 px-4 py-2 rounded-lg font-semibold transition"
//             >
//             Logout
//         </button>

//       </nav>

//     </div>
//   );
// }