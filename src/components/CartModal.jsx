import { useSelector, useDispatch } from 'react-redux'
import { clearCart, incQty, decQty, removeFromCart } from '../store/slices/cartSlice'
import { AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { router } from '../router'
export default function CartPage() {
    const navigate = useNavigate()
    const { items, totalPrice } = useSelector(s => s.cart)
    const dispatch = useDispatch()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
                <h1 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Your Cart</h1>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <p className="mb-3 text-sm">Your cart is empty</p>
                        <Link
                            to="/"
                            className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-accent transition"
                        >
                            Go Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {items.map(it => (
                                <div
                                    key={it.id}
                                    className="flex items-center gap-4 border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 hover:shadow transition"
                                >
                                    <img src={it.image} alt={it.title} className="w-20 h-20 object-cover rounded-md border" />
                                    <div className="flex-1">
                                        <h4 className="font-medium line-clamp-1">{it.title}</h4>
                                        <p className="text-sm text-gray-500">${(it.price * it.qty).toFixed(2)}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <button onClick={() => dispatch(decQty(it.id))} className="w-7 h-7 border rounded flex items-center justify-center">−</button>
                                            <span className="w-6 text-center">{it.qty}</span>
                                            <button onClick={() => dispatch(incQty(it.id))} className="w-7 h-7 border rounded flex items-center justify-center">+</button>
                                            <button
                                                onClick={() => dispatch(removeFromCart(it.id))}
                                                className="ml-auto text-gray-400 hover:text-red-500 transition"
                                            >
                                                <AiOutlineDelete size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 border-t pt-4 flex items-center justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Total:</span>
                            <span className="text-lg font-semibold text-brand-primary">${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="flex-1 border rounded-md py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            >
                                Clear
                            </button>
                            <button className="flex-1 bg-brand-primary text-white rounded-md py-2 hover:bg-brand-accent transition">
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
