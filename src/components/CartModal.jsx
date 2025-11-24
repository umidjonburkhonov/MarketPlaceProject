import { useSelector, useDispatch } from 'react-redux'
import { clearCart, incQty, decQty, removeFromCart } from '../store/slices/cartSlice'
import { AiOutlineDelete } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function CartPage() {
    const navigate = useNavigate()
    const { items, totalPrice } = useSelector((s) => s.cart)
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem("user"))
    const [showAuth, setShowAuth] = useState(!user) // ❗ login bo‘lmagan bo‘lsa modal avtomatik ochiladi

    return (
        <div className="relative">

            {/* ===== BACKGROUND (blur agar login bo‘lmagan bo‘lsa) ===== */}
            <div className={showAuth ? "blur-sm pointer-events-none select-none" : ""}>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
                    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">

                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-5">
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Your Cart
                            </h1>

                            {items.length > 0 && user && (
                                <button
                                    onClick={() => dispatch(clearCart())}
                                    className="px-4 py-2 border border-red-400 text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900 transition"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* EMPTY CART */}
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
                                {/* ITEMS LIST */}
                                <div className="space-y-4">
                                    {items.map((it) => (
                                        <div
                                            key={it.id}
                                            className="flex items-center gap-4 border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800 hover:shadow transition"
                                        >
                                            <img
                                                src={it.image}
                                                alt={it.title}
                                                className="w-20 h-20 object-cover rounded-md border"
                                            />

                                            <div className="flex-1">
                                                <h4 className="font-medium line-clamp-1">{it.title}</h4>

                                                {/* VARIANTS CHOSEN */}
                                                {it.chosenVariants && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {Object.entries(it.chosenVariants)
                                                            .map(([k, v]) => `${k}: ${v}`)
                                                            .join(" | ")}
                                                    </p>
                                                )}

                                                <p className="text-sm text-gray-500 mt-1">
                                                    ${(it.price * it.qty).toFixed(2)}
                                                </p>

                                                {/* QTY CONTROLS */}
                                                <div className="flex items-center gap-3 mt-2">
                                                    <button
                                                        onClick={() => dispatch(decQty(it.id))}
                                                        className="w-7 h-7 border rounded flex items-center justify-center"
                                                    >
                                                        −
                                                    </button>

                                                    <span className="w-6 text-center">{it.qty}</span>

                                                    <button
                                                        onClick={() => dispatch(incQty(it.id))}
                                                        className="w-7 h-7 border rounded flex items-center justify-center"
                                                    >
                                                        +
                                                    </button>

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

                                {/* TOTAL */}
                                <div className="mt-6 border-t pt-4 flex items-center justify-between">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        Total:
                                    </span>
                                    <span className="text-lg font-bold text-brand-primary">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>

                                {/* CHECKOUT BUTTON */}
                                <div className="mt-6">
                                    <button
                                        onClick={() => {
                                            const user = JSON.parse(localStorage.getItem("user"));

                                            if (!user) {
                                                // login qilmagan → login page
                                                return navigate("/login");
                                            }

                                            // kerakli majburiy maydonlar
                                            const requiredFields = ["name", "phone", "address"];

                                            const missing = requiredFields.some(
                                                (f) => !user[f] || user[f].trim() === ""
                                            );

                                            if (missing) {
                                                // ma'lumotlar yetarli emas → profile edit page
                                                return navigate("/profile/edit");
                                            }

                                            // hammasi joyida → checkout page
                                            navigate("/checkout");
                                        }}
                                        className="w-full bg-brand-primary text-white rounded-md py-3 text-lg hover:bg-brand-accent transition"
                                    >
                                        Checkout
                                    </button>
                                </div>

                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== AUTH MODAL ===== */}
            {showAuth && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-lg text-center">

                        <h3 className="text-lg font-semibold text-gray-800">Account Required</h3>
                        <p className="text-xs text-gray-500 mt-1 mb-4">
                            To continue shopping, sign in or create an account.
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full py-2.5 bg-brand-primary text-white rounded-lg hover:bg-brand-accent transition text-sm font-medium"
                            >
                                Sign In
                            </button>

                            <button
                                onClick={() => navigate("/register")}
                                className="w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
