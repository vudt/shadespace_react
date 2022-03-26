import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { removeCartItem } from "../../redux/cartSlice";
import { CartData } from "../../interfaces/cart";

const LoopCartItem = (props: {cart: CartData}) => {
  console.log(props.cart)
  const dispatch = useAppDispatch()
  const renderCart = () => {
    return props.cart.items.map((item, key) => (
      <div className="item-col-2 item-grid cart-item">
        <a className="full-img">
          <img src={item.thumbnail} />
        </a>
        <div className="item-content">
          <span>{item.name}</span>
          <button className="remove-swatch-btn" onClick={() => dispatch(removeCartItem({id: item.id}))}>Remove</button>
        </div>
      </div>
    ))
  }

  return (
    <div className="section">
      <div className="container">
        <div className="grid-border material-container">
          <div className="clearfix grid-border-inner">
            <div className="clearfix">
              
              {props.cart.items.length > 0 ? (
                renderCart()
              ) : (
                <p>There is no item in cart.</p>
              )}
   
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoopCartItem