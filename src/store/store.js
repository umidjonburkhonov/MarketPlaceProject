import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice.js'
import cartReducer from './slices/cartSlice.js'
import authReducer from './slices/authSlice.js'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
})
