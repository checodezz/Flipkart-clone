import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL

export const fetchProductsById = createAsyncThunk("products/fetchProductsById", async (productId) => {
    const response = await axios.get(`${url}/productDetail/${productId}`);
    console.log(response.data);
    return response.data
})

const productDetailSlice = createSlice({
    name: "productDetail",
    initialState: {
        status: null,
        product: [],
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsById.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchProductsById.fulfilled, (state, action) => {
                state.status = "success",
                    state.product = action.payload;
            })
            .addCase(fetchProductsById.rejected, (state, action) => {
                state.status = "error",
                    state.error = action.error.message
            })
    }
})

// export const { }
export default productDetailSlice.reducer