import React from "react";

const OrderHeadColumn = ({data}: {data: string[]}) => {
  const column = data.map((value,index) => <div key={index} className="line_column border_b">{value}</div>)
  return(
    <div className="order_line_item">{column}</div>
  )
}

export default OrderHeadColumn