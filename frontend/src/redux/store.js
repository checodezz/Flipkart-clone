import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./features/products/productSlice";
import productDetailSlice from "./features/products/productDetailSlice";
const store = configureStore({
    reducer: {
        products: productSlice,
        productDetail: productDetailSlice
    }
})

export default store;