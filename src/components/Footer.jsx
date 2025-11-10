export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="container-max grid grid-cols-2 sm:grid-cols-4 gap-6 pb-10">
        <div>
          <h4 className="font-semibold mb-3 text-white">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>New</li><li>Deals</li><li>Accessories</li><li>Gift Cards</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li><li>Returns</li><li>Shipping</li><li>Warranty</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About</li><li>Careers</li><li>Blog</li><li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy</li><li>Terms</li><li>Cookies</li><li>Licenses</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700">
        <div className="container-max py-4 text-sm flex justify-between">
          <span>© {new Date().getFullYear()} eMarket</span>
          <span>Made with React & Tailwind</span>
        </div>
      </div>
    </footer>
  )
}
