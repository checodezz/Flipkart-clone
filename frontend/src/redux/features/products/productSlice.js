import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3000"

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get(`${url}/products`);
    return response.data
})

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        filteredProducts: [],
        filters: {
            categories: [],
            priceRange: null,
            rating: null,
            sortBy: null
        },
        status: null,
        error: null
    },
    reducers: {
        setCategoryFilter: (state, action) => {
            state.filters.categories = action.payload;
            state.filteredProducts = applyFilters(state.products, state.filters)
        },
        setPriceRangeFilter: (state, action) => {
            console.log(action.payload);
            state.filters.priceRange = action.payload;
            state.filteredProducts = applyFilters(state.products, state.filters)
        },
        setRatingFilter: (state, action) => {
            state.filters.rating = action.payload;
            // console.log(action.payload)
            state.filteredProducts = applyFilters(state.products, state.filters)
        },
        clearAllFilters: (state) => {
            state.filters = {
                categories: [],
                priceRange: null,
                rating: null,
                sortBy: null
            };
            state.filteredProducts = state.products;
        },
        setSorting: (state, action) => {
            state.filters.sortBy = action.payload;
            state.filteredProducts = applyFilters(state.products, state.filters);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading"
        }),
            builder.addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "success",
                    state.products = action.payload;
                state.filteredProducts = action.payload;
            }),
            builder.addCase(fetchProducts.rejected, (state, action) => {
                state.status = "error",
                    state.error = action.error.message
            })
    }
})

const applyFilters = (products, filters) => {
    let filtered = [...products];

    if (filters.categories.length > 0) {
        filtered = filtered.filter((product) => filters.categories.includes(product.category))
    }

    if (filters.priceRange) {
        filtered = filtered.filter((product) => product.price.cost >= filters.priceRange)
    }

    if (filters.rating) {
        filtered = filtered.filter((product) => Number(product.ratings) > filters.rating);
        console.log(filtered);
    }

    if (filters.sortBy === "high-to-low") {
        filtered.sort((a, b) => b.price.cost - a.price.cost);
    } else if (filters.sortBy === "low-to-high") {
        filtered.sort((a, b) => a.price.cost - b.price.cost);
    }

    return filtered
};

export const { setCategoryFilter, setPriceRangeFilter, setRatingFilter, clearAllFilters, setSorting } = productSlice.actions
export default productSlice.reducer