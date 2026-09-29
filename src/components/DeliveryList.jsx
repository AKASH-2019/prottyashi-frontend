import { useMemo, useState } from "react";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const SORT_OPTIONS = [
    { key: "date", label: "Date" },
    { key: "school_code", label: "School Code" },
    { key: "school_name", label: "School Name" },
    { key: "total", label: "Total" },
];

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
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition print:bg-transparent print:text-black print:underline print:p-0"
        >
            {label || "View"}
        </a>
    );
}

function FieldBlock({ label, children }) {
    return (
        <div className="flex flex-col gap-0.5 border border-sky-100 rounded-lg p-2 bg-sky-50/40">
            <span className="text-[11px] uppercase tracking-wide text-gray-400">
                {label}
            </span>
            <div className="text-sm">{children}</div>
        </div>
    );
}

export default function DeliveryList({
    deliveries,
    schools = [],
    handleEdit,
    handleDelete,
}) {
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState(""); // "" = no date filter, else "YYYY-MM-DD"
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({
        key: "date",
        direction: "desc",
    });

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

    // Combines the existing text search with the new date filter.
    // Assumes d.date is a plain "YYYY-MM-DD" string — matches the native
    // <input type="date"> value format exactly, so no parsing needed.
    // If your API sends a different date format (e.g. full ISO timestamp),
    // this comparison will silently match nothing — let me know the real
    // format and I'll add a normalizer.
    const filteredRows = useMemo(() => {
        return rows.filter((d) => {
            const matchesSearch = (d.school_name || "")
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesDate = !selectedDate || d.date === selectedDate;
            return matchesSearch && matchesDate;
        });
    }, [rows, search, selectedDate]);

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

    const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));

    const paginatedRows = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sortedRows.slice(start, start + pageSize);
    }, [sortedRows, page, pageSize]);

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
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
            <SortArrow active={sortConfig.key === key} direction={sortConfig.direction} />
        </button>
    );

    const clearDate = () => setSelectedDate("");

    // Prints exactly what matches the currently active filters (search + date).
    // The print-only table below always renders the FULL matching set,
    // ignoring pagination, so this gives every matching row regardless of
    // which page you're viewing on screen.
    const handleDownloadFiltered = () => {
        window.print();
    };

    // Temporarily clears both filters so the print-only table renders every
    // delivery, waits one render cycle, prints, then restores whatever
    // filters were active before.
    const handleDownloadAll = () => {
        const prevSearch = search;
        const prevDate = selectedDate;

        setSearch("");
        setSelectedDate("");

        setTimeout(() => {
            window.print();
            setSearch(prevSearch);
            setSelectedDate(prevDate);
        }, 50);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden print:shadow-none print:border-none print:rounded-none">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between p-3 sm:p-4 border-b border-sky-100 print:hidden">

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

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
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

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setPage(1);
                        }}
                        className="border border-sky-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                    />

                    {selectedDate && (
                        <button
                            type="button"
                            onClick={clearDate}
                            className="text-xs text-gray-500 underline px-1 whitespace-nowrap"
                        >
                            Clear date
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleDownloadFiltered}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition whitespace-nowrap"
                    >
                        PDF (Filtered)
                    </button>

                    <button
                        type="button"
                        onClick={handleDownloadAll}
                        className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition whitespace-nowrap"
                    >
                        PDF (All)
                    </button>
                </div>
            </div>

            {/* Mobile-only sort control */}
            <div className="flex md:hidden items-center gap-2 px-3 pb-3 print:hidden">
                <select
                    value={sortConfig.key}
                    onChange={(e) =>
                        setSortConfig((prev) => ({ ...prev, key: e.target.value }))
                    }
                    className="border border-sky-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.key} value={opt.key}>
                            Sort: {opt.label}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={() =>
                        setSortConfig((prev) => ({
                            ...prev,
                            direction: prev.direction === "asc" ? "desc" : "asc",
                        }))
                    }
                    className="border border-sky-200 rounded-lg px-2 py-1.5 text-xs text-sky-700"
                >
                    {sortConfig.direction === "asc" ? "↑ Asc" : "↓ Desc"}
                </button>
            </div>

            {/* Print-only header: states which mode was exported */}
            <div className="hidden print:block px-3 pt-3 pb-2 text-sm">
                <p className="font-semibold">Delivery List</p>
                <p>
                    {selectedDate ? `Filtered by date: ${selectedDate}` : "All records"}
                    {search && ` — Search: "${search}"`}
                </p>
            </div>

            {/* Desktop / tablet table — screen only, paginated */}
            <div className="hidden md:block overflow-x-auto print:hidden">
                <table className="w-full text-sm min-w-[900px]">
                    <thead>
                        <tr className="bg-sky-500">
                            <th rowSpan={2} className="p-3 border border-slate-700 align-middle">
                                {headerBtn("Date", "date")}
                            </th>
                            <th rowSpan={2} className="p-3 border border-slate-700 align-middle">
                                {headerBtn("School Code", "school_code")}
                            </th>
                            <th rowSpan={2} className="p-3 border border-slate-700 align-middle">
                                {headerBtn("School Name", "school_name")}
                            </th>
                            <th colSpan={3} className="p-2 border border-slate-700 text-white font-semibold text-center">Bun</th>
                            <th colSpan={3} className="p-2 border border-slate-700 text-white font-semibold text-center">Boiled Egg</th>
                            <th colSpan={3} className="p-2 border border-slate-700 text-white font-semibold text-center">Banana</th>
                            <th rowSpan={2} className="p-3 border border-slate-700 align-middle">
                                {headerBtn("Total", "total")}
                            </th>
                            <th rowSpan={2} className="p-3 border border-slate-700 text-white font-semibold align-middle">
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
                                <td className="border border-sky-100 p-3 text-center whitespace-nowrap">{d.date}</td>
                                <td className="border border-sky-100 p-3 text-center">
                                    {d.school_code ? <Pill color="purple">{d.school_code}</Pill> : <span className="text-gray-400">—</span>}
                                </td>
                                <td className="border border-sky-100 p-3">{d.school_name}</td>
                                <td className="border border-sky-100 p-3 text-center">{d.bun_delivered || 0}</td>
                                <td className="border border-sky-100 p-3 text-center">
                                    {d.bun_chalan_no ? <Pill color="teal">{d.bun_chalan_no}</Pill> : <span className="text-gray-400">—</span>}
                                </td>
                                <td className="border border-sky-100 p-3 text-center"><FileCell url={d.bun_chalan_image} /></td>
                                <td className="border border-sky-100 p-3 text-center">{d.egg_delivered || 0}</td>
                                <td className="border border-sky-100 p-3 text-center">
                                    {d.egg_chalan_no ? <Pill color="teal">{d.egg_chalan_no}</Pill> : <span className="text-gray-400">—</span>}
                                </td>
                                <td className="border border-sky-100 p-3 text-center"><FileCell url={d.egg_chalan_image} /></td>
                                <td className="border border-sky-100 p-3 text-center">{d.banana_delivered || 0}</td>
                                <td className="border border-sky-100 p-3 text-center">
                                    {d.banana_chalan_no ? <Pill color="teal">{d.banana_chalan_no}</Pill> : <span className="text-gray-400">—</span>}
                                </td>
                                <td className="border border-sky-100 p-3 text-center"><FileCell url={d.banana_chalan_image} /></td>
                                <td className="border border-sky-100 p-3 text-center font-bold">{d.total}</td>
                                <td className="border border-sky-100 p-3 text-center space-x-2 whitespace-nowrap">
                                    <button onClick={() => handleEdit(d)} className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition">✎ Edit</button>
                                    <button onClick={() => handleDelete(d.id)} className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {paginatedRows.length === 0 && (
                            <tr>
                                <td colSpan={13} className="border border-sky-100 p-6 text-center text-gray-400">
                                    No deliveries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile card layout — screen only, paginated */}
            <div className="md:hidden flex flex-col gap-3 p-3 print:hidden">
                {paginatedRows.map((d) => (
                    <div key={d.id} className="border border-sky-100 rounded-xl p-3 bg-white shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-sky-800">{d.school_name}</span>
                            {d.school_code && <Pill color="purple">{d.school_code}</Pill>}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <FieldBlock label="Date">{d.date}</FieldBlock>
                            <FieldBlock label="Total"><span className="font-bold">{d.total}</span></FieldBlock>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="border border-sky-100 rounded-lg p-2 bg-sky-50/40">
                                <p className="text-xs font-semibold text-sky-700 mb-1">Bun</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <FieldBlock label="Count">{d.bun_delivered || 0}</FieldBlock>
                                    <FieldBlock label="Chalan No.">
                                        {d.bun_chalan_no ? <Pill color="teal">{d.bun_chalan_no}</Pill> : <span className="text-gray-400">—</span>}
                                    </FieldBlock>
                                    <FieldBlock label="File"><FileCell url={d.bun_chalan_image} /></FieldBlock>
                                </div>
                            </div>
                            <div className="border border-sky-100 rounded-lg p-2 bg-sky-50/40">
                                <p className="text-xs font-semibold text-sky-700 mb-1">Boiled Egg</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <FieldBlock label="Count">{d.egg_delivered || 0}</FieldBlock>
                                    <FieldBlock label="Chalan No.">
                                        {d.egg_chalan_no ? <Pill color="teal">{d.egg_chalan_no}</Pill> : <span className="text-gray-400">—</span>}
                                    </FieldBlock>
                                    <FieldBlock label="File"><FileCell url={d.egg_chalan_image} /></FieldBlock>
                                </div>
                            </div>
                            <div className="border border-sky-100 rounded-lg p-2 bg-sky-50/40">
                                <p className="text-xs font-semibold text-sky-700 mb-1">Banana</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <FieldBlock label="Count">{d.banana_delivered || 0}</FieldBlock>
                                    <FieldBlock label="Chalan No.">
                                        {d.banana_chalan_no ? <Pill color="teal">{d.banana_chalan_no}</Pill> : <span className="text-gray-400">—</span>}
                                    </FieldBlock>
                                    <FieldBlock label="File"><FileCell url={d.banana_chalan_image} /></FieldBlock>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button onClick={() => handleEdit(d)} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition">✎ Edit</button>
                            <button onClick={() => handleDelete(d.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition">Delete</button>
                        </div>
                    </div>
                ))}
                {paginatedRows.length === 0 && (
                    <div className="text-center text-gray-400 p-6">No deliveries found.</div>
                )}
            </div>

            {/* Print-only table — always renders the FULL filtered/sorted set,
                ignoring pagination entirely, so the PDF has every matching row */}
            <div className="hidden print:block px-3 pb-3">
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-black p-1">Date</th>
                            <th className="border border-black p-1">Code</th>
                            <th className="border border-black p-1">School Name</th>
                            <th className="border border-black p-1">Bun</th>
                            <th className="border border-black p-1">Egg</th>
                            <th className="border border-black p-1">Banana</th>
                            <th className="border border-black p-1">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRows.map((d) => (
                            <tr key={d.id} className="break-inside-avoid">
                                <td className="border border-black p-1 text-center">{d.date}</td>
                                <td className="border border-black p-1 text-center">{d.school_code || "-"}</td>
                                <td className="border border-black p-1">{d.school_name}</td>
                                <td className="border border-black p-1 text-center">{d.bun_delivered || 0}</td>
                                <td className="border border-black p-1 text-center">{d.egg_delivered || 0}</td>
                                <td className="border border-black p-1 text-center">{d.banana_delivered || 0}</td>
                                <td className="border border-black p-1 text-center font-bold">{d.total}</td>
                            </tr>
                        ))}
                        {sortedRows.length === 0 && (
                            <tr>
                                <td colSpan={7} className="border border-black p-3 text-center">No deliveries found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 sm:p-4 border-t border-sky-100 text-xs sm:text-sm text-gray-600 print:hidden">
                <span>
                    Showing {sortedRows.length === 0 ? 0 : (page - 1) * pageSize + 1}
                    –{Math.min(page * pageSize, sortedRows.length)} of {sortedRows.length}
                </span>
                <div className="flex items-center gap-2">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded-lg border border-sky-200 disabled:opacity-40 hover:bg-sky-50 transition">Prev</button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded-lg border border-sky-200 disabled:opacity-40 hover:bg-sky-50 transition">Next</button>
                </div>
            </div>

        </div>
    );
}




// import { useMemo, useState } from "react";

// const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// const SORT_OPTIONS = [
//     { key: "date", label: "Date" },
//     { key: "school_code", label: "School Code" },
//     { key: "school_name", label: "School Name" },
//     { key: "total", label: "Total" },
// ];

// function SortArrow({ active, direction }) {
//     return (
//         <span className="inline-block ml-1 text-xs opacity-70">
//             {active ? (direction === "asc" ? "↑" : "↓") : "↕"}
//         </span>
//     );
// }

// function Pill({ children, color = "purple" }) {
//     const colors = {
//         purple: "bg-purple-100 text-purple-700",
//         teal: "bg-teal-100 text-teal-700",
//     };
//     return (
//         <span
//             className={`inline-block px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${colors[color]}`}
//         >
//             {children}
//         </span>
//     );
// }

// function FileCell({ url, label }) {
//     if (!url) {
//         return <span className="text-gray-400 text-sm">No file</span>;
//     }
//     return (
//         <a
//             href={url}
//             target="_blank"
//             rel="noreferrer"
//             className="inline-block bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition"
//         >
//             {label || "View"}
//         </a>
//     );
// }

// // A single labeled value, used inside the mobile card layout so every
// // field reads as its own small block: label on top, value underneath.
// function FieldBlock({ label, children }) {
//     return (
//         <div className="flex flex-col gap-0.5 border border-sky-100 rounded-lg p-2 bg-sky-50/40">
//             <span className="text-[11px] uppercase tracking-wide text-gray-400">
//                 {label}
//             </span>
//             <div className="text-sm">{children}</div>
//         </div>
//     );
// }

// export default function DeliveryList({
//     deliveries,
//     schools = [],
//     handleEdit,
//     handleDelete,
// }) {
//     const [search, setSearch] = useState("");
//     const [pageSize, setPageSize] = useState(10);
//     const [page, setPage] = useState(1);
//     const [sortConfig, setSortConfig] = useState({
//         key: "date",
//         direction: "desc",
//     });

//     // Map school id -> school code, using whichever field the schools API
//     // actually provides.
//     const schoolCodeMap = useMemo(() => {
//         const map = {};
//         schools.forEach((s) => {
//             map[s.id] = s.school_code || s.code || s.emis_code || null;
//         });
//         return map;
//     }, [schools]);

//     const rows = useMemo(() => {
//         return deliveries.map((d) => ({
//             ...d,
//             school_code: schoolCodeMap[d.school] || null,
//             total:
//                 (Number(d.bun_delivered) || 0) +
//                 (Number(d.egg_delivered) || 0) +
//                 (Number(d.banana_delivered) || 0),
//         }));
//     }, [deliveries, schoolCodeMap]);

//     const filteredRows = useMemo(() => {
//         return rows.filter((d) =>
//             (d.school_name || "")
//                 .toLowerCase()
//                 .includes(search.toLowerCase())
//         );
//     }, [rows, search]);

//     const sortedRows = useMemo(() => {
//         const sorted = [...filteredRows];
//         const { key, direction } = sortConfig;

//         sorted.sort((a, b) => {
//             let aVal = a[key];
//             let bVal = b[key];

//             if (key === "total") {
//                 aVal = Number(aVal) || 0;
//                 bVal = Number(bVal) || 0;
//             } else {
//                 aVal = (aVal || "").toString().toLowerCase();
//                 bVal = (bVal || "").toString().toLowerCase();
//             }

//             if (aVal < bVal) return direction === "asc" ? -1 : 1;
//             if (aVal > bVal) return direction === "asc" ? 1 : -1;
//             return 0;
//         });

//         return sorted;
//     }, [filteredRows, sortConfig]);

//     const totalPages = Math.max(
//         1,
//         Math.ceil(sortedRows.length / pageSize)
//     );

//     const paginatedRows = useMemo(() => {
//         const start = (page - 1) * pageSize;
//         return sortedRows.slice(start, start + pageSize);
//     }, [sortedRows, page, pageSize]);

//     const handleSort = (key) => {
//         setSortConfig((prev) => {
//             if (prev.key === key) {
//                 return {
//                     key,
//                     direction: prev.direction === "asc" ? "desc" : "asc",
//                 };
//             }
//             return { key, direction: "asc" };
//         });
//     };

//     const headerBtn = (label, key) => (
//         <button
//             type="button"
//             onClick={() => handleSort(key)}
//             className="flex items-center justify-center w-full text-white font-semibold text-sm"
//         >
//             {label}
//             <SortArrow
//                 active={sortConfig.key === key}
//                 direction={sortConfig.direction}
//             />
//         </button>
//     );

//     return (
//         <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden">

//             {/* Toolbar */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between p-3 sm:p-4 border-b border-sky-100">

//                 <select
//                     value={pageSize}
//                     onChange={(e) => {
//                         setPageSize(Number(e.target.value));
//                         setPage(1);
//                     }}
//                     className="border border-sky-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition w-fit"
//                 >
//                     {PAGE_SIZE_OPTIONS.map((size) => (
//                         <option key={size} value={size}>
//                             {size}
//                         </option>
//                     ))}
//                 </select>

//                 <div className="relative w-full sm:w-72">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
//                         🔍
//                     </span>
//                     <input
//                         type="text"
//                         placeholder="Search by school name..."
//                         value={search}
//                         onChange={(e) => {
//                             setSearch(e.target.value);
//                             setPage(1);
//                         }}
//                         className="w-full border border-sky-200 rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
//                     />
//                 </div>
//             </div>

//             {/* Mobile-only sort control (table header sort buttons aren't
//                 usable in the card layout, so give an equivalent here) */}
//             <div className="flex md:hidden items-center gap-2 px-3 pb-3">
//                 <select
//                     value={sortConfig.key}
//                     onChange={(e) =>
//                         setSortConfig((prev) => ({ ...prev, key: e.target.value }))
//                     }
//                     className="border border-sky-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
//                 >
//                     {SORT_OPTIONS.map((opt) => (
//                         <option key={opt.key} value={opt.key}>
//                             Sort: {opt.label}
//                         </option>
//                     ))}
//                 </select>
//                 <button
//                     type="button"
//                     onClick={() =>
//                         setSortConfig((prev) => ({
//                             ...prev,
//                             direction: prev.direction === "asc" ? "desc" : "asc",
//                         }))
//                     }
//                     className="border border-sky-200 rounded-lg px-2 py-1.5 text-xs text-sky-700"
//                 >
//                     {sortConfig.direction === "asc" ? "↑ Asc" : "↓ Desc"}
//                 </button>
//             </div>

//             {/* Desktop / tablet table */}
//             <div className="hidden md:block overflow-x-auto">
//                 <table className="w-full text-sm min-w-[900px]">

//                     <thead>
//                         <tr className="bg-sky-500">
//                             <th
//                                 rowSpan={2}
//                                 className="p-3 border border-slate-700 align-middle"
//                             >
//                                 {headerBtn("Date", "date")}
//                             </th>
//                             <th
//                                 rowSpan={2}
//                                 className="p-3 border border-slate-700 align-middle"
//                             >
//                                 {headerBtn("School Code", "school_code")}
//                             </th>
//                             <th
//                                 rowSpan={2}
//                                 className="p-3 border border-slate-700 align-middle"
//                             >
//                                 {headerBtn("School Name", "school_name")}
//                             </th>
//                             <th
//                                 colSpan={3}
//                                 className="p-2 border border-slate-700 text-white font-semibold text-center"
//                             >
//                                 Bun
//                             </th>
//                             <th
//                                 colSpan={3}
//                                 className="p-2 border border-slate-700 text-white font-semibold text-center"
//                             >
//                                 Boiled Egg
//                             </th>
//                             <th
//                                 colSpan={3}
//                                 className="p-2 border border-slate-700 text-white font-semibold text-center"
//                             >
//                                 Banana
//                             </th>
//                             <th
//                                 rowSpan={2}
//                                 className="p-3 border border-slate-700 align-middle"
//                             >
//                                 {headerBtn("Total", "total")}
//                             </th>
//                             <th
//                                 rowSpan={2}
//                                 className="p-3 border border-slate-700 text-white font-semibold align-middle"
//                             >
//                                 Actions
//                             </th>
//                         </tr>
//                         <tr className="bg-sky-500">
//                             <th className="p-2 border border-slate-700 text-white font-medium">Count</th>
//                             <th className="p-2 border border-slate-700 text-white font-medium">Chalan No.</th>
//                             <th className="p-2 border border-slate-700 text-white font-medium">File</th>

//                             <th className="p-2 border border-slate-700 text-white font-medium">Count</th>
//                             <th className="p-2 border border-slate-700 text-white font-medium">Chalan No.</th>
//                             <th className="p-2 border border-slate-700 text-white font-medium">File</th>

//                             <th className="p-2 border border-slate-700 text-white font-medium">Count</th>
//                             <th className="p-2 border border-slate-700 text-white font-medium">Chalan No.</th>
//                             <th className="p-2 border border-slate-700 text-white font-medium">File</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {paginatedRows.map((d) => (
//                             <tr key={d.id} className="hover:bg-sky-50/50">
//                                 <td className="border border-sky-100 p-3 text-center whitespace-nowrap">
//                                     {d.date}
//                                 </td>

//                                 <td className="border border-sky-100 p-3 text-center">
//                                     {d.school_code ? (
//                                         <Pill color="purple">{d.school_code}</Pill>
//                                     ) : (
//                                         <span className="text-gray-400">—</span>
//                                     )}
//                                 </td>

//                                 <td className="border border-sky-100 p-3">
//                                     {d.school_name}
//                                 </td>

//                                 {/* Bun */}
//                                 <td className="border border-sky-100 p-3 text-center">
//                                     {d.bun_delivered || 0}
//                                 </td>
//                                 <td className="border border-sky-100 p-3 text-center">
//                                     {d.bun_chalan_no ? (
//                                         <Pill color="teal">{d.bun_chalan_no}</Pill>
//                                     ) : (
//                                         <span className="text-gray-400">—</span>
//                                     )}
//                                 </td>
//                                 <td className="border border-sky-100 p-3 text-center">
//                                     <FileCell url={d.bun_chalan_image} />
//                                 </td>

//                                 {/* Egg */}
//                                 <td className="border border-sky-100 p-3 text-center">
//                                     {d.egg_delivered || 0}
//                                 </td>
//                                 <td className="border border-sky-100 p-3 text-center">
//                                     {d.egg_chalan_no ? (
//                                         <Pill color="teal">{d.egg_chalan_no}</Pill>
//                                     ) : (
//                                         <span className="text-gray-400">—</span>
//                                     )}
//                                 </td>
//                                 <td className="border border-sky-100 p-3 text-center">
//                                     <FileCell url={d.egg_chalan_image} />
//                                 </td>

//                                 {/* Banana */}
//                                 <td className="border border-sky-100 p-3 text-center">
//                                     {d.banana_delivered || 0}
//                                 </td>
//                                 <td className="border border-sky-100 p-3 text-center">
//                                     {d.banana_chalan_no ? (
//                                         <Pill color="teal">{d.banana_chalan_no}</Pill>
//                                     ) : (
//                                         <span className="text-gray-400">—</span>
//                                     )}
//                                 </td>
//                                 <td className="border border-sky-100 p-3 text-center">
//                                     <FileCell url={d.banana_chalan_image} />
//                                 </td>

//                                 <td className="border border-sky-100 p-3 text-center font-bold">
//                                     {d.total}
//                                 </td>

//                                 <td className="border border-sky-100 p-3 text-center space-x-2 whitespace-nowrap">
//                                     <button
//                                         onClick={() => handleEdit(d)}
//                                         className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
//                                     >
//                                         ✎ Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(d.id)}
//                                         className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}

//                         {paginatedRows.length === 0 && (
//                             <tr>
//                                 <td
//                                     colSpan={13}
//                                     className="border border-sky-100 p-6 text-center text-gray-400"
//                                 >
//                                     No deliveries found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>

//                 </table>
//             </div>

//             {/* Mobile card layout — each delivery becomes a card, each
//                 field its own labeled block */}
//             <div className="md:hidden flex flex-col gap-3 p-3">
//                 {paginatedRows.map((d) => (
//                     <div
//                         key={d.id}
//                         className="border border-sky-100 rounded-xl p-3 bg-white shadow-sm"
//                     >
//                         <div className="flex items-center justify-between mb-2">
//                             <span className="text-sm font-semibold text-sky-800">
//                                 {d.school_name}
//                             </span>
//                             {d.school_code && (
//                                 <Pill color="purple">{d.school_code}</Pill>
//                             )}
//                         </div>

//                         <div className="grid grid-cols-2 gap-2 mb-3">
//                             <FieldBlock label="Date">
//                                 {d.date}
//                             </FieldBlock>
//                             <FieldBlock label="Total">
//                                 <span className="font-bold">{d.total}</span>
//                             </FieldBlock>
//                         </div>

//                         <div className="flex flex-col gap-2">

//                             <div className="border border-sky-100 rounded-lg p-2 bg-sky-50/40">
//                                 <p className="text-xs font-semibold text-sky-700 mb-1">Bun</p>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     <FieldBlock label="Count">
//                                         {d.bun_delivered || 0}
//                                     </FieldBlock>
//                                     <FieldBlock label="Chalan No.">
//                                         {d.bun_chalan_no ? (
//                                             <Pill color="teal">{d.bun_chalan_no}</Pill>
//                                         ) : (
//                                             <span className="text-gray-400">—</span>
//                                         )}
//                                     </FieldBlock>
//                                     <FieldBlock label="File">
//                                         <FileCell url={d.bun_chalan_image} />
//                                     </FieldBlock>
//                                 </div>
//                             </div>

//                             <div className="border border-sky-100 rounded-lg p-2 bg-sky-50/40">
//                                 <p className="text-xs font-semibold text-sky-700 mb-1">Boiled Egg</p>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     <FieldBlock label="Count">
//                                         {d.egg_delivered || 0}
//                                     </FieldBlock>
//                                     <FieldBlock label="Chalan No.">
//                                         {d.egg_chalan_no ? (
//                                             <Pill color="teal">{d.egg_chalan_no}</Pill>
//                                         ) : (
//                                             <span className="text-gray-400">—</span>
//                                         )}
//                                     </FieldBlock>
//                                     <FieldBlock label="File">
//                                         <FileCell url={d.egg_chalan_image} />
//                                     </FieldBlock>
//                                 </div>
//                             </div>

//                             <div className="border border-sky-100 rounded-lg p-2 bg-sky-50/40">
//                                 <p className="text-xs font-semibold text-sky-700 mb-1">Banana</p>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     <FieldBlock label="Count">
//                                         {d.banana_delivered || 0}
//                                     </FieldBlock>
//                                     <FieldBlock label="Chalan No.">
//                                         {d.banana_chalan_no ? (
//                                             <Pill color="teal">{d.banana_chalan_no}</Pill>
//                                         ) : (
//                                             <span className="text-gray-400">—</span>
//                                         )}
//                                     </FieldBlock>
//                                     <FieldBlock label="File">
//                                         <FileCell url={d.banana_chalan_image} />
//                                     </FieldBlock>
//                                 </div>
//                             </div>

//                         </div>

//                         <div className="flex gap-2 mt-3">
//                             <button
//                                 onClick={() => handleEdit(d)}
//                                 className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
//                             >
//                                 ✎ Edit
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(d.id)}
//                                 className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}

//                 {paginatedRows.length === 0 && (
//                     <div className="text-center text-gray-400 p-6">
//                         No deliveries found.
//                     </div>
//                 )}
//             </div>

//             {/* Pagination footer */}
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 sm:p-4 border-t border-sky-100 text-xs sm:text-sm text-gray-600">
//                 <span>
//                     Showing {sortedRows.length === 0 ? 0 : (page - 1) * pageSize + 1}
//                     –{Math.min(page * pageSize, sortedRows.length)} of {sortedRows.length}
//                 </span>

//                 <div className="flex items-center gap-2">
//                     <button
//                         onClick={() => setPage((p) => Math.max(1, p - 1))}
//                         disabled={page === 1}
//                         className="px-3 py-1 rounded-lg border border-sky-200 disabled:opacity-40 hover:bg-sky-50 transition"
//                     >
//                         Prev
//                     </button>
//                     <span>
//                         Page {page} of {totalPages}
//                     </span>
//                     <button
//                         onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                         disabled={page === totalPages}
//                         className="px-3 py-1 rounded-lg border border-sky-200 disabled:opacity-40 hover:bg-sky-50 transition"
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>

//         </div>
//     );
// }

