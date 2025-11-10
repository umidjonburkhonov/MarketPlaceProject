import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import { AiFillStar } from 'react-icons/ai'

export default function ProductDetail() {
    const { id } = useParams()
    const product = useSelector(s => s.products.items.find(p => p.id === Number(id)))
    const dispatch = useDispatch()

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center text-gray-500">
                <p>Product not found</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 grid md:grid-cols-2 gap-8">

                {/* Image Gallery */}
                <div className="flex flex-col items-center">
                    <img src={product.image} alt={product.title} className="w-full max-w-sm object-cover rounded-md border" />
                    <div className="flex gap-2 mt-3">
                        {[1, 2, 3, 4].map(i => (
                            <img key={i} src={product.image} alt="" className="w-16 h-16 object-cover rounded-md border" />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-2 mb-4">
                        <AiFillStar className="text-yellow-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating} / 5</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">{product.desc}</p>

                    <div className="text-2xl font-bold text-brand-primary mb-4">
                        ${product.price.toFixed(2)}
                    </div>

                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={() => dispatch(addToCart(product))}
                            className="flex-1 bg-brand-primary text-white rounded-md py-2 hover:bg-brand-accent transition"
                        >
                            Add to Cart
                        </button>
                        <button className="flex-1 border rounded-md py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            Buy Now
                        </button>
                    </div>

                    <div className="border-t pt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p>• Category: <span className="font-medium">{product.category}</span></p>
                        <p>• Free shipping for orders over $100</p>
                        <p>• 30-day return policy</p>
                    </div>

                    <div className="mt-6">
                        <Link to="/" className="text-brand-primary hover:underline">← Back to shop</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
