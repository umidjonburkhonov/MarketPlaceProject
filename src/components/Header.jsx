import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineAppstore
} from 'react-icons/ai'
import MenuToggle from './MenuToggle'

export default function Header() {
  const { t, i18n } = useTranslation()
  const totalQty = useSelector((s) => s.cart.totalQty)
  const products = useSelector((s) => s.products.items)
  const navigate = useNavigate()
  const location = useLocation()

  const [scrolled, setScrolled] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Change language
  const changeLng = (e) => {
    const lng = e.target.value
    i18n.changeLanguage(lng)
    localStorage.setItem('lng', lng)
  }

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.subCategory?.toLowerCase().includes(searchQuery)
    )
    setResults(filtered.slice(0, 8))
  }, [query, products])

  const navLinks = [
    { label: t('home') || 'Home', path: '/' },
    { label: t('products') || 'Products', path: '/products' },
    { label: t('about') || 'About', path: '/about' },
    { label: t('contact') || 'Contact', path: '/contact' },
  ]

  return (
    <>
      {/* ===== HEADER ===== */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/90 backdrop-blur-md shadow-lg' : 'bg-brand-dark'
          }`}
      >
        <div className="max-w-[1300px] mx-auto flex items-center justify-between px-4 py-3 text-white">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <img src="/src/assets/logo.svg" alt="logo" className="h-7 w-7 object-contain" />
            <span className="font-semibold text-lg">BitSoft</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-brand-accent transition ${location.pathname === link.path ? 'text-brand-accent' : 'text-white'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-white/10 rounded transition"
            >
              {showSearch ? <AiOutlineClose size={20} /> : <AiOutlineSearch size={20} />}
            </button>

            {/* Language */}
            <select
              onChange={changeLng}
              defaultValue={i18n.language}
              className="bg-transparent border border-white/30 text-xs rounded px-1.5 py-0.5 focus:outline-none"
            >
              <option value="uz">UZ</option>
              <option value="en">EN</option>
            </select>

            {/* Wishlist */}
            <button
              onClick={() => navigate('/wishlist')}
              className="hidden sm:hidden md:block relative p-2 hover:bg-white/10 rounded transition"
            >
              <AiOutlineHeart size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="hidden sm:hidden md:block relative p-2 hover:bg-white/10 rounded transition"
            >
              <AiOutlineShoppingCart size={20} />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-[10px] px-1 rounded">
                  {totalQty}
                </span>
              )}
            </button>

            <MenuToggle />
          </div>
        </div>

        {/* ===== SEARCH BAR ===== */}
        {showSearch && (
          <div className="relative bg-white shadow-md flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 border-b">
              <AiOutlineSearch className="text-gray-500" size={18} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 text-sm text-gray-800 outline-none"
              />
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="absolute top-[44px] left-0 right-0 bg-white shadow-lg rounded-b-md max-h-[320px] overflow-y-auto z-50">
                {results.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setShowSearch(false)
                      setQuery('')
                      navigate(`/product/${item.id}`)
                    }}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.category} • ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No results */}
            {query.trim() && results.length === 0 && (
              <div className="absolute top-[44px] left-0 right-0 bg-white text-sm text-gray-500 p-3 text-center">
                No products found
              </div>
            )}
          </div>
        )}
      </header>

      <div className="h-[64px]" />

      {/* ===== MOBILE BOTTOM MENU ===== */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 z-50">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center text-[11px] ${location.pathname === '/' ? 'text-brand-primary' : 'text-gray-600'
            }`}
        >
          <AiOutlineHome size={22} />
          Home
        </button>

        <button
          onClick={() => navigate('/products')}
          className={`flex flex-col items-center text-[11px] ${location.pathname === '/products' ? 'text-brand-primary' : 'text-gray-600'
            }`}
        >
          <AiOutlineAppstore size={22} />
          Products
        </button>

        <button
          onClick={() => navigate('/wishlist')}
          className={`flex flex-col items-center text-[11px] ${location.pathname === '/wishlist' ? 'text-brand-primary' : 'text-gray-600'
            }`}
        >
          <AiOutlineHeart size={22} />
          Like
        </button>

        <button
          onClick={() => navigate('/cart')}
          className="relative flex flex-col items-center text-[11px] text-gray-600"
        >
          <AiOutlineShoppingCart size={22} />
          {totalQty > 0 && (
            <span className="absolute top-0 right-3 bg-brand-accent text-white text-[10px] px-1 rounded-full">
              {totalQty}
            </span>
          )}
          Cart
        </button>

        <button
          onClick={() => setShowAuth(true)}
          className="flex flex-col items-center text-[11px] text-gray-600"
        >
          <AiOutlineUser size={22} />
          Account
        </button>
      </div>

      {/* ===== AUTH MODAL ===== */}
      {showAuth && (
        <div
          onClick={() => setShowAuth(false)}
          className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-lg w-[90%] sm:w-[400px] p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Welcome</h3>
            <div className="flex flex-col gap-3">
              <button className="w-full py-2 bg-brand-primary text-white rounded-md hover:bg-brand-accent transition">
                Sign In
              </button>
              <button className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
