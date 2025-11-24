import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/client";

/* LOAD PRODUCTS FROM FIREBASE */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await api.get("/items.json");


    const items = res.data
      ? Object.entries(res.data).map(([id, item]) => ({
        id,
        ...item,
        price: Number(item.price) || 0,
        category: item.category || "",
        subCategory: item.subCategory || "",
      }))
      : [];

    return items;
  }
);

console.log(fetchProducts());


const initialState = {
  items: [],
  filteredItems: [],
  selectedCategories: [],
  priceRange: [0, 10000],
  page: 1,
  limit: 12,
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload;
      state.filteredItems = filterItems(
        state.items,
        state.selectedCategories,
        state.priceRange
      );
      state.page = 1;
    },

    setPriceRange(state, action) {
      state.priceRange = action.payload;
      state.filteredItems = filterItems(
        state.items,
        state.selectedCategories,
        state.priceRange
      );
      state.page = 1;
    },

    clearFilter(state) {
      state.selectedCategories = [];
      state.priceRange = [0, 10000];
      state.filteredItems = state.items;
      state.page = 1;
    },

    setPage(state, action) {
      state.page = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })

      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

/* FILTER LOGIC */
function filterItems(items, selectedCategories, priceRange) {
  return items.filter((item) => {
    const inPrice =
      Number(item.price) >= priceRange[0] &&
      Number(item.price) <= priceRange[1];

    if (selectedCategories.length === 0) return inPrice;

    return selectedCategories.some((entry) => {
      const [cat, sub] = entry.split(" > ").map((s) => s.trim().toLowerCase());
      const category = item.category?.trim().toLowerCase();
      const subCategory = item.subCategory?.trim().toLowerCase();

      if (sub) return category === cat && subCategory === sub && inPrice;

      return category === cat && inPrice;
    });
  });
}

export const {
  setSelectedCategories,
  setPriceRange,
  clearFilter,
  setPage,
} = productsSlice.actions;

export default productsSlice.reducer;
