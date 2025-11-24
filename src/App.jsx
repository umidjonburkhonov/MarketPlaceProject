import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'

import ProductGrid from './components/ProductGrid'
import PromoBanner from './components/PromoBanner'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import CartPage from './components/CartModal'
import ProductsPage from './pages/ProductsPage'
import ProductDetail from './pages/ProductDetail'
import CategoriesPage from './pages/CategoriesPage'
import CategoryDetails from './pages/CategoryDetails'
import CheckoutPage from './components/Chekout/CheckoutPage'
import WishlistPage from './pages/WishlistPage'
import AdminProducts from './pages/admin/AdminProducts'
import AdminLayout from './pages/admin/AdminLayout'
import AdminCategories from './pages/admin/AdminCategories'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Hero from './components/Hero'
import SliderAdmin from './pages/admin/SliderAdmin'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProducts } from './store/slices/productsSlice'
import OrdersAdmin from './pages/admin/OrdersAdmin'
import Login from './components/Chekout/LoginPage'
import Register from './components/Chekout/RegisterPage'
import ProfilePage from './components/Chekout/ProfilePage'
import EditProfile from './components/Chekout/EditProfile'
import ChangePassword from './components/Chekout/ChangePassword'
import OrdersPage from './components/Chekout/OrdersPage'
import OrderDetails from './components/Chekout/OrderDetails'


function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  return (<>
    <Hero />
    <ProductGrid title="Hot Deals" />
    <PromoBanner />
    <Newsletter />
    <Footer />
  </>)
}




export default function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:name" element={<CategoryDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="slider" element={<SliderAdmin />} />
          <Route path="order" element={<OrdersAdmin />} />
        </Route>
        <Route path='/profile' element={<ProfilePage />}>
          <Route path='edit' element={<EditProfile />} />
          <Route path='password' element={<ChangePassword />} />
          <Route path='orders' element={<OrdersPage />} />
        </Route>
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>

    </div>
  )
}
