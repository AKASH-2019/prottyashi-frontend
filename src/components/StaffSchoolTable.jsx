import { useMemo, useState } from "react";

export default function StaffSchoolTable({
  schools,
}) {
  const [search, setSearch] =
    useState("");

  const filteredSchools =
    useMemo(() => {
      return schools.filter(
        (school) =>
          school.school_name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          school.school_code
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          school.emis_code
            .includes(search)
      );
    }, [schools, search]);

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="flex justify-between mb-4">

        <h2 className="text-xl font-semibold">
          আজকের ডেলিভারি তালিকা
        </h2>

        <input
          type="text"
          placeholder="বিদ্যালয় খুঁজুন..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            border
            rounded-lg
            px-3
            py-2
            w-72
          "
        />
      </div>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-gray-100">

            <th className="border p-2">
              বিদ্যালয়
            </th>

            <th className="border p-2">
              কোড
            </th>

            <th className="border p-2">
              EMIS
            </th>

            <th className="border p-2">
              শিক্ষার্থী
            </th>

            <th className="border p-2">
              বনরুটি
            </th>

            <th className="border p-2">
              ডিম
            </th>

            <th className="border p-2">
              কলা
            </th>

            <th className="border p-2">
              মোট
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredSchools.map(
            (school) => (
              <tr
                key={
                  school.school_id
                }
              >
                <td className="border p-2">
                  {
                    school.school_name
                  }
                </td>

                <td className="border p-2">
                  {
                    school.school_code
                  }
                </td>

                <td className="border p-2">
                  {
                    school.emis_code
                  }
                </td>

                <td className="border p-2 text-center">
                  {
                    school.student_count
                  }
                </td>

                <td className="border p-2 text-center">
                  {
                    school.bun_delivered
                  }
                </td>

                <td className="border p-2 text-center">
                  {
                    school.egg_delivered
                  }
                </td>

                <td className="border p-2 text-center">
                  {
                    school.banana_delivered
                  }
                </td>

                <td className="border p-2 text-center font-semibold">
                  {
                    school.total_food
                  }
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}