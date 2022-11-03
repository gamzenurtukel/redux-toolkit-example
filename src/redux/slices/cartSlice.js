import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartList: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const product = state.cartList.find((item) => item.id === action.payload.id)
            if (product) {
                product.amount++;
            }
            else {
                state.cartList.push({ ...action.payload, amount: 1 })
            }
        },
        deleteCartItem: (state, action) => {
            const product = state.cartList.find((item) => item.id === action.payload.id)
            if (product && product.amount === 1) {
                state.cartList = state.cartList.filter((x) => x.id !== action.payload.id)
            } else if (product) {
                state.cartList.map((x) => {
                    if (x.id === action.payload.id) {
                        x.amount--;
                    }
                });
            }
        },
        clearAllCart: (state) => {
            state.cartList = []
        }
    },
});
export default cartSlice.reducer;
export const cartList = (state) => state.cart.cartList;
export const { addToCart, deleteCartItem, clearAllCart } = cartSlice.actions;