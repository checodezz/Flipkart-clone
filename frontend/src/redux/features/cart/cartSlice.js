import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    try {
        const response = await axios.get(`${url}/cart`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || "Failed to fetch cart data");
    }
});

export const updateCart = createAsyncThunk("cart/updateCart", async ({ productId, action }) => {
    try {
        const response = await axios.post(`${url}/cart/update`, { productId, action });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
});

export const removeCart = createAsyncThunk("cart/removeCart", async (productId) => {
    try {
        const response = await axios.post(`${url}/cart/remove`, { productId });
        return { productId };
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || "Failed to remove product from cart");
    }
});

export const clearCartFromBackend = createAsyncThunk("cart/clearCartFromBackend", async () => {
    try {
        const response = await axios.delete(`${url}/cart/clear`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || "Failed to clear the cart");
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        totalCost: null,
        loading: false,
        error: null
    },
    reducers: {
        optimisticUpdate(state, action) {
            const { productId, actionType } = action.payload;
            const cartItem = state.cartItems.find((item) => item.product._id === productId);

            if (actionType === 'plus') {
                if (cartItem) {
                    cartItem.quantity += 1;
                } else {
                    state.cartItems.push({
                        product: { _id: productId },
                        quantity: 1,
                    });
                }
            } else if (actionType === 'minus' && cartItem && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else if (actionType === 'remove') {
                state.cartItems = state.cartItems.filter(item => item.product._id !== productId);
            }
        },
        revertUpdate(state, action) {
            const { previousState } = action.payload;
            state.cartItems = previousState.cartItems;
        },
        setTotalCost(state, action) {
            console.log(action.payload)
            state.totalCost = action.payload
        },
        clearCart(state) {
            state.cartItems = [];
            state.totalCost = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false;
                const { newCartItem, cartItem } = action.payload;
                if (newCartItem) {
                    state.cartItems.push(newCartItem);
                } else if (cartItem) {
                    const index = state.cartItems.findIndex((item) => item.product._id === cartItem.product._id);
                    if (index !== -1) {
                        state.cartItems[index] = cartItem;
                    }
                }
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(removeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCart.fulfilled, (state, action) => {
                state.loading = false;
                const { productId } = action.payload;
                state.cartItems = state.cartItems.filter((item) => item.product._id !== productId);
            })
            .addCase(removeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(clearCartFromBackend.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCartFromBackend.fulfilled, (state) => {
                state.loading = false;
                state.cartItems = [];
                state.totalCost = 0;
            })
            .addCase(clearCartFromBackend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { optimisticUpdate, revertUpdate, setTotalCost, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
