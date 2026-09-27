import {
    useEffect,
    useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getDeliveries,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} from "../services/deliveryService";

import {
    getSchools,
} from "../services/schoolService";

import DeliveryForm from "../components/DeliveryForm";
import DeliveryList from "../components/DeliveryList";

export default function Deliveries() {

    const [schools, setSchools] =
        useState([]);

    const [deliveries,
        setDeliveries] =
        useState([]);

    const [editingId,
        setEditingId] =
        useState(null);
    
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    
    const [formData, setFormData] =
        useState({
            school: "",
            date: "",

            bun_delivered: 0,
            bun_chalan_no: "",
            bun_chalan_date: "",
            bun_chalan_image: null,

            egg_delivered: 0,
            egg_chalan_no: "",
            egg_chalan_date: "",
            egg_chalan_image: null,

            banana_delivered: 0,
            banana_chalan_no: "",
            banana_chalan_date: "",
            banana_chalan_image: null,
        });

    const loadData =
        async () => {

            const schoolData =
                await getSchools();

            const deliveryData =
                await getDeliveries();

            setSchools(
                schoolData
            );

            setDeliveries(
                deliveryData
            );
        };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange =
        (e) => {

            setFormData({
                ...formData,
                chalan_photo:
                    e.target.files[0],
            });
        };

    const resetForm = () => {

        setEditingId(null);

        setFormData({
            school: "",
            date: "",
            bun_delivered: "",
            egg_delivered: "",
            banana_delivered: "",
            chalan_photo: null,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const fd = new FormData();

        fd.append(
            "school",
            formData.school
        );

        fd.append(
            "date",
            formData.date
        );

        fd.append(
            "bun_delivered",
            formData.bun_delivered
        );

        fd.append(
            "egg_delivered",
            formData.egg_delivered
        );

        fd.append(
            "banana_delivered",
            formData.banana_delivered
        );
        fd.append(
            "bun_chalan_no",
            formData.bun_chalan_no
            );

        fd.append(
            "bun_chalan_date",
            formData.bun_chalan_date
            );

        fd.append(
            "egg_chalan_no",
            formData.egg_chalan_no
            );

        fd.append(
            "egg_chalan_date",
            formData.egg_chalan_date
            );

        fd.append(
            "banana_chalan_no",
            formData.banana_chalan_no
            );

        fd.append(
            "banana_chalan_date",
            formData.banana_chalan_date
            );

        if (formData.bun_chalan_image) {
            fd.append(
                "bun_chalan_image",
                formData.bun_chalan_image
            );
        }

        if (formData.egg_chalan_image) {
            fd.append(
                "egg_chalan_image",
                formData.egg_chalan_image
            );
        }

        if (formData.banana_chalan_image) {
            fd.append(
                "banana_chalan_image",
                formData.banana_chalan_image
            );
        }

        try {

            if (editingId) {

                await updateDelivery(
                    editingId,
                    fd
                );

                alert(
                    "Delivery updated successfully."
                );

            } else {

                await createDelivery(
                    fd
                );

                alert(
                    "Delivery saved successfully."
                );
            }

            resetForm();
            loadData();

        } catch (error) {

            const errors =
                error.response?.data;

            console.log(errors);

            if (
                errors?.non_field_errors?.[0]
                ?.includes(
                    "unique set"
                )
            ) {

                alert(
                    "⚠️ Delivery already exists for this school on the selected date."
                );

                return;
            }

            if (
                errors?.non_field_errors?.[0]
                ?.includes(
                    "Holiday"
                )
            ) {

                alert(
                    "🚫 Delivery entry is not allowed on holidays."
                );

                return;
            }

            alert(
                "❌ Please check your data and try again."
            );
        }
    };

    const handleEdit = (delivery) => {
        console.log(delivery);
        setEditingId(delivery.id);
        setSelectedDelivery(delivery);
        setEditingId(delivery.id);

        setFormData({

            school: delivery.school,
            date: delivery.date,

            bun_delivered: delivery.bun_delivered || 0,
            bun_chalan_no: delivery.bun_chalan_no || "",
            bun_chalan_date: delivery.bun_chalan_date || "",
            bun_chalan_image: null,

            egg_delivered: delivery.egg_delivered || 0,
            egg_chalan_no: delivery.egg_chalan_no || "",
            egg_chalan_date: delivery.egg_chalan_date || "",
            egg_chalan_image: null,

            banana_delivered: delivery.banana_delivered || 0,
            banana_chalan_no: delivery.banana_chalan_no || "",
            banana_chalan_date: delivery.banana_chalan_date || "",
            banana_chalan_image: null,

        });

        console.log({
            banana_delivered: delivery.banana_delivered,
            banana_chalan_no: delivery.banana_chalan_no,
        });

    };

    const handleDelete =
        async (id) => {

            if (
                !window.confirm(
                    "Delete delivery?"
                )
            )
                return;

            await deleteDelivery(
                id
            );

            loadData();
        };

    return (
        <MainLayout>

            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 -m-6 p-6">

                <h1 className="text-3xl font-bold mb-6 text-sky-800">
                    Delivery Entry
                </h1>

                <DeliveryForm
                    schools={schools}
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    editingId={editingId}
                    selectedDelivery={selectedDelivery}
                />

                <DeliveryList
                    deliveries={deliveries}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />

            </div>

        </MainLayout>
    );
}



// import {
//     useEffect,
//     useState,
// } from "react";

// import MainLayout from "../layouts/MainLayout";

// import {
//   getDeliveries,
//   createDelivery,
//   updateDelivery,
//   deleteDelivery,
// } from "../services/deliveryService";

// import {
//     getSchools,
// } from "../services/schoolService";

// export default function Deliveries() {

//     const [schools, setSchools] =
//         useState([]);

//     const [deliveries,
//         setDeliveries] =
//         useState([]);

//     const [editingId,
//         setEditingId] =
//         useState(null);
    
//     const [selectedDelivery, setSelectedDelivery] = useState(null);
    
//     const [formData, setFormData] =
//         useState({
//             school: "",
//             date: "",

//             bun_delivered: 0,
//             bun_chalan_no: "",
//             bun_chalan_date: "",
//             bun_chalan_image: null,

//             egg_delivered: 0,
//             egg_chalan_no: "",
//             egg_chalan_date: "",
//             egg_chalan_image: null,

//             banana_delivered: 0,
//             banana_chalan_no: "",
//             banana_chalan_date: "",
//             banana_chalan_image: null,
//         });

//     const loadData =
//         async () => {

//             const schoolData =
//                 await getSchools();

//             const deliveryData =
//                 await getDeliveries();

//             setSchools(
//                 schoolData
//             );

//             setDeliveries(
//                 deliveryData
//             );
//         };

//     useEffect(() => {
//         loadData();
//     }, []);

//     const handleChange = (e) => {

//         const {
//             name,
//             value,
//         } = e.target;

//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleFileChange =
//         (e) => {

//             setFormData({
//                 ...formData,
//                 chalan_photo:
//                     e.target.files[0],
//             });
//         };

//     const resetForm = () => {

//         setEditingId(null);

//         setFormData({
//             school: "",
//             date: "",
//             bun_delivered: "",
//             egg_delivered: "",
//             banana_delivered: "",
//             chalan_photo: null,
//         });
//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         const fd = new FormData();

//         fd.append(
//             "school",
//             formData.school
//         );

//         fd.append(
//             "date",
//             formData.date
//         );

//         fd.append(
//             "bun_delivered",
//             formData.bun_delivered
//         );

//         fd.append(
//             "egg_delivered",
//             formData.egg_delivered
//         );

//         fd.append(
//             "banana_delivered",
//             formData.banana_delivered
//         );
//         fd.append(
//             "bun_chalan_no",
//             formData.bun_chalan_no
//             );

//         fd.append(
//             "bun_chalan_date",
//             formData.bun_chalan_date
//             );

//         fd.append(
//             "egg_chalan_no",
//             formData.egg_chalan_no
//             );

//         fd.append(
//             "egg_chalan_date",
//             formData.egg_chalan_date
//             );

//         fd.append(
//             "banana_chalan_no",
//             formData.banana_chalan_no
//             );

//         fd.append(
//             "banana_chalan_date",
//             formData.banana_chalan_date
//             );

//         if (formData.bun_chalan_image) {
//             fd.append(
//                 "bun_chalan_image",
//                 formData.bun_chalan_image
//             );
//         }

//         if (formData.egg_chalan_image) {
//             fd.append(
//                 "egg_chalan_image",
//                 formData.egg_chalan_image
//             );
//         }

//         if (formData.banana_chalan_image) {
//             fd.append(
//                 "banana_chalan_image",
//                 formData.banana_chalan_image
//             );
//         }

//         try {

//             if (editingId) {

//                 await updateDelivery(
//                     editingId,
//                     fd
//                 );

//                 alert(
//                     "Delivery updated successfully."
//                 );

//             } else {

//                 await createDelivery(
//                     fd
//                 );

//                 alert(
//                     "Delivery saved successfully."
//                 );
//             }

//             resetForm();
//             loadData();

//         } catch (error) {

//             const errors =
//                 error.response?.data;

//             console.log(errors);

//             if (
//                 errors?.non_field_errors?.[0]
//                 ?.includes(
//                     "unique set"
//                 )
//             ) {

//                 alert(
//                     "⚠️ Delivery already exists for this school on the selected date."
//                 );

//                 return;
//             }

//             if (
//                 errors?.non_field_errors?.[0]
//                 ?.includes(
//                     "Holiday"
//                 )
//             ) {

//                 alert(
//                     "🚫 Delivery entry is not allowed on holidays."
//                 );

//                 return;
//             }

//             alert(
//                 "❌ Please check your data and try again."
//             );
//         }
//     };

//     const handleEdit = (delivery) => {
//         console.log(delivery);
//         setEditingId(delivery.id);
//         setSelectedDelivery(delivery);
//         setEditingId(delivery.id);

//         setFormData({

//             school: delivery.school,
//             date: delivery.date,

//             bun_delivered: delivery.bun_delivered || 0,
//             bun_chalan_no: delivery.bun_chalan_no || "",
//             bun_chalan_date: delivery.bun_chalan_date || "",
//             bun_chalan_image: null,

//             egg_delivered: delivery.egg_delivered || 0,
//             egg_chalan_no: delivery.egg_chalan_no || "",
//             egg_chalan_date: delivery.egg_chalan_date || "",
//             egg_chalan_image: null,

//             banana_delivered: delivery.banana_delivered || 0,
//             banana_chalan_no: delivery.banana_chalan_no || "",
//             banana_chalan_date: delivery.banana_chalan_date || "",
//             banana_chalan_image: null,

//         });

//         console.log({
//             banana_delivered: delivery.banana_delivered,
//             banana_chalan_no: delivery.banana_chalan_no,
//         });

//     };

//     const handleDelete =
//         async (id) => {

//             if (
//                 !window.confirm(
//                     "Delete delivery?"
//                 )
//             )
//                 return;

//             await deleteDelivery(
//                 id
//             );

//             loadData();
//         };

//     return (
//         <MainLayout>

//             <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 -m-6 p-6">

//             <h1 className="text-3xl font-bold mb-6 text-sky-800">
//                 Delivery Entry
//             </h1>

//             <div className="bg-white p-6 rounded-2xl shadow-lg border border-sky-100 mb-8">
//                 <form
//                     onSubmit={
//                         handleSubmit
//                     }
//                     className="grid grid-cols-2 gap-4"
//                 >

//                     <select
//                         name="school"
//                         value={
//                             formData.school
//                         }
//                         onChange={
//                             handleChange
//                         }
//                         className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                         required
//                     >

//                         <option value="">
//                             Select School
//                         </option>

//                         {schools.map(
//                             (school) => (
//                                 <option
//                                     key={
//                                         school.id
//                                     }
//                                     value={
//                                         school.id
//                                     }
//                                 >
//                                     {
//                                         school.name_bn
//                                     }
//                                 </option>
//                             )
//                         )}

//                     </select>

//                     <input
//                         type="date"
//                         name="date"
//                         value={
//                             formData.date
//                         }
//                         onChange={
//                             handleChange
//                         }
//                         max={
//                                 new Date()
//                                 .toISOString()
//                                 .split("T")[0]
//                             }
//                         className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                         required
//                     />

//                     <input
//                         type="number"
//                         // min="0"
//                         name="bun_delivered"
//                         placeholder="Bun"
//                         value={
//                             formData.bun_delivered
//                         }
//                         onChange={
//                             handleChange
//                         }
                        
//                         className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                         required
//                     />
//                     {Number(formData.bun_delivered) > 0 && (
//                     <>
//                         <input
//                             type="text"
//                             name="bun_chalan_no"
//                             value={formData.bun_chalan_no}
//                             onChange={handleChange}
//                             placeholder="Bun Chalan No"
//                             className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                             required
//                         />

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

//                         {/* <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) =>
//                                 setFormData({
//                                     ...formData,
//                                     bun_chalan_image: e.target.files[0],
//                                 })
//                             }
//                             required={Number(formData.bun_delivered) > 0}
//                         /> */}
//                         {editingId && selectedDelivery?.bun_chalan_image && (
//                             <div className="col-span-2">
//                                 <a
//                                 href={selectedDelivery.bun_chalan_image}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
//                                 >
//                                 View Current Bun Chalan
//                                 </a>

//                                 <img
//                                 src={selectedDelivery.bun_chalan_image}
//                                 alt="Bun Chalan"
//                                 className="w-32 mt-2 rounded-lg border border-sky-100"
//                                 />
//                             </div>
//                             )}

//                             <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) =>
//                                 setFormData({
//                                 ...formData,
//                                 bun_chalan_image: e.target.files[0],
//                                 })
//                             }
//                             className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
//                             />
//                     </>

//                     )}
//                     <input
//                         type="number"
//                         // min="0"
//                         name="egg_delivered"
//                         placeholder="Egg"
//                         value={
//                             formData.egg_delivered
//                         }
//                         onChange={
//                             handleChange
//                         }
                        
//                         className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                         required
//                     />
//                     {Number(formData.egg_delivered) > 0 && (
//                     <>
//                         <input
//                             type="text"
//                             name="egg_chalan_no"
//                             value={formData.egg_chalan_no}
//                             onChange={handleChange}
//                             placeholder="Egg Chalan No"
//                             className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                             required
//                         />

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

//                         {editingId && selectedDelivery?.egg_chalan_image && (
//                             <div className="col-span-2">
//                                 <a
//                                 href={selectedDelivery.egg_chalan_image}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
//                                 >
//                                 View Current Egg Chalan
//                                 </a>

//                                 <img
//                                 src={selectedDelivery.egg_chalan_image}
//                                 alt="Egg Chalan"
//                                 className="w-32 mt-2 rounded-lg border border-sky-100"
//                                 />
//                             </div>
//                             )}

//                             <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) =>
//                                 setFormData({
//                                 ...formData,
//                                 egg_chalan_image: e.target.files[0],
//                                 })
//                             }
//                             className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
//                             />

//                     </>

//                     )}
//                     <input
//                         type="number"
//                         name="banana_delivered"
//                         // min="0"
//                         placeholder="Banana"
//                         value={
//                             formData.banana_delivered
//                         }
//                         onChange={
//                             handleChange
//                         }
                        
//                         className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                         required
//                     />
//                     {Number(formData.banana_delivered) > 0 && (
//                     <>
//                         <input
//                             type="text"
//                             name="banana_chalan_no"
//                             value={formData.banana_chalan_no}
//                             onChange={handleChange}
//                             placeholder="Banana Chalan No"
//                             className="border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                             required
//                         />

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

//                         {editingId && selectedDelivery?.banana_chalan_image && (
//                             <div className="col-span-2">
//                                 <a
//                                 href={selectedDelivery.banana_chalan_image}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
//                                 >
//                                 View Current Banana Chalan
//                                 </a>

//                                 <img
//                                 src={selectedDelivery.banana_chalan_image}
//                                 alt="Banana Chalan"
//                                 className="w-32 mt-2 rounded-lg border border-sky-100"
//                                 />
//                             </div>
//                             )}

//                             <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) =>
//                                 setFormData({
//                                 ...formData,
//                                 banana_chalan_image: e.target.files[0],
//                                 })
//                             }
//                             className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
//                             />
//                     </>

//                     )}
//                     <button
//                         className="col-span-2 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition"
//                     >
                        
//                         {editingId
//                             ? "Update Delivery"
//                             : "Save Delivery"}
//                     </button>

//                 </form>

//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-x-auto">

//                 <table className="w-full">

//                     <thead>

//                         <tr className="bg-sky-50">

//                             <th className="border border-sky-100 p-2 text-sky-800">
//                                 Date
//                             </th>

//                             <th className="border border-sky-100 p-2 text-sky-800">
//                                 School
//                             </th>

//                             <th className="border border-sky-100 p-2 text-sky-800">
//                                 Bun
//                             </th>

//                             <th className="border border-sky-100 p-2 text-sky-800">
//                                 Egg
//                             </th>

//                             <th className="border border-sky-100 p-2 text-sky-800">
//                                 Banana
//                             </th>

//                             <th className="border border-sky-100 p-2 text-sky-800">
//                                 Chalan
//                             </th>

//                             <th className="border border-sky-100 p-2 text-sky-800">
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>

//                     <tbody>

//                         {deliveries.map(
//                             (
//                                 delivery
//                             ) => (

//                                 <tr
//                                     key={
//                                         delivery.id
//                                     }
//                                     className="hover:bg-sky-50/50"
//                                 >

//                                     <td className="border border-sky-100 p-2">
//                                         {
//                                             delivery.date
//                                         }
//                                     </td>

//                                     <td className="border border-sky-100 p-2">
//                                         {
//                                             delivery.school_name
//                                         }
//                                     </td>

//                                     <td className="border border-sky-100 p-2">
//                                         {
//                                             delivery.bun_delivered
//                                         }
//                                     </td>

//                                     <td className="border border-sky-100 p-2">
//                                         {
//                                             delivery.egg_delivered
//                                         }
//                                     </td>

//                                     <td className="border border-sky-100 p-2">
//                                         {
//                                             delivery.banana_delivered
//                                         }
//                                     </td>

//                                     <td className="border border-sky-100 p-2">
//                                         {delivery.chalan_photo && (
//                                             <a
//                                                 href={delivery.chalan_photo} // CLEAN: Pass the absolute string directly without template literals
//                                                 target="_blank"
//                                                 rel="noreferrer"
//                                                 className="text-sky-600 hover:underline font-medium"
//                                             >
//                                                 View
//                                             </a>
//                                         )}
//                                     </td>

//                                     <td className="border border-sky-100 p-2 space-x-2">

//                                         <button
//                                             onClick={() =>
//                                                 handleEdit(
//                                                     delivery
//                                                 )
//                                             }
//                                             className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-lg transition"
//                                         >
//                                             Edit
//                                         </button>

//                                         <button
//                                             onClick={() =>
//                                                 handleDelete(
//                                                     delivery.id
//                                                 )
//                                             }
//                                             className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
//                                         >
//                                             Delete
//                                         </button>

//                                     </td>

//                                 </tr>

//                             )
//                         )}

//                     </tbody>

//                 </table>

//             </div>

//             </div>

//         </MainLayout>
//     );
// }