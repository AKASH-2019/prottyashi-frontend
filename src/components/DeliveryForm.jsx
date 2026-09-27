const fieldWrap =
    "flex flex-col gap-1 border border-sky-100 rounded-lg p-3 bg-white";
const labelClass = "text-xs sm:text-sm font-medium text-sky-700";
const inputClass =
    "border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm";

export default function DeliveryForm({
    schools,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    editingId,
    selectedDelivery,
}) {
    return (
        <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-lg border border-sky-100 mb-8">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
            >

                <div className={fieldWrap}>
                    <label className={labelClass}>
                        School
                    </label>
                    <select
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    >

                        <option value="">
                            Select School
                        </option>

                        {schools.map((school) => (
                            <option
                                key={school.id}
                                value={school.id}
                            >
                                {school.name_bn}
                            </option>
                        ))}

                    </select>
                </div>

                <div className={fieldWrap}>
                    <label className={labelClass}>
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        max={
                            new Date()
                                .toISOString()
                                .split("T")[0]
                        }
                        className={inputClass}
                        required
                    />
                </div>

                {/* Bun */}
                <div className={fieldWrap}>
                    <label className={labelClass}>
                        Bun
                    </label>
                    <input
                        type="number"
                        // min="0"
                        name="bun_delivered"
                        placeholder="Bun"
                        value={formData.bun_delivered}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>

                {Number(formData.bun_delivered) > 0 && (
                <div className="md:col-span-2 border border-sky-100 rounded-xl p-3 sm:p-4 bg-sky-50/50 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                    <div className={fieldWrap}>
                        <label className={labelClass}>
                            Bun Chalan No
                        </label>
                        <input
                            type="text"
                            name="bun_chalan_no"
                            value={formData.bun_chalan_no}
                            onChange={handleChange}
                            placeholder="Bun Chalan No"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className={fieldWrap}>
                        <label className={labelClass}>
                            Bun Chalan Date
                        </label>
                        <input
                            type="date"
                            name="bun_chalan_date"
                            onChange={handleChange}
                            value={formData.bun_chalan_date}
                            max={
                                new Date()
                                .toISOString()
                                .split("T")[0]
                            }
                            className={inputClass}
                            required
                        />
                    </div>

                    {editingId && selectedDelivery?.bun_chalan_image && (
                        <div className={`sm:col-span-2 ${fieldWrap}`}>
                            <a
                            href={selectedDelivery.bun_chalan_image}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
                            >
                            View Current Bun Chalan
                            </a>

                            <img
                            src={selectedDelivery.bun_chalan_image}
                            alt="Bun Chalan"
                            className="w-24 sm:w-32 mt-2 rounded-lg border border-sky-100"
                            />
                        </div>
                        )}

                    <div className={`sm:col-span-2 ${fieldWrap}`}>
                        <label className={labelClass}>
                            Bun Chalan Photo
                        </label>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            bun_chalan_image: e.target.files[0],
                            })
                        }
                        className="text-xs sm:text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
                        />
                    </div>
                </div>

                )}

                {/* Egg */}
                <div className={fieldWrap}>
                    <label className={labelClass}>
                        Egg
                    </label>
                    <input
                        type="number"
                        // min="0"
                        name="egg_delivered"
                        placeholder="Egg"
                        value={formData.egg_delivered}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>

                {Number(formData.egg_delivered) > 0 && (
                <div className="md:col-span-2 border border-sky-100 rounded-xl p-3 sm:p-4 bg-sky-50/50 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                    <div className={fieldWrap}>
                        <label className={labelClass}>
                            Egg Chalan No
                        </label>
                        <input
                            type="text"
                            name="egg_chalan_no"
                            value={formData.egg_chalan_no}
                            onChange={handleChange}
                            placeholder="Egg Chalan No"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className={fieldWrap}>
                        <label className={labelClass}>
                            Egg Chalan Date
                        </label>
                        <input
                            type="date"
                            name="egg_chalan_date"
                            value={formData.egg_chalan_date}
                            onChange={handleChange}
                            max={
                                new Date()
                                .toISOString()
                                .split("T")[0]
                            }
                            className={inputClass}
                            required
                        />
                    </div>

                    {editingId && selectedDelivery?.egg_chalan_image && (
                        <div className={`sm:col-span-2 ${fieldWrap}`}>
                            <a
                            href={selectedDelivery.egg_chalan_image}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
                            >
                            View Current Egg Chalan
                            </a>

                            <img
                            src={selectedDelivery.egg_chalan_image}
                            alt="Egg Chalan"
                            className="w-24 sm:w-32 mt-2 rounded-lg border border-sky-100"
                            />
                        </div>
                        )}

                    <div className={`sm:col-span-2 ${fieldWrap}`}>
                        <label className={labelClass}>
                            Egg Chalan Photo
                        </label>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            egg_chalan_image: e.target.files[0],
                            })
                        }
                        className="text-xs sm:text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
                        />
                    </div>
                </div>

                )}

                {/* Banana */}
                <div className={fieldWrap}>
                    <label className={labelClass}>
                        Banana
                    </label>
                    <input
                        type="number"
                        name="banana_delivered"
                        // min="0"
                        placeholder="Banana"
                        value={formData.banana_delivered}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>

                {Number(formData.banana_delivered) > 0 && (
                <div className="md:col-span-2 border border-sky-100 rounded-xl p-3 sm:p-4 bg-sky-50/50 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                    <div className={fieldWrap}>
                        <label className={labelClass}>
                            Banana Chalan No
                        </label>
                        <input
                            type="text"
                            name="banana_chalan_no"
                            value={formData.banana_chalan_no}
                            onChange={handleChange}
                            placeholder="Banana Chalan No"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className={fieldWrap}>
                        <label className={labelClass}>
                            Banana Chalan Date
                        </label>
                        <input
                            type="date"
                            name="banana_chalan_date"
                            value={formData.banana_chalan_date}
                            onChange={handleChange}
                            max={
                                new Date()
                                .toISOString()
                                .split("T")[0]
                            }
                            className={inputClass}
                            required
                        />
                    </div>

                    {editingId && selectedDelivery?.banana_chalan_image && (
                        <div className={`sm:col-span-2 ${fieldWrap}`}>
                            <a
                            href={selectedDelivery.banana_chalan_image}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
                            >
                            View Current Banana Chalan
                            </a>

                            <img
                            src={selectedDelivery.banana_chalan_image}
                            alt="Banana Chalan"
                            className="w-24 sm:w-32 mt-2 rounded-lg border border-sky-100"
                            />
                        </div>
                        )}

                    <div className={`sm:col-span-2 ${fieldWrap}`}>
                        <label className={labelClass}>
                            Banana Chalan Photo
                        </label>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            banana_chalan_image: e.target.files[0],
                            })
                        }
                        className="text-xs sm:text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
                        />
                    </div>
                </div>

                )}

                <button
                    className="md:col-span-2 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition text-sm sm:text-base"
                >

                    {editingId
                        ? "Update Delivery"
                        : "Save Delivery"}
                </button>

            </form>

        </div>
    );
}


