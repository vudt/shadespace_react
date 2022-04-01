
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../models/cart";
import CartService from "../services/cart";

const cart_data = CartService.initCart()
const initialState = {data: cart_data}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('addToCart')
      const cartStorage = CartService.initCart()
      const cartModel = new Cart(cartStorage)
      state.data = cartModel.addToCart(action.payload.item, action.payload.quantity)
    },
    removeCartItem: (state, action) => {
      console.log('removeCartItem')
      const cartStorage = CartService.initCart()
      const cartModel = new Cart(cartStorage)
      state.data = cartModel.removeItem(action.payload.id)
    },
    emptyCart: (state) => {
      console.log('emptyCart')
      state.data = Cart.initializeData()
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, removeCartItem, emptyCart } = cartSlice.actions

export default cartSlice.reducer