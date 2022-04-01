import { Order as OrderData } from "../interfaces/order";

interface IOrder {
  data: OrderData,
  countProduct(): number,
  countSwatches(): number,
}

export class Order implements IOrder {

  public data: OrderData

  constructor(order: OrderData) {
    this.data = order
  }

  countProduct(): number {
    const count = this.data.line_items.reduce((sum, item) => {
      let total = sum
      if (item.price !== '0.00') {
        total = sum + item.quantity
      }
      return total
    }, 0)
    return count
  }

  countSwatches(): number {
    const count = this.data.line_items.reduce((sum, item) => {
      let total = sum
      if (item.price == '0.00') {
        total = sum + item.quantity
      }
      return total
    }, 0)
    return count
  }
}