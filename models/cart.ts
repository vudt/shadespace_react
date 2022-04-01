import { SampleItem } from "../interfaces/material";
import { CartData, CartItem } from "../interfaces/cart";

interface ICart {
  data: CartData,
  addToCart(item: SampleItem, quantity: number): CartData,
  removeItem(index: number): CartData,
  prepareCartItem(item: SampleItem, quantity: number): CartItem,
  totalQuantity(): number,
  getTotalPrice(): number,
  getCartItemById(id: number): CartItem | null,
  countItem(): number,
  storeCartData(cart: CartData): void,
}

export class Cart implements ICart {
  
  public data: CartData

  constructor(cart: CartData) {
    this.data = {
      items: cart.items,
      payment_method: cart.payment_method,
      delivery_address: cart.delivery_address,
      price: cart.price
    }
  }

  addToCart(item: SampleItem, quantity: number): CartData {
    if (this.data.items.length === 0) {
      const cart_item = this.prepareCartItem(item, quantity)
      this.data.items = [...this.data.items, cart_item]
    } else if (this.data.items.find(cart_item => cart_item.id === item.post_id)) {
      const index = this.data.items.findIndex(cart_item => cart_item.id === item.post_id)
      this.data.items[index].quantity = this.data.items[index].quantity + quantity
    } else {
      const cart_item = this.prepareCartItem(item, quantity)
      this.data.items = [...this.data.items, cart_item]
    }
    this.storeCartData(this.data)
    return this.data
  }

  removeItem(id: number): CartData {
    const result = this.data.items.filter(item => item.id !== id)
    this.data.items = [...result]
    this.storeCartData(this.data)
    return this.data
  }

  prepareCartItem(item: SampleItem, quantity: number): CartItem {
    return {
      id: item.post_id,
      name: item.swatch_name,
      quantity: quantity,
      price: item.price,
      thumbnail: item.thumb
    }
  }

  static initializeData(): CartData {
    const cart = {
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
    localStorage.setItem('cart', JSON.stringify(cart))
    return cart
  }

  totalQuantity(): number {
    let total = this.data.items.reduce((sum, item) => (sum + item.quantity), 0)
    return total
  }

  countItem(): number {
    return this.data.items.length
  }

  getCartItemById(id: number): CartItem | null {
    if (this.data.items.length === 0) return null
    let result = this.data.items.find(cart_item => cart_item.id === id)
    if (!result) return null
    return result
  }

  getTotalPrice(): number {
    let total = this.data.items.reduce((sum, item) => (sum + (item.quantity * item.price)), 0)
    return total
  }

  storeCartData(cart: CartData): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }
}
