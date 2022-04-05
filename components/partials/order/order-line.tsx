import React from "react";
import { Order as IOrder } from "../../../interfaces/order";
import { Order } from "../../../models/order";
import moment from "moment";

const OrderLine = ({order}: {order: IOrder}) => {
  const orderModel = new Order(order)
  return (
    <div className="order_line_item border_b">
      <div className="line_column">{order.id}</div>
      <div className="line_column">{order.status}</div>
      <div className="line_column"><span className="circle_item">{orderModel.countSwatches()}</span></div>
      <div className="line_column"><span className="circle_item">{orderModel.countProduct()}</span></div>
      <div className="line_column price">S${order.total}</div>
      <div className="line_column">{ moment(order.created_at).format('MM/DD/YYYY') }</div>
    </div>
  )
}

export default OrderLine