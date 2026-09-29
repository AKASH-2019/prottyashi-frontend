export default function StaffDashboardCards({
  data,
}) {
  const cards = [
    {
      title: "মোট বিদ্যালয়",
      value: data.overall_schools,
    },
    {
      title: "মোট ডেলিভারড বিদ্যালয়",
      value: data.total_schools,
    },
    {
      title: "মোট খাদ্য",
      value: data.total_food,
    },
    {
      title: "মোট বনরুটি",
      value: data.total_bun,
    },
    {
      title: "মোট ডিম",
      value: data.total_egg,
    },
    {
      title: "মোট কলা",
      value: data.total_banana,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow border border-sky-100 p-3 sm:p-5"
        >
          <h3 className="text-gray-500 text-xs sm:text-sm">
            {card.title}
          </h3>

          <p className="text-xl sm:text-3xl font-bold text-sky-700 mt-1 sm:mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

// export default function StaffDashboardCards({
//   data,
// }) {
//   const cards = [
//     {
//       title: "মোট বিদ্যালয়",
//       value: data.total_schools,
//     },
//     {
//       title: "মোট খাদ্য",
//       value: data.total_food,
//     },
//     {
//       title: "মোট বনরুটি",
//       value: data.total_bun,
//     },
//     {
//       title: "মোট ডিম",
//       value: data.total_egg,
//     },
//     {
//       title: "মোট কলা",
//       value: data.total_banana,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
//       {cards.map((card) => (
//         <div
//           key={card.title}
//           className="bg-white rounded-xl shadow p-5"
//         >
//           <h3 className="text-gray-500 text-sm">
//             {card.title}
//           </h3>

//           <p className="text-3xl font-bold text-blue-700 mt-2">
//             {card.value}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }