import {
    useEffect,
    useRef,
    useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
    getSchools,
    createSchool,
    deleteSchool,
    updateSchool,
} from "../services/schoolService";

const fieldWrap =
    "flex flex-col gap-1 border border-sky-100 rounded-lg p-3 bg-white";
const labelClass = "text-xs sm:text-sm font-medium text-sky-700";
const inputClass =
    "border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm";

export default function Schools() {

    const [schools, setSchools] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [editingId, setEditingId] = useState(null);

    const formRef = useRef(null);

    const [formData, setFormData] =
        useState({
            school_code: "",
            emis_code: "",
            name_bn: "",
            student_count: "",
            active: true,
        });

    const loadSchools = async () => {

        const data =
            await getSchools();

        setSchools(data);
    };

    useEffect(() => {
        loadSchools();
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (
        e
    ) => {

        e.preventDefault();

        if (editingId) {

            await updateSchool(
                editingId,
                formData
            );

        } else {

            await createSchool(
                formData
            );
        }

        setFormData({
            school_code: "",
            emis_code: "",
            name_bn: "",
            student_count: "",
            active: true,
        });

        setEditingId(null);

        loadSchools();
    };

    const handleDelete = async (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Delete this school?"
            );

        if (!confirmDelete) return;

        await deleteSchool(id);

        loadSchools();
    };

    const handleEdit = (
        school
        ) => {

        setEditingId(
            school.id
        );

        setFormData({
            school_code:
            school.school_code,

            emis_code:
            school.emis_code,

            name_bn:
            school.name_bn,

            student_count:
            school.student_count,

            active:
            school.active,
        });

        formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const filteredSchools =
        schools.filter((school) =>
            school.name_bn
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <MainLayout>

            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 -m-6 p-4 sm:p-6">

            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-sky-800">
                School Management
            </h1>

            {/* ADD FORM */}

            <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-lg border border-sky-100 mb-6" ref={formRef}>

                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-sky-800">
                    Add School
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                >

                    <div className={fieldWrap}>
                        <label className={labelClass}>
                            School Code
                        </label>
                        <input
                            name="school_code"
                            placeholder="School Code"
                            value={
                                formData.school_code
                            }
                            onChange={
                                handleChange
                            }
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className={fieldWrap}>
                        <label className={labelClass}>
                            EMIS Code
                        </label>
                        <input
                            name="emis_code"
                            placeholder="EMIS Code"
                            value={
                                formData.emis_code
                            }
                            onChange={
                                handleChange
                            }
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className={fieldWrap}>
                        <label className={labelClass}>
                            School Name
                        </label>
                        <input
                            name="name_bn"
                            placeholder="School Name"
                            value={
                                formData.name_bn
                            }
                            onChange={
                                handleChange
                            }
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className={fieldWrap}>
                        <label className={labelClass}>
                            Students
                        </label>
                        <input
                            type="number"
                            name="student_count"
                            placeholder="Students"
                            value={
                                formData.student_count
                            }
                            onChange={
                                handleChange
                            }
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
                        <button
                            className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition text-sm sm:text-base"
                        >
                            {
                                editingId
                                    ? "Update School"
                                    : "Add School"
                            }
                        </button>
                        {
                            editingId && (

                                <button
                                type="button"
                                onClick={() => {

                                    setEditingId(
                                    null
                                    );

                                    setFormData({
                                    school_code: "",
                                    emis_code: "",
                                    name_bn: "",
                                    student_count: "",
                                    active: true,
                                    });

                                }}
                                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 rounded-lg transition text-sm sm:text-base"
                                >
                                Cancel
                                </button>

                            )
                        }
                    </div>

                </form>

            </div>

            {/* SEARCH */}

            <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    🔍
                </span>
                <input
                    type="text"
                    placeholder="Search School..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="border border-sky-200 rounded-lg pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm"
                />
            </div>

            {/* TABLE */}

            <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden">

                {/* Desktop / tablet table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">

                        <thead>

                            <tr className="bg-sky-500">

                                <th className="border border-sky-600 p-2 text-white">
                                    Code
                                </th>

                                <th className="border border-sky-600 p-2 text-white">
                                    EMIS
                                </th>

                                <th className="border border-sky-600 p-2 text-white">
                                    Name
                                </th>

                                <th className="border border-sky-600 p-2 text-white">
                                    Students
                                </th>

                                <th className="border border-sky-600 p-2 text-white">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredSchools.map(
                                (school) => (

                                    <tr key={school.id} className="hover:bg-sky-50/50">

                                        <td className="border border-sky-100 p-2">
                                            {school.school_code}
                                        </td>

                                        <td className="border border-sky-100 p-2">
                                            {school.emis_code}
                                        </td>

                                        <td className="border border-sky-100 p-2">
                                            {school.name_bn}
                                        </td>

                                        <td className="border border-sky-100 p-2 text-center">
                                            {
                                                school.student_count
                                            }
                                        </td>

                                        <td className="border border-sky-100 p-2 space-x-2 text-center whitespace-nowrap">

                                            <button
                                                onClick={() =>
                                                handleEdit(
                                                    school
                                                )
                                                }
                                                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
                                            >
                                                ✎ Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                handleDelete(
                                                    school.id
                                                )
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )}

                            {filteredSchools.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="border border-sky-100 p-6 text-center text-gray-400">
                                        No schools found.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                </div>

                {/* Mobile card layout */}
                <div className="md:hidden flex flex-col gap-3 p-3">
                    {filteredSchools.map((school) => (
                        <div
                            key={school.id}
                            className="border border-sky-100 rounded-xl p-3 bg-white shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-sky-800">
                                    {school.name_bn}
                                </span>
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                                    {school.school_code}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="border border-sky-100 rounded-lg p-2 bg-sky-50/40">
                                    <span className="text-[11px] text-gray-400 uppercase">EMIS</span>
                                    <p className="text-sm font-medium">{school.emis_code}</p>
                                </div>
                                <div className="border border-sky-100 rounded-lg p-2 bg-sky-50/40">
                                    <span className="text-[11px] text-gray-400 uppercase">Students</span>
                                    <p className="text-sm font-medium">{school.student_count}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(school)}
                                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
                                >
                                    ✎ Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(school.id)}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredSchools.length === 0 && (
                        <div className="text-center text-gray-400 p-6">
                            No schools found.
                        </div>
                    )}
                </div>

            </div>

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
//     getSchools,
//     createSchool,
//     deleteSchool,
//     updateSchool,
// } from "../services/schoolService";

// const fieldWrap =
//     "flex flex-col gap-1 border border-sky-100 rounded-lg p-3 bg-white";
// const labelClass = "text-xs sm:text-sm font-medium text-sky-700";
// const inputClass =
//     "border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm";

// export default function Schools() {

//     const [schools, setSchools] =
//         useState([]);

//     const [search, setSearch] =
//         useState("");

//     const [editingId, setEditingId] = useState(null);

//     const [formData, setFormData] =
//         useState({
//             school_code: "",
//             emis_code: "",
//             name_bn: "",
//             student_count: "",
//             active: true,
//         });

//     const loadSchools = async () => {

//         const data =
//             await getSchools();

//         setSchools(data);
//     };

//     useEffect(() => {
//         loadSchools();
//     }, []);

//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]:
//                 e.target.value,
//         });
//     };

//     const handleSubmit = async (
//         e
//     ) => {

//         e.preventDefault();

//         if (editingId) {

//             await updateSchool(
//                 editingId,
//                 formData
//             );

//         } else {

//             await createSchool(
//                 formData
//             );
//         }

//         setFormData({
//             school_code: "",
//             emis_code: "",
//             name_bn: "",
//             student_count: "",
//             active: true,
//         });

//         setEditingId(null);

//         loadSchools();
//     };

//     const handleDelete = async (
//         id
//     ) => {

//         const confirmDelete =
//             window.confirm(
//                 "Delete this school?"
//             );

//         if (!confirmDelete) return;

//         await deleteSchool(id);

//         loadSchools();
//     };

//     const handleEdit = (
//         school
//         ) => {

//         setEditingId(
//             school.id
//         );

//         setFormData({
//             school_code:
//             school.school_code,

//             emis_code:
//             school.emis_code,

//             name_bn:
//             school.name_bn,

//             student_count:
//             school.student_count,

//             active:
//             school.active,
//         });
//     };

//     const filteredSchools =
//         schools.filter((school) =>
//             school.name_bn
//                 .toLowerCase()
//                 .includes(
//                     search.toLowerCase()
//                 )
//         );

//     return (
//         <MainLayout>

//             <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 -m-6 p-4 sm:p-6">

//             <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-sky-800">
//                 School Management
//             </h1>

//             {/* ADD FORM */}

//             <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-lg border border-sky-100 mb-6">

//                 <h2 className="text-lg sm:text-xl font-semibold mb-4 text-sky-800">
//                     Add School
//                 </h2>

//                 <form
//                     onSubmit={handleSubmit}
//                     className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
//                 >

//                     <div className={fieldWrap}>
//                         <label className={labelClass}>
//                             School Code
//                         </label>
//                         <input
//                             name="school_code"
//                             placeholder="School Code"
//                             value={
//                                 formData.school_code
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                             className={inputClass}
//                             required
//                         />
//                     </div>

//                     <div className={fieldWrap}>
//                         <label className={labelClass}>
//                             EMIS Code
//                         </label>
//                         <input
//                             name="emis_code"
//                             placeholder="EMIS Code"
//                             value={
//                                 formData.emis_code
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                             className={inputClass}
//                             required
//                         />
//                     </div>

//                     <div className={fieldWrap}>
//                         <label className={labelClass}>
//                             School Name
//                         </label>
//                         <input
//                             name="name_bn"
//                             placeholder="School Name"
//                             value={
//                                 formData.name_bn
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                             className={inputClass}
//                             required
//                         />
//                     </div>

//                     <div className={fieldWrap}>
//                         <label className={labelClass}>
//                             Students
//                         </label>
//                         <input
//                             type="number"
//                             name="student_count"
//                             placeholder="Students"
//                             value={
//                                 formData.student_count
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                             className={inputClass}
//                             required
//                         />
//                     </div>

//                     <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
//                         <button
//                             className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition text-sm sm:text-base"
//                         >
//                             {
//                                 editingId
//                                     ? "Update School"
//                                     : "Add School"
//                             }
//                         </button>
//                         {
//                             editingId && (

//                                 <button
//                                 type="button"
//                                 onClick={() => {

//                                     setEditingId(
//                                     null
//                                     );

//                                     setFormData({
//                                     school_code: "",
//                                     emis_code: "",
//                                     name_bn: "",
//                                     student_count: "",
//                                     active: true,
//                                     });

//                                 }}
//                                 className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 rounded-lg transition text-sm sm:text-base"
//                                 >
//                                 Cancel
//                                 </button>

//                             )
//                         }
//                     </div>

//                 </form>

//             </div>

//             {/* SEARCH */}

//             <div className="relative mb-4">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
//                     🔍
//                 </span>
//                 <input
//                     type="text"
//                     placeholder="Search School..."
//                     value={search}
//                     onChange={(e) =>
//                         setSearch(
//                             e.target.value
//                         )
//                     }
//                     className="border border-sky-200 rounded-lg pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm"
//                 />
//             </div>

//             {/* TABLE */}

//             <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden">

//                 {/* Desktop / tablet table */}
//                 <div className="hidden md:block overflow-x-auto">
//                     <table className="w-full">

//                         <thead>

//                             <tr className="bg-sky-500">

//                                 <th className="border border-sky-600 p-2 text-white">
//                                     Code
//                                 </th>

//                                 <th className="border border-sky-600 p-2 text-white">
//                                     EMIS
//                                 </th>

//                                 <th className="border border-sky-600 p-2 text-white">
//                                     Name
//                                 </th>

//                                 <th className="border border-sky-600 p-2 text-white">
//                                     Students
//                                 </th>

//                                 <th className="border border-sky-600 p-2 text-white">
//                                     Action
//                                 </th>

//                             </tr>

//                         </thead>

//                         <tbody>

//                             {filteredSchools.map(
//                                 (school) => (

//                                     <tr key={school.id} className="hover:bg-sky-50/50">

//                                         <td className="border border-sky-100 p-2">
//                                             {school.school_code}
//                                         </td>

//                                         <td className="border border-sky-100 p-2">
//                                             {school.emis_code}
//                                         </td>

//                                         <td className="border border-sky-100 p-2">
//                                             {school.name_bn}
//                                         </td>

//                                         <td className="border border-sky-100 p-2 text-center">
//                                             {
//                                                 school.student_count
//                                             }
//                                         </td>

//                                         <td className="border border-sky-100 p-2 space-x-2 text-center whitespace-nowrap">

//                                             <button
//                                                 onClick={() =>
//                                                 handleEdit(
//                                                     school
//                                                 )
//                                                 }
//                                                 className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
//                                             >
//                                                 ✎ Edit
//                                             </button>

//                                             <button
//                                                 onClick={() =>
//                                                 handleDelete(
//                                                     school.id
//                                                 )
//                                                 }
//                                                 className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
//                                             >
//                                                 Delete
//                                             </button>

//                                         </td>

//                                     </tr>

//                                 )
//                             )}

//                             {filteredSchools.length === 0 && (
//                                 <tr>
//                                     <td colSpan={5} className="border border-sky-100 p-6 text-center text-gray-400">
//                                         No schools found.
//                                     </td>
//                                 </tr>
//                             )}

//                         </tbody>

//                     </table>
//                 </div>

//                 {/* Mobile card layout */}
//                 <div className="md:hidden flex flex-col gap-3 p-3">
//                     {filteredSchools.map((school) => (
//                         <div
//                             key={school.id}
//                             className="border border-sky-100 rounded-xl p-3 bg-white shadow-sm"
//                         >
//                             <div className="flex items-center justify-between mb-2">
//                                 <span className="text-sm font-semibold text-sky-800">
//                                     {school.name_bn}
//                                 </span>
//                                 <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
//                                     {school.school_code}
//                                 </span>
//                             </div>

//                             <div className="grid grid-cols-2 gap-2 mb-3">
//                                 <div className="border border-sky-100 rounded-lg p-2 bg-sky-50/40">
//                                     <span className="text-[11px] text-gray-400 uppercase">EMIS</span>
//                                     <p className="text-sm font-medium">{school.emis_code}</p>
//                                 </div>
//                                 <div className="border border-sky-100 rounded-lg p-2 bg-sky-50/40">
//                                     <span className="text-[11px] text-gray-400 uppercase">Students</span>
//                                     <p className="text-sm font-medium">{school.student_count}</p>
//                                 </div>
//                             </div>

//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={() => handleEdit(school)}
//                                     className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
//                                 >
//                                     ✎ Edit
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(school.id)}
//                                     className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}

//                     {filteredSchools.length === 0 && (
//                         <div className="text-center text-gray-400 p-6">
//                             No schools found.
//                         </div>
//                     )}
//                 </div>

//             </div>

//             </div>

//         </MainLayout>
//     );
// }


// // import {
// //     useEffect,
// //     useState,
// // } from "react";

// // import MainLayout from "../layouts/MainLayout";

// // import {
// //     getSchools,
// //     createSchool,
// //     deleteSchool,
// //     updateSchool,
// // } from "../services/schoolService";

// // export default function Schools() {

// //     const [schools, setSchools] =
// //         useState([]);

// //     const [search, setSearch] =
// //         useState("");

// //     const [editingId, setEditingId] = useState(null);

// //     const [formData, setFormData] =
// //         useState({
// //             school_code: "",
// //             emis_code: "",
// //             name_bn: "",
// //             student_count: "",
// //             active: true,
// //         });

// //     const loadSchools = async () => {

// //         const data =
// //             await getSchools();

// //         setSchools(data);
// //     };

// //     useEffect(() => {
// //         loadSchools();
// //     }, []);

// //     const handleChange = (e) => {

// //         setFormData({
// //             ...formData,
// //             [e.target.name]:
// //                 e.target.value,
// //         });
// //     };

// //     const handleSubmit = async (
// //         e
// //     ) => {

// //         e.preventDefault();

// //         if (editingId) {

// //             await updateSchool(
// //                 editingId,
// //                 formData
// //             );

// //         } else {

// //             await createSchool(
// //                 formData
// //             );
// //         }

// //         setFormData({
// //             school_code: "",
// //             emis_code: "",
// //             name_bn: "",
// //             student_count: "",
// //             active: true,
// //         });

// //         setEditingId(null);

// //         loadSchools();
// //     };

// //     const handleDelete = async (
// //         id
// //     ) => {

// //         const confirmDelete =
// //             window.confirm(
// //                 "Delete this school?"
// //             );

// //         if (!confirmDelete) return;

// //         await deleteSchool(id);

// //         loadSchools();
// //     };

// //     const handleEdit = (
// //         school
// //         ) => {

// //         setEditingId(
// //             school.id
// //         );

// //         setFormData({
// //             school_code:
// //             school.school_code,

// //             emis_code:
// //             school.emis_code,

// //             name_bn:
// //             school.name_bn,

// //             student_count:
// //             school.student_count,

// //             active:
// //             school.active,
// //         });
// //     };

// //     const filteredSchools =
// //         schools.filter((school) =>
// //             school.name_bn
// //                 .toLowerCase()
// //                 .includes(
// //                     search.toLowerCase()
// //                 )
// //         );

// //     return (
// //         <MainLayout>

// //             <h1 className="text-3xl font-bold mb-6">
// //                 School Management
// //             </h1>

// //             {/* ADD FORM */}

// //             <div className="bg-white p-5 rounded shadow mb-6">

// //                 <h2 className="text-xl font-semibold mb-4">
// //                     Add School
// //                 </h2>

// //                 <form
// //                     onSubmit={handleSubmit}
// //                     className="grid grid-cols-2 gap-4"
// //                 >

// //                     <input
// //                         name="school_code"
// //                         placeholder="School Code"
// //                         value={
// //                             formData.school_code
// //                         }
// //                         onChange={
// //                             handleChange
// //                         }
// //                         className="border p-2 rounded"
// //                         required
// //                     />

// //                     <input
// //                         name="emis_code"
// //                         placeholder="EMIS Code"
// //                         value={
// //                             formData.emis_code
// //                         }
// //                         onChange={
// //                             handleChange
// //                         }
// //                         className="border p-2 rounded"
// //                         required
// //                     />

// //                     <input
// //                         name="name_bn"
// //                         placeholder="School Name"
// //                         value={
// //                             formData.name_bn
// //                         }
// //                         onChange={
// //                             handleChange
// //                         }
// //                         className="border p-2 rounded"
// //                         required
// //                     />

// //                     <input
// //                         type="number"
// //                         name="student_count"
// //                         placeholder="Students"
// //                         value={
// //                             formData.student_count
// //                         }
// //                         onChange={
// //                             handleChange
// //                         }
// //                         className="border p-2 rounded"
// //                         required
// //                     />

// //                     <button
// //                         className="bg-blue-600 text-white p-2 rounded"
// //                     >
// //                         {
// //                             editingId
// //                                 ? "Update School"
// //                                 : "Add School"
// //                         }
// //                     </button>
// //                     {
// //                         editingId && (

// //                             <button
// //                             type="button"
// //                             onClick={() => {

// //                                 setEditingId(
// //                                 null
// //                                 );

// //                                 setFormData({
// //                                 school_code: "",
// //                                 emis_code: "",
// //                                 name_bn: "",
// //                                 student_count: "",
// //                                 active: true,
// //                                 });

// //                             }}
// //                             className="bg-gray-500 text-white p-2 rounded"
// //                             >
// //                             Cancel
// //                             </button>

// //                         )
// //                     }

// //                 </form>

// //             </div>

// //             {/* SEARCH */}

// //             <input
// //                 type="text"
// //                 placeholder="Search School..."
// //                 value={search}
// //                 onChange={(e) =>
// //                     setSearch(
// //                         e.target.value
// //                     )
// //                 }
// //                 className="border p-2 rounded mb-4 w-full"
// //             />

// //             {/* TABLE */}

// //             <div className="bg-white rounded shadow overflow-x-auto">

// //                 <table className="w-full">

// //                     <thead>

// //                         <tr>

// //                             <th className="border p-2">
// //                                 Code
// //                             </th>

// //                             <th className="border p-2">
// //                                 EMIS
// //                             </th>

// //                             <th className="border p-2">
// //                                 Name
// //                             </th>

// //                             <th className="border p-2">
// //                                 Students
// //                             </th>

// //                             <th className="border p-2">
// //                                 Action
// //                             </th>

// //                         </tr>

// //                     </thead>

// //                     <tbody>

// //                         {filteredSchools.map(
// //                             (school) => (

// //                                 <tr key={school.id}>

// //                                     <td className="border p-2">
// //                                         {school.school_code}
// //                                     </td>

// //                                     <td className="border p-2">
// //                                         {school.emis_code}
// //                                     </td>

// //                                     <td className="border p-2">
// //                                         {school.name_bn}
// //                                     </td>

// //                                     <td className="border p-2">
// //                                         {
// //                                             school.student_count
// //                                         }
// //                                     </td>

// //                                     <td className="border p-2 space-x-2">

// //                                         <button
// //                                             onClick={() =>
// //                                             handleEdit(
// //                                                 school
// //                                             )
// //                                             }
// //                                             className="bg-green-500 text-white px-3 py-1 rounded"
// //                                         >
// //                                             Edit
// //                                         </button>

// //                                         <button
// //                                             onClick={() =>
// //                                             handleDelete(
// //                                                 school.id
// //                                             )
// //                                             }
// //                                             className="bg-red-500 text-white px-3 py-1 rounded"
// //                                         >
// //                                             Delete
// //                                         </button>

// //                                     </td>

// //                                 </tr>

// //                             )
// //                         )}

// //                     </tbody>

// //                 </table>

// //             </div>

// //         </MainLayout>
// //     );
// // }