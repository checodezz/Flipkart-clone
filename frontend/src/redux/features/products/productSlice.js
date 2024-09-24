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
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading"
        }),
            builder.addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "success",
                    state.products = action.payload
            }),
            builder.addCase(fetchProducts.rejected, (state, action) => {
                state.status = "error",
                    state.error = action.error.message
            })
    }
})


export default productSlice.reducer