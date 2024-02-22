import {toast} from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    totalItems:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): [],
    total:localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")):0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems:(state,value)=>{
            state.totalItems = value.payload
        },
        // add function for - Add to cart
    
        // removeFromCart
        // resetCart
        resetCart(state){
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems"); 
        }

    }
})


export const {setTotalItems,resetCart} = cartSlice.actions;
export default cartSlice.reducer;
