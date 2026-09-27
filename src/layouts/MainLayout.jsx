import { useState } from "react";

import Sidebar from "../components/Sidebar";

export default function MainLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Dark overlay behind the sidebar on mobile when it's open */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">

        {/* Hamburger button, mobile only */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-4 border-2 border-sky-400 text-sky-700 hover:bg-sky-500 hover:text-white hover:border-sky-500 px-3 py-2 rounded-lg font-medium transition"
          aria-label="Open sidebar"
        >
          ☰ Menu
        </button>

        {children}
      </div>

    </div>
  );
}


// import Sidebar from "../components/Sidebar";

// export default function MainLayout({
//   children,
// }) {
//   return (
//     <div className="flex">

//       <Sidebar />

//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         {children}
//       </div>

//     </div>
//   );
// }