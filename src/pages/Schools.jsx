import {
    useEffect,
    useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
    getSchools,
    createSchool,
    deleteSchool,
    updateSchool,
} from "../services/schoolService";

export default function Schools() {

    const [schools, setSchools] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [editingId, setEditingId] = useState(null);

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

            <h1 className="text-3xl font-bold mb-6">
                School Management
            </h1>

            {/* ADD FORM */}

            <div className="bg-white p-5 rounded shadow mb-6">

                <h2 className="text-xl font-semibold mb-4">
                    Add School
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >

                    <input
                        name="school_code"
                        placeholder="School Code"
                        value={
                            formData.school_code
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        name="emis_code"
                        placeholder="EMIS Code"
                        value={
                            formData.emis_code
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                        required
                    />

                    <input
                        name="name_bn"
                        placeholder="School Name"
                        value={
                            formData.name_bn
                        }
                        onChange={
                            handleChange
                        }
                        className="border p-2 rounded"
                        required
                    />

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
                        className="border p-2 rounded"
                        required
                    />

                    <button
                        className="bg-blue-600 text-white p-2 rounded"
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
                            className="bg-gray-500 text-white p-2 rounded"
                            >
                            Cancel
                            </button>

                        )
                    }

                </form>

            </div>

            {/* SEARCH */}

            <input
                type="text"
                placeholder="Search School..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
                className="border p-2 rounded mb-4 w-full"
            />

            {/* TABLE */}

            <div className="bg-white rounded shadow overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr>

                            <th className="border p-2">
                                Code
                            </th>

                            <th className="border p-2">
                                EMIS
                            </th>

                            <th className="border p-2">
                                Name
                            </th>

                            <th className="border p-2">
                                Students
                            </th>

                            <th className="border p-2">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredSchools.map(
                            (school) => (

                                <tr key={school.id}>

                                    <td className="border p-2">
                                        {school.school_code}
                                    </td>

                                    <td className="border p-2">
                                        {school.emis_code}
                                    </td>

                                    <td className="border p-2">
                                        {school.name_bn}
                                    </td>

                                    <td className="border p-2">
                                        {
                                            school.student_count
                                        }
                                    </td>

                                    <td className="border p-2 space-x-2">

                                        <button
                                            onClick={() =>
                                            handleEdit(
                                                school
                                            )
                                            }
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                            handleDelete(
                                                school.id
                                            )
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </MainLayout>
    );
}