import { createSlice } from '@reduxjs/toolkit'
import data from '../slices/data/items.json'

const initialState = {
  items: data.items,
  filteredItems: data.items,
  selectedCategories: [],
  priceRange: [0, 10000],
  page: 1,
  limit: 12,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload
      state.filteredItems = filterItems(
        state.items,
        state.selectedCategories,
        state.priceRange
      )
      state.page = 1
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload
      state.filteredItems = filterItems(
        state.items,
        state.selectedCategories,
        state.priceRange
      )
      state.page = 1
    },
    clearFilter(state) {
      state.selectedCategories = []
      state.priceRange = [0, 10000]
      state.filteredItems = state.items
      state.page = 1
    },
    setPage(state, action) {
      state.page = action.payload
    },
  },
})

function filterItems(items, selectedCategories, priceRange) {
  return items.filter((item) => {
    const inPrice = item.price >= priceRange[0] && item.price <= priceRange[1]

    if (selectedCategories.length === 0) return inPrice

    return selectedCategories.some((entry) => {
      const [cat, sub] = entry.split(' > ').map((s) => s.trim().toLowerCase())
      const category = item.category?.trim().toLowerCase()
      const subCategory = item.subCategory?.trim().toLowerCase()

      if (sub) {
        return category === cat && subCategory === sub && inPrice
      } else {
        return category === cat && inPrice
      }
    })
  })
}

export const { setSelectedCategories, setPriceRange, clearFilter, setPage } =
  productsSlice.actions
export default productsSlice.reducer
