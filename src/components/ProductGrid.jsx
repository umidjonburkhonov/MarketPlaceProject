import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { setPage } from "../store/slices/productsSlice";

export default function ProductGrid() {
  const dispatch = useDispatch();

  const { filteredItems, page, limit } = useSelector((state) => state.products);

  // Safety check
  const all = Array.isArray(filteredItems) ? filteredItems : [];

  const start = (page - 1) * limit;
  const paginated = all.slice(start, start + limit);

  /* NO PRODUCTS */
  if (all.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        No products found
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col items-center py-6 sm:py-10 bg-gray-50 dark:bg-gray-900 px-3">
      {/* GRID */}
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
        {paginated.map((item) => (
          <div
            key={item.id}
            className="
              bg-white dark:bg-gray-800
              rounded-2xl 
              shadow-sm 
              hover:shadow-lg 
              transition-all 
              duration-300 
              overflow-hidden 
              border 
              border-gray-100 dark:border-gray-700
            "
          >
            <ProductCard item={item} />
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-10">
        <Pagination
          page={page}
          total={all.length}
          limit={limit}
          onChange={(p) => dispatch(setPage(p))}
        />
      </div>
    </section>
  );
}
