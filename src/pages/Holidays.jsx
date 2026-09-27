import { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from "../services/holidayService";

const fieldWrap =
    "flex flex-col gap-1 border border-sky-100 rounded-lg p-3 bg-white";
const labelClass = "text-xs sm:text-sm font-medium text-sky-700";
const inputClass =
    "border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm";

export default function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    title: "",
  });

  const formRef = useRef(null);

  const loadHolidays = async () => {
    try {
      const data = await getHolidays();
      setHolidays(data || []);
    } catch (error) {
      console.error("Error loading holidays:", error);
    }
  };

  useEffect(() => {
    loadHolidays();
  }, []);

  // FIXED: Changed e.target.title to e.target.name
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, 
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      date: "",
      title: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateHoliday(editingId, formData);
      } else {
        await createHoliday(formData);
      }
      resetForm();
      loadHolidays();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const handleEdit = (holiday) => {
    setEditingId(holiday.id);
    setFormData({
      date: holiday.date,
      title: holiday.title,
    });

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this holiday?");
    if (!confirmDelete) return;

    try {
      await deleteHoliday(id);
      loadHolidays();
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  return (
    <MainLayout>

      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 -m-6 p-4 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-sky-800">
        Holiday Management
      </h1>

      {/* FORM */}
      <div
        ref={formRef}
        className="bg-white p-3 sm:p-6 rounded-2xl shadow-lg border border-sky-100 mb-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-sky-800">
          {editingId ? "Edit Holiday" : "Add Holiday"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        >
          <div className={fieldWrap}>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className={fieldWrap}>
            <label className={labelClass}>Holiday Name</label>
            <input
              type="text"
              name="title"
              placeholder="Holiday Name"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition text-sm sm:text-base"
            >
              {editingId ? "Update Holiday" : "Add Holiday"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 rounded-lg transition text-sm sm:text-base"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden">

        {/* Desktop / tablet table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-sky-500">
                <th className="border border-sky-600 p-2 text-white">Date</th>
                <th className="border border-sky-600 p-2 text-white">Holiday Name</th>
                <th className="border border-sky-600 p-2 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {holidays.length === 0 ? (
                <tr>
                  <td colSpan="3" className="border border-sky-100 p-4 text-center text-gray-400">
                    No holidays found
                  </td>
                </tr>
              ) : (
                holidays.map((holiday) => (
                  <tr key={holiday.id} className="hover:bg-sky-50/50">
                    <td className="border border-sky-100 p-2">{holiday.date}</td>
                    <td className="border border-sky-100 p-2">{holiday.title}</td>
                    <td className="border border-sky-100 p-2 space-x-2 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(holiday)}
                        className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
                      >
                        ✎ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(holiday.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card layout */}
        <div className="md:hidden flex flex-col gap-3 p-3">
          {holidays.length === 0 ? (
            <div className="text-center text-gray-400 p-6">
              No holidays found
            </div>
          ) : (
            holidays.map((holiday) => (
              <div
                key={holiday.id}
                className="border border-sky-100 rounded-xl p-3 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-sky-800">
                    {holiday.title}
                  </span>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                    {holiday.date}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(holiday)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
                  >
                    ✎ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(holiday.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      </div>

    </MainLayout>
  );
}


// import { useEffect, useState } from "react";
// import MainLayout from "../layouts/MainLayout";
// import {
//   getHolidays,
//   createHoliday,
//   updateHoliday,
//   deleteHoliday,
// } from "../services/holidayService";

// export default function Holidays() {
//   const [holidays, setHolidays] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     date: "",
//     title: "",
//   });

//   const loadHolidays = async () => {
//     try {
//       const data = await getHolidays();
//       setHolidays(data || []);
//     } catch (error) {
//       console.error("Error loading holidays:", error);
//     }
//   };

//   useEffect(() => {
//     loadHolidays();
//   }, []);

//   // FIXED: Changed e.target.title to e.target.name
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value, 
//     });
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setFormData({
//       date: "",
//       title: "",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await updateHoliday(editingId, formData);
//       } else {
//         await createHoliday(formData);
//       }
//       resetForm();
//       loadHolidays();
//     } catch (error) {
//       console.error("Submission failed:", error);
//     }
//   };

//   const handleEdit = (holiday) => {
//     setEditingId(holiday.id);
//     setFormData({
//       date: holiday.date,
//       title: holiday.title,
//     });
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Delete this holiday?");
//     if (!confirmDelete) return;

//     try {
//       await deleteHoliday(id);
//       loadHolidays();
//     } catch (error) {
//       console.error("Deletion failed:", error);
//     }
//   };

//   return (
//     <MainLayout>
//       <h1 className="text-3xl font-bold mb-6">Holiday Management</h1>

//       {/* FORM */}
//       <div className="bg-white p-5 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">
//           {editingId ? "Edit Holiday" : "Add Holiday"}
//         </h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="title"
//             placeholder="Holiday Name"
//             value={formData.title}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />
//           <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//             {editingId ? "Update Holiday" : "Add Holiday"}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={resetForm}
//               className="bg-gray-500 text-white p-2 rounded"
//             >
//               Cancel
//             </button>
//           )}
//         </form>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded shadow overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr>
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Holiday Name</th>
//               <th className="border p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {holidays.length === 0 ? (
//               <tr>
//                 <td colSpan="3" className="border p-4 text-center">
//                   No holidays found
//                 </td>
//               </tr>
//             ) : (
//               holidays.map((holiday) => (
//                 <tr key={holiday.id}>
//                   <td className="border p-2">{holiday.date}</td>
//                   <td className="border p-2">{holiday.title}</td>
//                   <td className="border p-2 space-x-2">
//                     <button
//                       onClick={() => handleEdit(holiday)}
//                       className="bg-green-500 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(holiday.id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </MainLayout>
//   );
// }