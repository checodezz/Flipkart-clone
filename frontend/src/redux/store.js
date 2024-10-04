import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./features/products/productSlice";
import productDetailSlice from "./features/products/productDetailSlice";
import cartSlice from "./features/cart/cartSlice";
const store = configureStore({
    reducer: {
        products: productSlice,
        productDetail: productDetailSlice,
        cart: cartSlice
    }
})

export default store;