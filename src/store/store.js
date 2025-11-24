import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import productsReducer, { fetchProducts } from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import ordersReducer from './slices/ordersSlice'
import wishlistReducer from './slices/wishlistSlice' // ✅ bu yerda import qil

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  orders: ordersReducer,
  wishlist: wishlistReducer, // ✅ bu yerga qo‘sh
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth', 'orders', 'wishlist'],
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
