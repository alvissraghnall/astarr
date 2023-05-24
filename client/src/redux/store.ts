import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { RootState } from "./cart";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
/**
 * 
 */