import { useEffect, useState } from "react";

export default function RationForm({
  initialData,
  onSubmit,
  editMode,
}) {
  const [formData, setFormData] = useState({
    bun_per_student: "",
    egg_per_student: "",
    banana_per_student: "",
    effective_date: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        bun_per_student:
          initialData.bun_per_student || "",

        egg_per_student:
          initialData.egg_per_student || "",

        banana_per_student:
          initialData.banana_per_student || "",

        effective_date:
          initialData.effective_date || "",
      });
    } else {
      const today = new Date()
        .toISOString()
        .split("T")[0];

      setFormData({
        bun_per_student: "",
        egg_per_student: "",
        banana_per_student: "",
        effective_date: today,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

        if (
            Number(formData.bun_per_student) < 0 ||
            Number(formData.egg_per_student) < 0 ||
            Number(formData.banana_per_student) < 0
        ) {
            alert("Negative values are not allowed.");
            return;
        }

        await onSubmit(formData);
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 border rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editMode
          ? "Update Today's Ration"
          : "Create Today's Ration"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div>
          <label className="block mb-1 font-medium">
            Bun Per Student
          </label>

          <input
            type="number"
            min="0"
            step="1"
            name="bun_per_student"
            value={
              formData.bun_per_student
            }
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Egg Per Student
          </label>

          <input
            type="number"
            min="0"
            step="1"
            name="egg_per_student"
            value={
              formData.egg_per_student
            }
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Banana Per Student
          </label>

          <input
            type="number"
            min="0"
            step="1"
            name="banana_per_student"
            value={
              formData.banana_per_student
            }
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Effective Date
          </label>

          <input
            type="date"
            name="effective_date"
            value={
              formData.effective_date
            }
            max={
                new Date()
                .toISOString()
                .split("T")[0]
            }
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
            disabled={editMode}
          />
        </div>

      </div>

      <button
        type="submit"
        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {editMode
          ? "Update Ration"
          : "Create Ration"}
      </button>
    </form>
  );
}