export default function RationList({
  rations,
}) {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Ration Settings List
      </h2>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-gray-100">

            <th className="border p-2">
              Date
            </th>

            <th className="border p-2">
              Bun
            </th>

            <th className="border p-2">
              Egg
            </th>

            <th className="border p-2">
              Banana
            </th>

            <th className="border p-2">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {rations.map((item) => (

            <tr key={item.id}>

              <td className="border p-2">
                {item.effective_date}
              </td>

              <td className="border p-2 text-center">
                {item.bun_per_student}
              </td>

              <td className="border p-2 text-center">
                {item.egg_per_student}
              </td>

              <td className="border p-2 text-center">
                {item.banana_per_student}
              </td>

              <td className="border p-2 text-center">

                <button
                  className="
                    bg-blue-600
                    text-white
                    px-3
                    py-1
                    rounded
                  "
                >
                  Edit
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}