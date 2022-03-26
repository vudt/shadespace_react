import React, { useEffect, useState } from "react";
import { Cart } from "../models/cart";
import CartService from "../services/cart";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { toggleNav } from "../redux/navigationSlice";

const Header = () => {
  const dispatch = useAppDispatch()
  const { cart } = useAppSelector(state => state)
  const [totalQuantity, setTotalQuantity] = useState<number>(0)

  useEffect(()=> {
    // let cartStorage = CartService.initCart()
    const cartModel = new Cart(cart.data)
    let total_qty = cartModel.totalQuantity()
    setTotalQuantity(total_qty)
  },[cart])

  const toggleMenu = () => {
    dispatch(toggleNav())
  }

  return (
    <header className="header">
      <a className="logo" href="/mobile">
        <img src="/img/logo.png" />
      </a>
      <div className="header-right inline-block-wrap">
        <div className="action-btns inline-block-item">
          <a href="#" className="cart-icon cart-btn ui-link">
            <i className="fa fa-shopping-cart" />
            { totalQuantity &&
              <span className="count">{totalQuantity}</span>
            }
          </a>
          <a id="showRightPush" className="menu ui-link" onClick={toggleMenu}>
            <i className="fa fa-bars" />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header;