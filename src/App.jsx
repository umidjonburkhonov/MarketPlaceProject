import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import HeroCarousel from './components/HeroCarousel'
import ProductGrid from './components/ProductGrid'
import PromoBanner from './components/PromoBanner'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import CartPage from './components/CartModal'
import ProductsPage from './pages/ProductsPage'
import ProductDetail from './pages/ProductDetail'
import CategoriesPage from './pages/CategoriesPage'
import CategoryDetails from './pages/CategoryDetails'
import Signup from './pages/Signup'
import { router } from './router'
function Home() {
  return (<>
    <HeroCarousel />
    <ProductGrid title="Hot Deals" />
    <PromoBanner />
    <Newsletter />
    <Footer />
  </>)
}

export default function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={router.login} element={<Login />} />
        <Route path={router.signup} element={<Signup />} />
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><div className="section">Admin dashboard</div></ProtectedRoute>} />
        <Route path="/seller" element={<ProtectedRoute roles={['seller']}><div className="section">Seller dashboard</div></ProtectedRoute>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:name" element={<CategoryDetails />} />
      </Routes>

    </div>
  )
}
