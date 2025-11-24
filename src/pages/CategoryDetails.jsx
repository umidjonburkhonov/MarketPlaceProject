import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, useMemo, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { FiArrowLeft } from 'react-icons/fi';
import { api } from '../api/client';

export default function CategoryDetails() {
    const navigate = useNavigate();
    const { name } = useParams();
    const { items } = useSelector((state) => state.products);

    const [subCategories, setSubCategories] = useState([]);
    const [selectedSub, setSelectedSub] = useState(null);
    const [visibleCount, setVisibleCount] = useState(10);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef(null);

    // 1) Load subcategories from server
    useEffect(() => {
        async function loadSubs() {
            try {
                const res = await api.get('/categories.json');
                const data = res.data || {};

                const arr = Object.entries(data).map(([id, value]) => ({
                    id,
                    name: value.name,
                    subs: Array.isArray(value.subs) ? value.subs : [],
                }));

                const current = arr.find((c) => c.name === name);

                setSubCategories(current?.subs || []);
            } catch (err) {
                console.log('Error loading subs:', err);
            }
        }

        loadSubs();
    }, [name]);

    // 2) Filter products by category + subCategory
    const filtered = useMemo(() => {
        let result = items.filter((p) => p.category === name);
        if (selectedSub) {
            result = result.filter((p) => p.subCategory === selectedSub);
        }
        return result;
    }, [items, name, selectedSub]);

    const visibleProducts = filtered.slice(0, visibleCount);

    // 3) Infinite scroll
    useEffect(() => {
        if (loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < filtered.length) {
                    setLoading(true);
                    setTimeout(() => {
                        setVisibleCount((prev) => prev + 10);
                        setLoading(false);
                    }, 600);
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, filtered.length, loading]);

    // Reset when subcategory changes
    useEffect(() => {
        setVisibleCount(10);
    }, [selectedSub, name]);

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-10">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
                >
                    <FiArrowLeft size={18} /> Back
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 capitalize">
                    {name}
                </h2>

                <div />
            </div>

            {/* SUBCATEGORY FILTERS */}
            {subCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setSelectedSub(null)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${!selectedSub
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        All
                    </button>

                    {subCategories.map((sub) => (
                        <button
                            key={sub}
                            onClick={() => setSelectedSub(sub)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${selectedSub === sub
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            {sub}
                        </button>
                    ))}
                </div>
            )}

            {/* PRODUCT GRID */}
            <div className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-4 
                xl:grid-cols-6 
                gap-4 sm:gap-5 lg:gap-6
            ">
                {visibleProducts.length > 0 ? (
                    visibleProducts.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100 dark:border-gray-700"
                        >
                            <ProductCard item={item} />
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 mt-6">
                        No products found.
                    </p>
                )}
            </div>

            {/* LOADER */}
            <div ref={loaderRef} className="flex justify-center py-6">
                {loading && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <div className="w-5 h-5 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
                        <span>Loading...</span>
                    </div>
                )}
            </div>

        </section>
    );
}
