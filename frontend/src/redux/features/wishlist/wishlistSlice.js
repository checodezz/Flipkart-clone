import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlistItems: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist(state, action) {
            console.log(action.payload)
            const itemExists = state.wishlistItems.find(
                (item) => item._id === action.payload._id
            );
            if (!itemExists) {
                state.wishlistItems.push(action.payload);
            }
        },
        removeFromWishlist(state, action) {
            console.log(action.payload);
            state.wishlistItems = state.wishlistItems.filter(
                (item) => item._id !== action.payload
            );
            console.log(state.wishlistItems)
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer
