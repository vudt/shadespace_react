import React from "react";
import OrderHeadColumn from "./order/order-head-column";
import OrderLine from "./order/order-line";
import { Order as IOrder } from "../../interfaces/order";

const LoopOrder = ({columns, orders}: {columns: string[], orders: IOrder[]}) => {
  return (
    <div className="search-result">
      <div className="wrap-result">
        <div className="order-body">
          <OrderHeadColumn data={columns} />
          { orders.map((item, index) => <OrderLine key={index} order={item} />) } 
        </div>
      </div>
    </div>
  )
}

export default LoopOrder