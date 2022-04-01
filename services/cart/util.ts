import { CartData, CartItem } from "../../interfaces/cart"
import { SampleItem } from "../../interfaces/material"

export const initCart = () => {
  if (typeof window !== 'undefined') {
    const cartStorage = localStorage.getItem('cart')
    if (!cartStorage) {
      let cart = buildCartData()
      return cart
    } else {
      let cart: CartData = JSON.parse(cartStorage)
      return cart
    }
  } else {
    const cart = buildCartData()
    return cart      
  }
}

export const buildCartData = (): CartData => {
  return {
    items: [],
    payment_method: null,
    delivery_address: null,
    price: {
      original_price: 0,
      final_price: 0,
      delivery_fee: 0,
      discount: 0
    }
  }
}


