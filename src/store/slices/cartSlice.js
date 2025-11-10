import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQty: 0, totalPrice: 0 },
  reducers: {
    addToCart(state, action) {
      const item = action.payload
      const found = state.items.find(i => i.id === item.id)
      if (found) found.qty += 1
      else state.items.push({ ...item, qty: 1 })
      state.totalQty += 1
      state.totalPrice = state.items.reduce((s, i) => s + i.price * i.qty, 0)
    },
    removeFromCart(state, action) {
      const id = action.payload
      const i = state.items.findIndex(it => it.id === id)
      if (i !== -1) {
        state.totalQty -= state.items[i].qty
        state.items.splice(i, 1)
        state.totalPrice = state.items.reduce((s, it) => s + it.price * it.qty, 0)
      }
    },
    clearCart(state) {
      state.items = []
      state.totalQty = 0
      state.totalPrice = 0
    },
    incQty(state, action) {
      const it = state.items.find(i => i.id === action.payload)
      if (it) { it.qty++; state.totalQty++; state.totalPrice = state.items.reduce((s, i) => s + i.price * i.qty, 0) }
    },
    decQty(state, action) {
      const it = state.items.find(i => i.id === action.payload)
      if (it) {
        it.qty--; state.totalQty--;
        if (it.qty <= 0) { state.items = state.items.filter(x => x.id !== it.id) }
        state.totalPrice = state.items.reduce((s, i) => s + i.price * i.qty, 0)
      }
    },

  }
})

export const { addToCart, removeFromCart, clearCart, incQty, decQty } = slice.actions
export default slice.reducer
