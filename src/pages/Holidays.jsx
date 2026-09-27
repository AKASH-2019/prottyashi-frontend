import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from "../services/holidayService";

export default function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    title: "",
  });

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
      <h1 className="text-3xl font-bold mb-6">Holiday Management</h1>

      {/* FORM */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Holiday" : "Add Holiday"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Holiday Name"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            {editingId ? "Update Holiday" : "Add Holiday"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Holiday Name</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {holidays.length === 0 ? (
              <tr>
                <td colSpan="3" className="border p-4 text-center">
                  No holidays found
                </td>
              </tr>
            ) : (
              holidays.map((holiday) => (
                <tr key={holiday.id}>
                  <td className="border p-2">{holiday.date}</td>
                  <td className="border p-2">{holiday.title}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(holiday)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(holiday.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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
    </MainLayout>
  );
}