// export default function DeliveryForm({
//     schools,
//     formData,
//     setFormData,
//     handleChange,
//     handleSubmit,
//     editingId,
//     selectedDelivery,
// }) {
//     return (
//         <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-sky-100 mb-8">
//             <form
//                 onSubmit={handleSubmit}
//                 className="grid grid-cols-1 md:grid-cols-2 gap-4"
//             >

//                 <div className="flex flex-col gap-1">
//                     <label className="text-sm font-medium text-sky-700">
//                         School
//                     </label>
//                     <select
//                         name="school"
//                         value={formData.school}
//                         onChange={handleChange}
//                         className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                         required
//                     >

//                         <option value="">
//                             Select School
//                         </option>

//                         {schools.map((school) => (
//                             <option
//                                 key={school.id}
//                                 value={school.id}
//                             >
//                                 {school.name_bn}
//                             </option>
//                         ))}

//                     </select>
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <label className="text-sm font-medium text-sky-700">
//                         Date
//                     </label>
//                     <input
//                         type="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleChange}
//                         max={
//                             new Date()
//                                 .toISOString()
//                                 .split("T")[0]
//                         }
//                         className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                         required
//                     />
//                 </div>

//                 {/* Bun */}
//                 <div className="flex flex-col gap-1">
//                     <label className="text-sm font-medium text-sky-700">
//                         Bun
//                     </label>
//                     <input
//                         type="number"
//                         // min="0"
//                         name="bun_delivered"
//                         placeholder="Bun"
//                         value={formData.bun_delivered}
//                         onChange={handleChange}
//                         className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                         required
//                     />
//                 </div>

