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
        return { productId };  // Return the productId for removal in the reducer
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || "Failed to remove product from cart");
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        loading: false,
        error: null
    },
    reducers: {
        // Optimistically update the cart when the user triggers an action
        optimisticUpdate(state, action) {
            const { productId, actionType } = action.payload;
            const cartItem = state.cartItems.find((item) => item.product._id === productId);

            if (actionType === 'plus') {
                if (cartItem) {
                    cartItem.quantity += 1;
                } else {
                    state.cartItems.push({
                        product: { _id: productId }, // Temporary product data, backend will send full details
                        quantity: 1,
                    });
                }
            } else if (actionType === 'minus' && cartItem && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else if (actionType === 'remove') {
                // Remove the item from the cartItems array
                state.cartItems = state.cartItems.filter(item => item.product._id !== productId);
            }
        },
        revertUpdate(state, action) {
            // If the API call fails, revert the cart item to its previous state
            const { previousState } = action.payload;
            state.cartItems = previousState.cartItems;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;  // Populate the cartItems array with data from the backend
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

            // Handle removeCart action
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
            });
    }
});

export const { optimisticUpdate, revertUpdate } = cartSlice.actions;
export default cartSlice.reducer;
