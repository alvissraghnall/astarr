import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { Product } from "../models/product.model";
import store from "./store";

const cartSlice = createSlice<{
    products: (Product & { quantity: number, totalPrice: number })[];
    totalQuantity: number;
    totalAmount: number;
}, SliceCaseReducers<{
    products: (Product & { quantity: number, totalPrice: number })[];
    totalQuantity: number;
    totalAmount: number;
}>, string>({
    name: "cart",
    initialState: {
        products: [],
        totalQuantity: 0,
        totalAmount: 0
    },
    reducers: {
        
        addProduct: (prevState, action) => {
            const newItem = action.payload as Product;
            const existingItem = prevState.products.find(item => item.id === newItem.id);

            prevState.totalQuantity++;

            if(!existingItem) {
                prevState.products.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
            prevState.totalAmount = prevState.products.reduce(
                (acc, curr) => acc + curr.price * curr.quantity, 0
            );

            console.log(prevState.totalQuantity);
        },
        removeProduct: (prevState, action) => {
            const productItem = action.payload as Product;

            prevState.products = prevState.products.filter(item => item.id !== productItem.id);
            const finded = prevState.products.find(item => item.id === productItem.id);


            // localStorage.setItem("cart", JSON.stringify(state.cartItems))

        }
    },
    
});

export const cartActions = cartSlice.actions;

export type RootState = ReturnType<typeof store.getState>; 

export const selectGetCartTotalQuantity = (state: RootState) => state.cart.totalQuantity;
export const selectGetCartTotalAmount = (state: RootState) => state.cart.totalAmount;
export const selectGetCartProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;