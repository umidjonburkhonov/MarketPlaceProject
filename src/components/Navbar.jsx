import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'New', path: '/new' },
    { name: 'Best Sellers', path: '/best' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
  ]

  return (
    <nav className="sticky top-[64px] z-20 bg-white border-b border-gray-200">
      <div className="max-w-[1300px] mx-auto flex items-center justify-between px-2 sm:px-6 py-1.5">
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.name}
              to={l.path}
              className={({ isActive }) =>
                `relative text-[13px] font-medium transition-all duration-200 
                 after:absolute after:-bottom-[2px] after:left-0 after:w-0 after:h-[2px] 
                 after:bg-brand-primary hover:after:w-full hover:text-brand-primary
                 ${isActive ? 'text-brand-primary after:w-full' : 'text-gray-700'}`
              }
            >
              {l.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="flex md:hidden gap-3 overflow-x-auto w-full scroll-smooth no-scrollbar">
          {links.map((l) => (
            <NavLink
              key={l.name}
              to={l.path}
              className={({ isActive }) =>
                `flex-shrink-0 px-2.5 py-1 text-[12px] font-medium rounded-full border transition 
                 ${isActive
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {l.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Hide scrollbar for all browsers */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </nav>
  )
}
