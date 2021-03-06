import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { removeCartItem } from "../../redux/cartSlice";
import Modal from 'react-modal';
import WrapSection from "../wrap-section";
import LoginForm from "../forms/login-form";
import SignupForm from "../forms/signup-form";
import { clearError } from "../../redux/authSlice";
import { CartData } from "../../interfaces/cart";
import { useRouter } from "next/router";

const customStyles = {
  content: {
    width: '75%',
    top: '38%',
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
  const {errorMessage, isLogged} = useAppSelector(state => state.auth)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showModalLogin, setShowModalLogin] = useState<boolean>(false)
  const [showModalSignup, setShowModalSignup] = useState<boolean>(false)
  
  const RenderCart = () => {
    const element = props.cart.items.map((item, key) => (
      <div key={item.id} className="item-col-2 item-grid cart-item">
        <a className="full-img"><img src={item.thumbnail} /></a>
        <div className="item-content">
          <span>{item.name}</span>
          <button className="remove-swatch-btn" onClick={() => dispatch(removeCartItem({id: item.id}))}>Remove</button>
        </div>
      </div>
    ))

    return <>{element}</>
  }

  const RenderButton = () => {
    return (
      <>
        <div className="clearfix"></div>
        <div className="form">
          <a onClick={() => beforeSendSwatches()} className="button display-block send-watch">Send swatches</a>
        </div>
      </>
    )
  }

  const beforeSendSwatches = () => {
    if (errorMessage) {
      dispatch(clearError())
    }
    const accessToken = sessionStorage.getItem('token')
    if (accessToken && isLogged) {
      router.push(`/checkout`)
    } else {
      setShowModalLogin(true)
    }
  }

  const closeModalLogin = () => {
    dispatch(clearError())
    setShowModalLogin(false);
    setShowModalSignup(false);
  }

  const closeModalSignup = () => {
    dispatch(clearError())
    setShowModalSignup(false);
    setShowModalLogin(false);
  }

  return (
    <WrapSection>
      { props.cart.items.length > 0 ? (
        <>
          <RenderCart />
          <RenderButton />
        </>
      ) : (
        <p>There is no item in cart.</p>
      )}

      <Modal
        isOpen={showModalLogin}
        onAfterOpen={() => setShowModalLogin(true)}
        onRequestClose={closeModalLogin}
        style={customStyles}
      >
        <h3>Login</h3>
        <LoginForm setShowModalLogin={setShowModalLogin} setShowModalSignup={setShowModalSignup} />
      </Modal>

      <Modal
        isOpen={showModalSignup}
        onAfterOpen={() => setShowModalSignup(true)}
        onRequestClose={closeModalSignup}
        style={customStyles}
      >
        <h3>Signup</h3>
        <SignupForm setShowModalLogin={setShowModalLogin} setShowModalSignup={setShowModalSignup} />
      </Modal>
    </WrapSection>
  )
}

export default LoopCartItem