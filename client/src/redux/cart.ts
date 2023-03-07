import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

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
                    ...action.payload,
                    quantity: 1,
                    totalPrice: newItem.price
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
            prevState.totalAmount = prevState.products.reduce(
                (acc, curr) => acc + curr.price * curr.quantity, 0
            );

            console.log(prevState.totalQuantity);
        }
    },
    
});

export const cartActions = cartSlice.actions;

// export type RootState = ReturnType<{cart: typeof cartSlice.getInitialState}>; 

export default cartSlice.reducer;