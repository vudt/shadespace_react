import { ParamsOrder, BillingInfo, ParamLineItem } from "../../interfaces/order";
import { UserInfo } from "../../interfaces/auth";
import { CartData } from "../../interfaces/cart";

export const prepareParam = (cart: CartData, userInfo: UserInfo, billingInfo: BillingInfo): ParamsOrder => {
  const line_items: ParamLineItem[] =  cart.items.map(item => ({product_id: item.id, quantity: item.quantity}))
  return {
    customer_id: userInfo.id!,
    payment_method: 'basc',
    payment_method_title: 'Direct Bank Transfer',
    set_paid: false,
    billing_address: {...billingInfo, email: userInfo.user_email!},
    shipping_address: billingInfo,
    line_items: line_items,
  }
}