export interface Order {
  id: number,
  order_number: string,
  created_at: string,
  status: string,
  currency: string,
  total: string,
  subtotal: string,
  total_line_items_quantity: number,
  total_shipping: string,
  shipping_methods: string,
  note: string,
  payment_details: {
    method_id: string,
    method_title: string,
    paid: boolean
  }
  billing_address: BillingInfo
  line_items: LineItem[]
}

export interface BillingInfo {
  first_name:string,
  last_name:string,
  company?:string,
  address_1?:string,
  address_2?:string,
  city?:string,
  state?:string,
  postcode?:string,
  country?:string,
  email?:string,
  phone?:string
}

export interface LineItem {
  id: number,
  subtotal: string,
  subtotal_tax: string,
  total: string,
  total_tax: string,
  price: string,
  quantity: number | 1,
  name: string
  sku?: string
}

export interface ParamLineItem{
  product_id: number,
  quantity: number
}

export interface ParamsOrder {
  customer_id: number,
  payment_method: string,
  payment_method_title: string,
  set_paid: boolean,
  billing_address: BillingInfo,
  shipping_address: BillingInfo,
  line_items: ParamLineItem[]
}