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

export const storeCartData = (cart: CartData) : void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

export const prepareCartItem = (item: SampleItem, quantity: number): CartItem => {
  return {
    id: item.post_id,
    price: item.price,
    quantity: quantity,
    name: item.swatch_name,
    thumbnail: item.thumb
  }
}

export const addToCart = (item: SampleItem, quantity: number) : CartData => {
  const cart: CartData = initCart()
  if (cart.items.length == 0) {
    const cart_item = prepareCartItem(item, quantity)
    cart.items.push(cart_item)
    storeCartData(cart)
  } else if (cart.items.find(cart_item => cart_item.id === item.post_id)){
    const index = cart.items.findIndex(cart_item => cart_item.id === item.post_id)
    cart.items[index].quantity = cart.items[index].quantity + quantity
    storeCartData(cart)
  } else {
    const cart_item = prepareCartItem(item, quantity)
    cart.items.push(cart_item)
    storeCartData(cart)
  } 
  return cart
}

export const removeCartItem = (index: number) : CartData => {
  const cart: CartData = initCart()
  cart.items.splice(index, 1)
  storeCartData(cart)
  return cart
}

