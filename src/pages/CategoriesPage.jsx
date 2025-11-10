import { useNavigate } from 'react-router-dom'

export default function CategoryPage() {
    const navigate = useNavigate()

    const categories = [
        { id: 1, name: 'Food', emoji: '🍔', desc: 'Mazali taomlar', color: 'bg-orange-100' },
        { id: 2, name: 'Fast Food', emoji: '🍟', desc: 'Tez tayyorlanadigan ovqatlar', color: 'bg-yellow-100' },
        { id: 3, name: 'Drinks', emoji: '🧃', desc: 'Ichimliklar', color: 'bg-purple-100' },
        { id: 4, name: 'Groceries', emoji: '🥦', desc: 'Oziq-ovqat mahsulotlari', color: 'bg-green-100' },
        { id: 5, name: 'Electronics', emoji: '💻', desc: 'Texnika va gadjetlar', color: 'bg-blue-100' },
        { id: 6, name: 'Clothes', emoji: '👕', desc: 'Kiyimlar', color: 'bg-pink-100' },
        { id: 7, name: 'Accessories', emoji: '🎧', desc: 'Aksessuarlar', color: 'bg-indigo-100' },
        { id: 8, name: 'Books', emoji: '📚', desc: 'Kitoblar', color: 'bg-amber-100' },
    ]

    return (
        <section className="min-h-screen pt-5 px-5 pb-10 bg-gray-50 dark:bg-gray-900">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                Kategoriyalar
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => navigate(`/category/${cat.name}`)}
                        className={`${cat.color} hover:bg-opacity-90 active:scale-95 transition rounded-xl shadow-sm hover:shadow-md cursor-pointer p-4 flex flex-col items-center justify-center text-center`}
                    >
                        <span className="text-4xl mb-2">{cat.emoji}</span>
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                            {cat.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{cat.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