//                 {Number(formData.bun_delivered) > 0 && (
//                 <div className="md:col-span-2 border border-sky-100 rounded-xl p-4 bg-sky-50/50 grid grid-cols-1 sm:grid-cols-2 gap-4">

//                     <div className="flex flex-col gap-1">
//                         <label className="text-sm font-medium text-sky-700">
//                             Bun Chalan No
//                         </label>
//                         <input
//                             type="text"
//                             name="bun_chalan_no"
//                             value={formData.bun_chalan_no}
//                             onChange={handleChange}
//                             placeholder="Bun Chalan No"
//                             className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                             required
//                         />
//                     </div>

//                     <div className="flex flex-col gap-1">
//                         <label className="text-sm font-medium text-sky-700">
//                             Bun Chalan Date
//                         </label>
//                         <input
//                             type="date"
//                             name="bun_chalan_date"
//                             onChange={handleChange}
//                             value={formData.bun_chalan_date}
//                             max={
//                                 new Date()
//                                 .toISOString()
//                                 .split("T")[0]
//                             }
//                             className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                             required
//                         />
//                     </div>

//                     {editingId && selectedDelivery?.bun_chalan_image && (
//                         <div className="sm:col-span-2">
//                             <a
//                             href={selectedDelivery.bun_chalan_image}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
//                             >
//                             View Current Bun Chalan
//                             </a>

//                             <img
//                             src={selectedDelivery.bun_chalan_image}
//                             alt="Bun Chalan"
//                             className="w-32 mt-2 rounded-lg border border-sky-100"
//                             />
//                         </div>
//                         )}

//                     <div className="flex flex-col gap-1 sm:col-span-2">
//                         <label className="text-sm font-medium text-sky-700">
//                             Bun Chalan Photo
//                         </label>
//                         <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) =>
//                             setFormData({
//                             ...formData,
//                             bun_chalan_image: e.target.files[0],
//                             })
//                         }
//                         className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
//                         />
//                     </div>
//                 </div>

//                 )}

//                 {/* Egg */}
//                 <div className="flex flex-col gap-1">
//                     <label className="text-sm font-medium text-sky-700">
//                         Egg
//                     </label>
//                     <input
//                         type="number"
//                         // min="0"
//                         name="egg_delivered"
//                         placeholder="Egg"
//                         value={formData.egg_delivered}
//                         onChange={handleChange}
//                         className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                         required
//                     />
//                 </div>

//                 {Number(formData.egg_delivered) > 0 && (
//                 <div className="md:col-span-2 border border-sky-100 rounded-xl p-4 bg-sky-50/50 grid grid-cols-1 sm:grid-cols-2 gap-4">

//                     <div className="flex flex-col gap-1">
//                         <label className="text-sm font-medium text-sky-700">
//                             Egg Chalan No
//                         </label>
//                         <input
//                             type="text"
//                             name="egg_chalan_no"
//                             value={formData.egg_chalan_no}
//                             onChange={handleChange}
//                             placeholder="Egg Chalan No"
//                             className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                             required
//                         />
//                     </div>

