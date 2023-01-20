import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

const cartSlice = createSlice<{
    products: Product[];
    quantity: number;
    totalPrice: number;
}, SliceCaseReducers<{
    products: Product[];
    quantity: number;
    totalPrice: number;
}>, string>({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        totalPrice: 0
    },
    reducers: {
        addProduct: (prevState, action) => {
            prevState.quantity++;
            prevState.products.push(action.payload.product);
            prevState.totalPrice += action.payload.price;
        }
    }
});

export const { addProduct } = cartSlice.actions;

export type RootState = ReturnType<{cart: typeof cartSlice.getInitialState}>; 

export default cartSlice.reducer;