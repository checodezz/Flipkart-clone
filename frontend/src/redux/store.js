import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./features/products/productSlice";
import productDetailSlice from "./features/products/productDetailSlice";
import cartSlice from "./features/cart/cartSlice";
import wishlistSlice from "./features/wishlist/wishlistSlice"

const store = configureStore({
    reducer: {
        products: productSlice,
        productDetail: productDetailSlice,
        cart: cartSlice,
        wishlist: wishlistSlice
    }
})

export default store;