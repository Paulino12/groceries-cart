import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    amount: 0,
    isLoadingIngredients: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            const orderedGroceries = action.payload
            state.cartItems = Object.values(orderedGroceries)
            state.amount = state.cartItems.length
        },
        setAmount: (state, action) => {
            state.amount = action.payload
            state.amount = action.payload.length
        }
    },
})

export const { setCartItems } = cartSlice.actions

export default cartSlice.reducer