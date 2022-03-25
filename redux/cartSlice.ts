
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartService from "../services/cart";
// import { CartService } from "../services/cart";


const cart_data = CartService.initCart()
const initialState = {data: cart_data}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('addToCart')
      console.log(action)
      const cart = CartService.addToCart(action.payload.item, action.payload.quantity)
      console.log(cart)
      state.data = cart
    },
    removeCartItem: (state, action) => {
      console.log('removeCartItem')
    },
    emptyCart: (state, action) => {
      console.log('emptyCart')
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, removeCartItem, emptyCart } = cartSlice.actions

export default cartSlice.reducer