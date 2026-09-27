import {
    useEffect,
    useRef,
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

    const formRef = useRef(null);
    
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

        formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
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

                <div ref={formRef}>
                <DeliveryForm
                    schools={schools}
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    editingId={editingId}
                    selectedDelivery={selectedDelivery}
                />
                </div>

                <DeliveryList
                    deliveries={deliveries}
                    schools={schools}
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

// import DeliveryForm from "../components/DeliveryForm";
// import DeliveryList from "../components/DeliveryList";

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

//                 <h1 className="text-3xl font-bold mb-6 text-sky-800">
//                     Delivery Entry
//                 </h1>

//                 <DeliveryForm
//                     schools={schools}
//                     formData={formData}
//                     setFormData={setFormData}
//                     handleChange={handleChange}
//                     handleSubmit={handleSubmit}
//                     editingId={editingId}
//                     selectedDelivery={selectedDelivery}
//                 />

//                 <DeliveryList
//                     deliveries={deliveries}
//                     handleEdit={handleEdit}
//                     handleDelete={handleDelete}
//                 />

//             </div>

//         </MainLayout>
//     );
// }



