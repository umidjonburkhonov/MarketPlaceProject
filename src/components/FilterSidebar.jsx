import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    setSelectedCategories,
    setPriceRange,
    clearFilter,
} from '../store/slices/productsSlice'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function FilterSidebar() {
    const dispatch = useDispatch()
    const [expanded, setExpanded] = useState(null)
    const [selected, setSelected] = useState({})
    const [priceRange, setLocalPriceRange] = useState([0, 10000])
    const [selectedRange, setSelectedRange] = useState('all')

    const categories = [
        { name: 'Food', subs: ['National', 'Asian', 'Bread', 'Dessert'] },
        { name: 'Fast Food', subs: ['Burger', 'Pizza', 'Hotdog', 'Sandwich'] },
        { name: 'Drinks', subs: ['Coffee', 'Tea', 'Juice', 'Water'] },
        { name: 'Groceries', subs: ['Fruit', 'Vegetable', 'Meat', 'Dairy'] },
        { name: 'Electronics', subs: ['Phone', 'Laptop', 'TV', 'Accessory'] },
        { name: 'Clothes', subs: ['Men', 'Women', 'Kids', 'Sportswear'] },
        { name: 'Accessories', subs: ['Watch', 'Glasses', 'Jewelry', 'Bag'] },
        { name: 'Books', subs: ['Textbook', 'Fiction', 'Children', 'Science'] },
    ]

    const handleMainCheck = (catName) => {
        const cat = categories.find((c) => c.name === catName)
        const allSubs = cat.subs
        const selectedSubs = selected[catName] || []
        const allSelected = selectedSubs.length === allSubs.length
        setSelected((prev) => ({
            ...prev,
            [catName]: allSelected ? [] : allSubs,
        }))
    }

    const toggleSub = (cat, sub) => {
        setSelected((prev) => {
            const current = prev[cat] || []
            const updated = current.includes(sub)
                ? current.filter((s) => s !== sub)
                : [...current, sub]
            return { ...prev, [cat]: updated }
        })
    }

    const toggleAccordion = (i) => {
        setExpanded(expanded === i ? null : i)
    }

    const handleRangeClick = (range) => {
        setSelectedRange(range)
        switch (range) {
            case 'under20':
                setLocalPriceRange([0, 20])
                break
            case '25to100':
                setLocalPriceRange([25, 100])
                break
            case '100to300':
                setLocalPriceRange([100, 300])
                break
            case '300to500':
                setLocalPriceRange([300, 500])
                break
            case '500to1000':
                setLocalPriceRange([500, 1000])
                break
            case '1000to10000':
                setLocalPriceRange([1000, 10000])
                break
            default:
                setLocalPriceRange([0, 10000])
        }
    }

    useEffect(() => {
        dispatch(setPriceRange(priceRange))
    }, [priceRange])

    useEffect(() => {
        const allSelected = Object.entries(selected)
            .flatMap(([cat, subs]) =>
                subs.length > 0 ? subs.map((s) => `${cat} > ${s}`) : [cat]
            )
        dispatch(setSelectedCategories(allSelected))
    }, [selected])

    const handleClearFilters = () => {
        setSelected({})
        setSelectedRange('all')
        setLocalPriceRange([0, 10000])
        dispatch(clearFilter())
    }

    return (
        <aside className="w-full border-r border-gray-200 bg-white p-4 rounded-md">
            <h3 className="font-semibold mb-3 text-base">Category</h3>

            <div className="space-y-3 text-sm">
                {categories.map((cat, i) => {
                    const allSubs = cat.subs
                    const selectedSubs = selected[cat.name] || []
                    const allSelected = selectedSubs.length === allSubs.length

                    return (
                        <div key={cat.name} className="border-b pb-2">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        onChange={() => handleMainCheck(cat.name)}
                                    />
                                    <span className="font-medium">{cat.name}</span>
                                </label>
                                <button
                                    onClick={() => toggleAccordion(i)}
                                    className="text-gray-500 hover:text-blue-600 p-1 rounded transition"
                                >
                                    {expanded === i ? <FiChevronUp /> : <FiChevronDown />}
                                </button>
                            </div>

                            {expanded === i && (
                                <div className="ml-4 mt-2 space-y-1">
                                    {cat.subs.map((sub) => (
                                        <label
                                            key={sub}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedSubs.includes(sub)}
                                                onChange={() => toggleSub(cat.name, sub)}
                                            />
                                            <span>{sub}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}

                {(Object.keys(selected).some((cat) => selected[cat].length > 0) ||
                    selectedRange !== 'all') && (
                        <button
                            onClick={handleClearFilters}
                            className="mt-3 px-3 py-1 text-xs rounded-md border hover:bg-gray-100 transition"
                        >
                            Clear Filters
                        </button>
                    )}
            </div>

            <h3 className="font-semibold mb-3 mt-5 text-base">Price Range</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                            setLocalPriceRange([+e.target.value, priceRange[1]])
                        }
                        className="border rounded-md px-2 py-1 w-20 text-sm"
                    />
                    <span className="text-gray-500">—</span>
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                            setLocalPriceRange([priceRange[0], +e.target.value])
                        }
                        className="border rounded-md px-2 py-1 w-20 text-sm"
                    />
                </div>

                <div className="space-y-2 text-sm">
                    {[
                        ['all', 'All Price'],
                        ['under20', 'Under $20'],
                        ['25to100', '$25 - $100'],
                        ['100to300', '$100 - $300'],
                        ['300to500', '$300 - $500'],
                        ['500to1000', '$500 - $1,000'],
                        ['1000to10000', '$1,000 - $10,000'],
                    ].map(([val, label]) => (
                        <label key={val} className="flex items-center gap-2">
                            <input
                                type="radio"
                                checked={selectedRange === val}
                                onChange={() => handleRangeClick(val)}
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    )
}
