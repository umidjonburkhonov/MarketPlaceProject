import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { setPriceRange, setSelectedCategories } from '../store/slices/productsSlice'
import FilterSidebar from '../components/FilterSidebar'
import ProductCard from '../components/ProductCard'
import { FiFilter } from 'react-icons/fi'

export default function ProductsPage() {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const loaderRef = useRef(null)

    const { filteredItems } = useSelector((state) => state.products)

    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [visibleCount, setVisibleCount] = useState(12)
    const [loading, setLoading] = useState(false)

    const visibleProducts = filteredItems.slice(0, visibleCount)

    // Infinite Scroll
    useEffect(() => {
        if (loading) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleCount < filteredItems.length) {
                    setLoading(true)
                    setTimeout(() => {
                        setVisibleCount((prev) => prev + 12)
                        setLoading(false)
                    }, 600)
                }
            },
            { threshold: 1.0 }
        )

        if (loaderRef.current) observer.observe(loaderRef.current)

        return () => observer.disconnect()
    }, [visibleCount, filteredItems.length, loading])

    // Reset when filteredItems change
    useEffect(() => {
        setVisibleCount(12)
    }, [filteredItems])

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">

            {/* ---- DESKTOP SIDEBAR ---- */}
            <div className="hidden md:block w-72 border-r border-gray-200 dark:border-gray-700">
                <FilterSidebar
                    onPriceChange={(range) => dispatch(setPriceRange(range))}
                    onCategoryChange={(cats) => dispatch(setSelectedCategories(cats))}
                />
            </div>

            {/* ---- MAIN ---- */}
            <main className="flex-1 p-5 sm:p-8">

                {/* Mobile Filter Button */}
                <div className="md:hidden flex justify-end mb-4">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 dark:text-gray-200 shadow-sm"
                    >
                        <FiFilter /> Filters
                    </button>
                </div>

                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    {filteredItems.length > 0
                        ? `Products (${filteredItems.length})`
                        : 'No products found'}
                </h2>

                {/* ---- GRID ---- */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
                    {visibleProducts.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                        >
                            <ProductCard item={item} />
                        </div>
                    ))}
                </div>

                {/* ---- INFINITE LOADER ---- */}
                <div ref={loaderRef} className="flex justify-center py-6">
                    {loading && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <div className="w-5 h-5 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
                            <span>Loading...</span>
                        </div>
                    )}
                </div>

                {filteredItems.length === 0 && (
                    <p className="text-sm text-gray-500 mt-6">No products match this filter.</p>
                )}
            </main>

            {/* ---- MOBILE FILTER ---- */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 flex" onClick={() => setIsFilterOpen(false)}>
                    <div className="flex-1 bg-black/40 transition-opacity duration-300" />

                    <div
                        className="w-[80%] h-full bg-white dark:bg-gray-800 shadow-xl overflow-auto transform transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Filters</h3>

                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Done
                            </button>
                        </div>

                        <FilterSidebar
                            onPriceChange={(range) => dispatch(setPriceRange(range))}
                            onCategoryChange={(cats) => dispatch(setSelectedCategories(cats))}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
