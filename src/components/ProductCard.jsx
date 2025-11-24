import { useDispatch, useSelector } from 'react-redux'
import { addToCart, incQty, decQty } from '../store/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice'
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ item }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartItem = useSelector((s) => s.cart.items.find((i) => i.id === item.id))
  const wishlistItems = useSelector((s) => s.wishlist.items)

  const inCart = Boolean(cartItem)
  const isLiked = wishlistItems.some((i) => i.id === item.id)

  // Fallback values
  const price = Number(item.price) || 0
  const rating = item.rating || 4.5

  // Secure image extraction
  const mainImage =
    item.image ||
    item.images?.[0]?.url ||
    item.gallery?.[0] ||
    "/placeholder.png"

  const toggleWishlist = (e) => {
    e.stopPropagation()

    if (isLiked) dispatch(removeFromWishlist(item.id))
    else dispatch(addToWishlist(item))
  }

  return (
    <div
      onClick={() => navigate(`/product/${item.id}`)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden rounded-t-xl">
        <img
          src={mainImage}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />

        {/* RATING */}
        <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-900/80 
                        px-2 py-1 rounded-md text-xs flex items-center gap-1 font-medium">
          <AiFillStar className="text-yellow-400" />
          <span>{rating}</span>
        </div>

        {/* WISHLIST BUTTON */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-gray-900/80 
                     rounded-full hover:scale-110 transition"
        >
          {isLiked ? (
            <AiFillHeart className="text-red-500" size={18} />
          ) : (
            <AiOutlineHeart className="text-gray-600 dark:text-gray-300" size={18} />
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-between flex-1 p-3">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1 mb-1 text-sm sm:text-base">
            {item.title || "No title"}
          </h4>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {item.desc || "No description"}
          </p>
        </div>

        {/* PRICE + CART */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm sm:text-lg font-semibold text-brand-primary">
            ${price.toFixed(2)}
          </span>

          {/* Not Added → Add Button */}
          {!inCart ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                dispatch(addToCart({ ...item, qty: 1 }))
              }}
              className="flex items-center justify-center p-2.5 rounded-full
                         bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                         hover:bg-brand-primary hover:text-white transition shadow-sm"
            >
              <FiShoppingCart size={17} />
            </button>
          ) : (
            // Already Added → Quantity Controller
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-gray-100 dark:bg-gray-700 
                         rounded-full shadow-sm"
            >
              <button
                onClick={() => dispatch(decQty(item.id))}
                className="p-2 text-gray-700 dark:text-gray-200 hover:text-brand-accent"
              >
                <FiMinus size={14} />
              </button>

              <span className="px-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
                {cartItem.qty}
              </span>

              <button
                onClick={() => dispatch(incQty(item.id))}
                className="p-2 text-gray-700 dark:text-gray-200 hover:text-brand-accent"
              >
                <FiPlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
