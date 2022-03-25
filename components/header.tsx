import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { toggleNav } from "../redux/navigationSlice";

const Header = () => {
  const dispatch = useAppDispatch()
  const { active } = useAppSelector(state => state.navigation)
  const { cart } = useAppSelector(state => state)

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
          <a href="#!/cart" className="cart-icon cart-btn ui-link">
            <i className="fa fa-shopping-cart" />
            <span className="count">{cart.data.items.length}</span>
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