import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

export default function MenuToggle() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isCategories, setIsCategories] = useState(false)

    const handleToggle = () => {
        if (isCategories) {
            navigate('/') // home sahifaga qaytadi
        } else {
            navigate('/categories') // categories sahifasiga o‘tadi
        }
        setIsCategories(!isCategories)
    }

    // Sahifa o‘zgarganda holatni yangilash
    useEffect(() => {
        setIsCategories(location.pathname === '/categories')
    }, [location.pathname])

    return (
        <button
            onClick={handleToggle}
            className="md:hidden p-2 rounded hover:bg-white/10 transition"
        >
            {isCategories ? (
                <AiOutlineClose size={22} color="white" />
            ) : (
                <AiOutlineMenu size={22} color="white" />
            )}
        </button>
    )
}
