import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    setSelectedCategories,
    setPriceRange,
    clearFilter,
} from "../store/slices/productsSlice";
import { api } from "../api/client";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function FilterSidebar() {
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(null);
    const [selected, setSelected] = useState({});
    const [categories, setCategories] = useState([]);

    const [priceRange, setLocalPriceRange] = useState([0, 10000]);
    const [selectedRange, setSelectedRange] = useState("all");

    /* FIREBASE → FIX LIST */
    const fixList = (v) => {
        if (Array.isArray(v)) return v;
        if (typeof v === "object" && v !== null) return Object.values(v);
        return [];
    };

    /* LOAD CATEGORIES FROM FIREBASE */
    const fetchCategories = async () => {
        const res = await api.get("/categories.json");

        const data = res.data || {};

        const arr = Object.entries(data).map(([id, val]) => ({
            id,
            name: val.name,
            subs: fixList(val.subs),
        }));

        setCategories(arr);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    /* MAIN CHECKBOX — SELECT ALL SUBS */
    const handleMainCheck = (catName) => {
        const cat = categories.find((c) => c.name === catName);
        const allSubs = cat.subs;
        const selectedSubs = selected[catName] || [];

        const allSelected = selectedSubs.length === allSubs.length;

        setSelected((prev) => ({
            ...prev,
            [catName]: allSelected ? [] : [...allSubs],
        }));
    };

    /* TOGGLE SINGLE SUBCATEGORY */
    const toggleSub = (cat, sub) => {
        setSelected((prev) => {
            const current = prev[cat] || [];
            const exists = current.includes(sub);

            const updated = exists
                ? current.filter((s) => s !== sub)
                : [...current, sub];

            return { ...prev, [cat]: updated };
        });
    };

    /* PRICE PRESETS */
    const handleRangeClick = (range) => {
        setSelectedRange(range);

        const map = {
            all: [0, 10000],
            under20: [0, 20],
            "25to100": [25, 100],
            "100to300": [100, 300],
            "300to500": [300, 500],
            "500to1000": [500, 1000],
            "1000to10000": [1000, 10000],
        };

        setLocalPriceRange(map[range] || [0, 10000]);
    };

    /* SYNC PRICE RANGE TO REDUX */
    useEffect(() => {
        dispatch(setPriceRange(priceRange));
    }, [priceRange]);

    /* SYNC CATEGORIES TO REDUX */
    useEffect(() => {
        const formatted = Object.entries(selected).flatMap(([cat, subs]) =>
            subs.length > 0 ? subs.map((s) => `${cat} > ${s}`) : [cat]
        );

        dispatch(setSelectedCategories(formatted));
    }, [selected]);

    /* CLEAR ALL FILTERS */
    const handleClearFilters = () => {
        setSelected({});
        setSelectedRange("all");
        setLocalPriceRange([0, 10000]);
        dispatch(clearFilter());
    };

    /* ACCORDION */
    const toggleAccordion = (i) => {
        setExpanded(expanded === i ? null : i);
    };

    return (
        <aside className="w-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-md">
            <h3 className="font-semibold mb-3 text-base text-gray-900 dark:text-gray-100">
                Categories
            </h3>

            {/* CATEGORY LIST */}
            <div className="space-y-3 text-sm">
                {categories.map((cat, i) => {
                    const selectedSubs = selected[cat.name] || [];
                    const allSubs = cat.subs;
                    const allSelected = selectedSubs.length === allSubs.length;

                    return (
                        <div key={cat.id} className="border-b pb-2 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        onChange={() => handleMainCheck(cat.name)}
                                    />
                                    <span className="font-medium text-gray-800 dark:text-gray-100">
                                        {cat.name}
                                    </span>
                                </label>

                                <button
                                    onClick={() => toggleAccordion(i)}
                                    className="text-gray-500 hover:text-blue-600 p-1"
                                >
                                    {expanded === i ? <FiChevronUp /> : <FiChevronDown />}
                                </button>
                            </div>

                            {expanded === i && (
                                <div className="ml-4 mt-2 space-y-1">
                                    {cat.subs.map((sub) => (
                                        <label
                                            key={sub}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedSubs.includes(sub)}
                                                onChange={() => toggleSub(cat.name, sub)}
                                            />
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {sub}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* CLEAR BUTTON */}
                {(Object.keys(selected).some((c) => selected[c].length > 0) ||
                    selectedRange !== "all") && (
                        <button
                            onClick={handleClearFilters}
                            className="mt-3 px-3 py-1 text-xs rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                            Clear Filters
                        </button>
                    )}
            </div>

            {/* PRICE RANGE */}
            <h3 className="font-semibold mb-3 mt-5 text-base text-gray-900 dark:text-gray-100">
                Price Range
            </h3>

            <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                            setLocalPriceRange([+e.target.value, priceRange[1]])
                        }
                        className="border dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md px-2 py-1 w-20 text-sm"
                    />
                    <span className="text-gray-500">—</span>
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                            setLocalPriceRange([priceRange[0], +e.target.value])
                        }
                        className="border dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md px-2 py-1 w-20 text-sm"
                    />
                </div>

                {/* PRESET BUTTONS */}
                <div className="space-y-2 text-sm">
                    {[
                        ["all", "All Price"],
                        ["under20", "Under $20"],
                        ["25to100", "$25 - $100"],
                        ["100to300", "$100 - $300"],
                        ["300to500", "$300 - $500"],
                        ["500to1000", "$500 - $1,000"],
                        ["1000to10000", "$1,000 - $10,000"],
                    ].map(([val, label]) => (
                        <label
                            key={val}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="radio"
                                checked={selectedRange === val}
                                onChange={() => handleRangeClick(val)}
                            />
                            <span className="text-gray-700 dark:text-gray-300">{label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}
