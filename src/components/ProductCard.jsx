import { useDispatch, useSelector } from 'react-redux'
import { addToCart, incQty, decQty } from '../store/slices/cartSlice'
import { AiFillStar } from 'react-icons/ai'
import { FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ item }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItem = useSelector((s) => s.cart.items.find((i) => i.id === item.id))
  const inCart = Boolean(cartItem)

  return (
    <div
      onClick={() => navigate(`/product/${item.id}`)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col"
    >
      {/* Product Image */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden rounded-t-xl">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
        <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-900/80 px-2 py-1 rounded-md text-xs flex items-center gap-1 font-medium">
          <AiFillStar className="text-yellow-400" />
          <span>{item.rating}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-1 p-3">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1 mb-1 text-sm sm:text-base">
            {item.title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {item.desc}
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm sm:text-lg font-semibold text-brand-primary">
            ${item.price.toFixed(2)}
          </span>

          {/* If not in cart — show Cart Icon */}
          {!inCart ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                dispatch(addToCart(item))
              }}
              className="flex items-center justify-center p-2.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-brand-primary hover:text-white transition shadow-sm"
            >
              <FiShoppingCart size={17} />
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full shadow-sm"
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
