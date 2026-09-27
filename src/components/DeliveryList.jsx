import { useMemo, useState } from "react";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function SortArrow({ active, direction }) {
    return (
        <span className="inline-block ml-1 text-xs opacity-70">
            {active ? (direction === "asc" ? "↑" : "↓") : "↕"}
        </span>
    );
}

function Pill({ children, color = "purple" }) {
    const colors = {
        purple: "bg-purple-100 text-purple-700",
        teal: "bg-teal-100 text-teal-700",
    };
    return (
        <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${colors[color]}`}
        >
            {children}
        </span>
    );
}

function FileCell({ url, label }) {
    if (!url) {
        return <span className="text-gray-400 text-sm">No file</span>;
    }
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition"
        >
            {label || "View"}
        </a>
    );
}

export default function DeliveryList({
    deliveries,
    schools = [],
    handleEdit,
    handleDelete,
}) {
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({
        key: "date",
        direction: "desc",
    });

    // Map school id -> school code, using whichever field the schools API
    // actually provides.
    const schoolCodeMap = useMemo(() => {
        const map = {};
        schools.forEach((s) => {
            map[s.id] = s.school_code || s.code || s.emis_code || null;
        });
        return map;
    }, [schools]);

    const rows = useMemo(() => {
        return deliveries.map((d) => ({
            ...d,
            school_code: schoolCodeMap[d.school] || null,
            total:
                (Number(d.bun_delivered) || 0) +
                (Number(d.egg_delivered) || 0) +
                (Number(d.banana_delivered) || 0),
        }));
    }, [deliveries, schoolCodeMap]);

    const filteredRows = useMemo(() => {
        return rows.filter((d) =>
            (d.school_name || "")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [rows, search]);

    const sortedRows = useMemo(() => {
        const sorted = [...filteredRows];
        const { key, direction } = sortConfig;

        sorted.sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];

            if (key === "total") {
                aVal = Number(aVal) || 0;
                bVal = Number(bVal) || 0;
            } else {
                aVal = (aVal || "").toString().toLowerCase();
                bVal = (bVal || "").toString().toLowerCase();
            }

            if (aVal < bVal) return direction === "asc" ? -1 : 1;
            if (aVal > bVal) return direction === "asc" ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [filteredRows, sortConfig]);

    const totalPages = Math.max(
        1,
        Math.ceil(sortedRows.length / pageSize)
    );

    const paginatedRows = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sortedRows.slice(start, start + pageSize);
    }, [sortedRows, page, pageSize]);

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    const headerBtn = (label, key) => (
        <button
            type="button"
            onClick={() => handleSort(key)}
            className="flex items-center justify-center w-full text-white font-semibold text-sm"
        >
            {label}
            <SortArrow
                active={sortConfig.key === key}
                direction={sortConfig.direction}
            />
        </button>
    );

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between p-4 border-b border-sky-100">

                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                    }}
                    className="border border-sky-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition w-fit"
                >
                    {PAGE_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>

                <div className="relative w-full sm:w-72">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Search by school name..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full border border-sky-200 rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[900px]">

                    <thead>
                        <tr className="bg-sky-500">
                            <th
                                rowSpan={2}
                                className="p-3 border border-slate-700 align-middle"
                            >
                                {headerBtn("Date", "date")}
                            </th>
                            <th
                                rowSpan={2}
                                className="p-3 border border-slate-700 align-middle"
                            >
                                {headerBtn("School Code", "school_code")}
                            </th>
                            <th
                                rowSpan={2}
                                className="p-3 border border-slate-700 align-middle"
                            >
                                {headerBtn("School Name", "school_name")}
                            </th>
                            <th
                                colSpan={3}
                                className="p-2 border border-slate-700 text-white font-semibold text-center"
                            >
                                Bun
                            </th>
                            <th
                                colSpan={3}
                                className="p-2 border border-slate-700 text-white font-semibold text-center"
                            >
                                Boiled Egg
                            </th>
                            <th
                                colSpan={3}
                                className="p-2 border border-slate-700 text-white font-semibold text-center"
                            >
                                Banana
                            </th>
                            <th
                                rowSpan={2}
                                className="p-3 border border-slate-700 align-middle"
                            >
                                {headerBtn("Total", "total")}
                            </th>
                            <th
                                rowSpan={2}
                                className="p-3 border border-slate-700 text-white font-semibold align-middle"
                            >
                                Actions
                            </th>
                        </tr>
                        <tr className="bg-sky-500">
                            <th className="p-2 border border-slate-700 text-white font-medium">Count</th>
                            <th className="p-2 border border-slate-700 text-white font-medium">Chalan No.</th>
                            <th className="p-2 border border-slate-700 text-white font-medium">File</th>

                            <th className="p-2 border border-slate-700 text-white font-medium">Count</th>
                            <th className="p-2 border border-slate-700 text-white font-medium">Chalan No.</th>
                            <th className="p-2 border border-slate-700 text-white font-medium">File</th>

                            <th className="p-2 border border-slate-700 text-white font-medium">Count</th>
                            <th className="p-2 border border-slate-700 text-white font-medium">Chalan No.</th>
                            <th className="p-2 border border-slate-700 text-white font-medium">File</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedRows.map((d) => (
                            <tr key={d.id} className="hover:bg-sky-50/50">
                                <td className="border border-sky-100 p-3 text-center whitespace-nowrap">
                                    {d.date}
                                </td>

                                <td className="border border-sky-100 p-3 text-center">
                                    {d.school_code ? (
                                        <Pill color="purple">{d.school_code}</Pill>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>

                                <td className="border border-sky-100 p-3">
                                    {d.school_name}
                                </td>

                                {/* Bun */}
                                <td className="border border-sky-100 p-3 text-center">
                                    {d.bun_delivered || 0}
                                </td>
                                <td className="border border-sky-100 p-3 text-center">
                                    {d.bun_chalan_no ? (
                                        <Pill color="teal">{d.bun_chalan_no}</Pill>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>
                                <td className="border border-sky-100 p-3 text-center">
                                    <FileCell url={d.bun_chalan_image} />
                                </td>

                                {/* Egg */}
                                <td className="border border-sky-100 p-3 text-center">
                                    {d.egg_delivered || 0}
                                </td>
                                <td className="border border-sky-100 p-3 text-center">
                                    {d.egg_chalan_no ? (
                                        <Pill color="teal">{d.egg_chalan_no}</Pill>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>
                                <td className="border border-sky-100 p-3 text-center">
                                    <FileCell url={d.egg_chalan_image} />
                                </td>

                                {/* Banana */}
                                <td className="border border-sky-100 p-3 text-center">
                                    {d.banana_delivered || 0}
                                </td>
                                <td className="border border-sky-100 p-3 text-center">
                                    {d.banana_chalan_no ? (
                                        <Pill color="teal">{d.banana_chalan_no}</Pill>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>
                                <td className="border border-sky-100 p-3 text-center">
                                    <FileCell url={d.banana_chalan_image} />
                                </td>

                                <td className="border border-sky-100 p-3 text-center font-bold">
                                    {d.total}
                                </td>

                                <td className="border border-sky-100 p-3 text-center space-x-2 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(d)}
                                        className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
                                    >
                                        ✎ Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(d.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {paginatedRows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={13}
                                    className="border border-sky-100 p-6 text-center text-gray-400"
                                >
                                    No deliveries found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {/* Pagination footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-4 border-t border-sky-100 text-sm text-gray-600">
                <span>
                    Showing {sortedRows.length === 0 ? 0 : (page - 1) * pageSize + 1}
                    –{Math.min(page * pageSize, sortedRows.length)} of {sortedRows.length}
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 rounded-lg border border-sky-200 disabled:opacity-40 hover:bg-sky-50 transition"
                    >
                        Prev
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1 rounded-lg border border-sky-200 disabled:opacity-40 hover:bg-sky-50 transition"
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
}