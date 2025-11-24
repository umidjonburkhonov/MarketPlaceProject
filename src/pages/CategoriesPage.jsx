import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import * as Icons from "react-icons/fa";

export default function CategoryPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultEmoji = "📦";

    useEffect(() => {
        async function load() {
            setLoading(true);

            try {
                const res = await api.get("/categories.json");
                const data = res.data || {};

                const arr = Object.entries(data).map(([id, val]) => ({
                    id,
                    name: val.name,
                    desc: val.desc || "",
                    icon: val.icon || "",
                    emoji: val.emoji || "",
                    color: val.color || "#e5e7eb",
                }));

                setCategories(arr);
            } catch (err) {
                console.log("Category load error:", err);
            }

            setLoading(false);
        }

        load();
    }, []);

    if (loading)
        return (
            <section className="h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
                Loading categories…
            </section>
        );

    return (
        <section className="min-h-screen pt-5 px-5 pb-10 bg-gray-50 dark:bg-gray-900">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                Kategoriyalar
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((cat) => {
                    const Icon = Icons[cat.icon]; // ICON Component yoki undefined

                    return (
                        <div
                            key={cat.id}
                            style={{ backgroundColor: cat.color }}
                            onClick={() => navigate(`/category/${cat.name}`)}
                            className="hover:bg-opacity-90 active:scale-95 transition rounded-xl shadow-sm hover:shadow-md cursor-pointer p-4 flex flex-col items-center justify-center text-center"
                        >
                            {/* ICON yoki EMOJI */}
                            {Icon ? (
                                <Icon size={40} className="text-gray-800 dark:text-gray-100" />
                            ) : cat.emoji ? (
                                <span className="text-4xl">{cat.emoji}</span>
                            ) : (
                                <span className="text-4xl">{defaultEmoji}</span>
                            )}

                            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-2">
                                {cat.name}
                            </h3>

                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                {cat.desc || "—"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
