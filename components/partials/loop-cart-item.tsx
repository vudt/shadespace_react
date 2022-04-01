import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { removeCartItem } from "../../redux/cartSlice";
import Modal from 'react-modal';
import LoginForm from "../forms/login-form";
import { clearError } from "../../redux/authSlice";
import { CartData } from "../../interfaces/cart";
import { useRouter } from "next/router";

const customStyles = {
  content: {
    width: '75%',
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '15px'
  },
};

Modal.setAppElement('#__next');

const LoopCartItem = (props: {cart: CartData}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState<boolean>(false)
  
  const renderCart = () => {
    return props.cart.items.map((item, key) => (
      <div key={item.id} className="item-col-2 item-grid cart-item">
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

  const renderButton = () => {
    return (
      <>
        <div className="clearfix"></div>
        <div className="form">
          <a onClick={() => beforeSendSwatches()} className="button display-block send-watch">
            Send swatches
          </a>
        </div>
      </>
    )
  }

  const beforeSendSwatches = () => {
    const accessToken = sessionStorage.getItem('token')
    if (!accessToken) {
      setShowModal(true)
    } else {
      router.push('/checkout')
    }
  }

  function afterOpenModal() {
    setShowModal(true);
  }

  function closeModal() {
    dispatch(clearError())
    setShowModal(false);
  }

  return (
    <div className="section">
      <div className="container">
        <div className="grid-border material-container">
          <div className="clearfix grid-border-inner">
            <div className="clearfix">
              { props.cart.items.length > 0 ? (
                [renderCart(), renderButton()]
               ) : (
                <p>There is no item in cart.</p>
              )}
            </div>
          </div>
        </div>
        
        <Modal
          isOpen={showModal}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Login"
        >
          <h3>Login</h3>
          <LoginForm />
        </Modal>

      </div>
    </div>
  )
}

export default LoopCartItem