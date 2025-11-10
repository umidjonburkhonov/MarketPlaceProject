import { useSelector, useDispatch } from 'react-redux'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
// import { filterByCategory, clearFilter, setPage } from '../store/slices/productsSlice'

export default function ProductGrid({ title }) {
  const dispatch = useDispatch()
  const { items, selectedCategory, page, limit } = useSelector((s) => s.products)
  const filtered = selectedCategory
    ? items.filter((i) => i.category === selectedCategory)
    : items
  const start = (page - 1) * limit
  const current = filtered.slice(start, start + limit)

  return (
    <section className="w-full px-3 sm:px-6 lg:px-10 py-5">
      {/* Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h2>

        {/* Category buttons */}
        <div className="flex flex-wrap gap-2">
          {['Gaming', 'Audio', 'Phones', 'Computers', 'Wearables', 'Accessories'].map((c) => (
            <button
              key={c}
              onClick={() => {
                dispatch(filterByCategory(c))
                dispatch(setPage(1))
              }}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition ${selectedCategory === c
                ? 'bg-brand-accent text-white border-brand-accent'
                : 'border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600'
                }`}
            >
              {c}
            </button>
          ))}
          {selectedCategory && (
            <button
              onClick={() => dispatch(clearFilter())}
              className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
            >
              All
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          xl:grid-cols-6 
          gap-3 sm:gap-4 lg:gap-5
        "
      >
        {current.length > 0 ? (
          current.map((p) => <ProductCard key={p.id} item={p} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 text-sm mt-6">
            No products found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          page={page}
          total={filtered.length}
          limit={limit}
          onChange={(p) => dispatch(setPage(p))}
        />
      </div>
    </section>
  )
}
