import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Cart } from "../../models/cart";
import { useToasts } from "react-toast-notifications";
import { addToCart, removeCartItem } from "../../redux/cartSlice";
import { MaterialInfo, SampleItem } from "../../interfaces/material";

interface MaterialProps {
  info: MaterialInfo,
  swatches: SampleItem[]
}

const LoopMaterial = (props: {data: MaterialProps[]}) => {
  const dispatch = useAppDispatch()
  const {addToast, removeAllToasts} = useToasts()
  const { cart } = useAppSelector(state => state)
  const cartModel = new Cart(cart.data)

  const handleAddToCart = (swatch: SampleItem) => {
    removeAllToasts();
    if (cart.data.items.length >= 3) {
      addToast("You can't add more than 3 items each time.", { appearance: 'error', autoDismiss: true })
      return false
    }
    dispatch(addToCart({item: swatch, quantity: 1}))
  }

  const SwatchItem = (swatch: SampleItem) => {
    let cart_item = cartModel.getCartItemById(swatch.post_id)
    return (
      <div className="item-col-2 item-grid material-item">
        <a className="full-img"><img src={swatch.thumb} /></a>
        <div className="item-content">
          <span>{swatch.swatch_name}</span>
          { cart_item ? (
            <button className="remove-swatch-btn" onClick={() => dispatch(removeCartItem({id: swatch.post_id}))} >Remove</button>
          ) : (
            <button className="add-swatch-btn" onClick={() => handleAddToCart(swatch)} >Order swatch</button>
          ) }
        </div>
      </div>
    )
  }

  const LoopSwatch = ({swatches}: {swatches: SampleItem[]}) => {
    return (
      <div className="grid-border material-container">
        <div className="clearfix grid-border-inner">
        { swatches.map((item, index) => <SwatchItem key={index} {...item} />) }
        </div>
      </div>
    )
  }

  return (
    <div className="content-page">
      <div className="container">
      { props.data.map((item, index) => {
        if (item.swatches.length > 0) {
          return (
            <React.Fragment key={index}>
              <h3>{item.info.collection_name}</h3>
              <h4>PRICE GROUP: {item.info.price_group}$</h4>
              <LoopSwatch swatches={item.swatches} />
            </React.Fragment>
          )
        }  
      })}
      </div>
    </div>
  )
}

export default LoopMaterial