//                     <div className="flex flex-col gap-1">
//                         <label className="text-sm font-medium text-sky-700">
//                             Egg Chalan Date
//                         </label>
//                         <input
//                             type="date"
//                             name="egg_chalan_date"
//                             value={formData.egg_chalan_date}
//                             onChange={handleChange}
//                             max={
//                                 new Date()
//                                 .toISOString()
//                                 .split("T")[0]
//                             }
//                             className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                             required
//                         />
//                     </div>

//                     {editingId && selectedDelivery?.egg_chalan_image && (
//                         <div className="sm:col-span-2">
//                             <a
//                             href={selectedDelivery.egg_chalan_image}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
//                             >
//                             View Current Egg Chalan
//                             </a>

//                             <img
//                             src={selectedDelivery.egg_chalan_image}
//                             alt="Egg Chalan"
//                             className="w-32 mt-2 rounded-lg border border-sky-100"
//                             />
//                         </div>
//                         )}

//                     <div className="flex flex-col gap-1 sm:col-span-2">
//                         <label className="text-sm font-medium text-sky-700">
//                             Egg Chalan Photo
//                         </label>
//                         <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) =>
//                             setFormData({
//                             ...formData,
//                             egg_chalan_image: e.target.files[0],
//                             })
//                         }
//                         className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
//                         />
//                     </div>
//                 </div>

//                 )}

//                 {/* Banana */}
//                 <div className="flex flex-col gap-1">
//                     <label className="text-sm font-medium text-sky-700">
//                         Banana
//                     </label>
//                     <input
//                         type="number"
//                         name="banana_delivered"
//                         // min="0"
//                         placeholder="Banana"
//                         value={formData.banana_delivered}
//                         onChange={handleChange}
//                         className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                         required
//                     />
//                 </div>

//                 {Number(formData.banana_delivered) > 0 && (
//                 <div className="md:col-span-2 border border-sky-100 rounded-xl p-4 bg-sky-50/50 grid grid-cols-1 sm:grid-cols-2 gap-4">

//                     <div className="flex flex-col gap-1">
//                         <label className="text-sm font-medium text-sky-700">
//                             Banana Chalan No
//                         </label>
//                         <input
//                             type="text"
//                             name="banana_chalan_no"
//                             value={formData.banana_chalan_no}
//                             onChange={handleChange}
//                             placeholder="Banana Chalan No"
//                             className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                             required
//                         />
//                     </div>

//                     <div className="flex flex-col gap-1">
//                         <label className="text-sm font-medium text-sky-700">
//                             Banana Chalan Date
//                         </label>
//                         <input
//                             type="date"
//                             name="banana_chalan_date"
//                             value={formData.banana_chalan_date}
//                             onChange={handleChange}
//                             max={
//                                 new Date()
//                                 .toISOString()
//                                 .split("T")[0]
//                             }
//                             className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                             required
//                         />
//                     </div>

//                     {editingId && selectedDelivery?.banana_chalan_image && (
//                         <div className="sm:col-span-2">
//                             <a
//                             href={selectedDelivery.banana_chalan_image}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
//                             >
//                             View Current Banana Chalan
//                             </a>

//                             <img
//                             src={selectedDelivery.banana_chalan_image}
//                             alt="Banana Chalan"
//                             className="w-32 mt-2 rounded-lg border border-sky-100"
//                             />
//                         </div>
//                         )}

//                     <div className="flex flex-col gap-1 sm:col-span-2">
//                         <label className="text-sm font-medium text-sky-700">
//                             Banana Chalan Photo
//                         </label>
//                         <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) =>
//                             setFormData({
//                             ...formData,
//                             banana_chalan_image: e.target.files[0],
//                             })
//                         }
//                         className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
//                         />
//                     </div>
//                 </div>

//                 )}

//                 <button
//                     className="md:col-span-2 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition"
//                 >

//                     {editingId
//                         ? "Update Delivery"
//                         : "Save Delivery"}
//                 </button>

//             </form>

//         </div>
//     );
// }