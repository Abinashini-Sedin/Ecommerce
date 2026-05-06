import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data.map(item => ({
      ...item,
      stock: Math.floor(Math.random() * 16)
    }));
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    displayedItems: [],
    categories: [],
    selectedCategory: "All",
    searchQuery: "",
    page: 1,
    itemsPerPage: 4,
    loading: false,
    error: null,
    viewMode: "grid" // "grid" or "list"
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1;
      productSlice.caseReducers.applyFilters(state);
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.page = 1;
      productSlice.caseReducers.applyFilters(state);
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    loadMore: (state) => {
      if (state.displayedItems.length < state.filteredItems.length) {
        state.page += 1;
        state.displayedItems = state.filteredItems.slice(0, state.page * state.itemsPerPage);
      }
    },
    applyFilters: (state) => {
      let result = state.items;

      if (state.selectedCategory !== "All") {
        result = result.filter(p => p.category === state.selectedCategory);
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        result = result.filter(p => p.title.toLowerCase().includes(query));
      }

      state.filteredItems = result;
      state.displayedItems = state.filteredItems.slice(0, state.page * state.itemsPerPage);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        
        const cats = new Set(action.payload.map(p => p.category));
        state.categories = ["All", ...cats];
        
        productSlice.caseReducers.applyFilters(state);
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching products";
      });
  },
});

export const { setSearchQuery, setCategory, setViewMode, loadMore } = productSlice.actions;
export default productSlice.reducer;