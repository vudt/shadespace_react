export interface CartData {
  items: CartItem[],
  payment_method: number | null,
  delivery_address: string | null,
  price: {
    original_price: number,
    final_price: number,
    delivery_fee?: number,
    discount?: number
  }
}

export interface CartItem {
  id: number,
  price: number,
  quantity: number,
  name: string,
  thumbnail: string
}