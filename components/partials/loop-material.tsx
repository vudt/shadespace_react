import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addToCart, removeCartItem } from "../../redux/cartSlice";
import { MaterialInfo, SampleItem } from "../../interfaces/material";

interface MaterialProps {
  info: MaterialInfo,
  swatches: SampleItem[]
}

const LoopMaterial = (props: {data: MaterialProps[]}) => {
  const dispatch = useAppDispatch()
  const { cart } = useAppSelector(state => state)
  console.log(cart)

  const renderSwatches = (swatches: SampleItem[]) => {
    return swatches.map((swatch, key) => {
      let cart_item = getCartItemById(swatch.post_id)
      return (
        <div key={key} className="item-col-2 item-grid material-item">
          <a className="full-img"><img src={swatch.thumb} /></a>
          <div className="item-content">
            <span>{swatch.swatch_name}</span>
            { cart_item ? (
              <button className="add-swatch-btn" onClick={() => dispatch(addToCart({item: swatch, quantity: 1}))} >Remove swatch</button>
            ) : (
              <button className="add-swatch-btn" onClick={() => dispatch(addToCart({item: swatch, quantity: 1}))} >Order swatch</button>
            ) }
            
          </div>
        </div>
      )
    })
  }

  const getCartItemById = (id: number) => {
    if (cart.data.items.length === 0) return null
    let result = cart.data.items.find((cart_item) => cart_item.id === id)
    return result
  }

  console.log(props.data)
  return (
    <div className="content-page">
      <div className="container">
      { props.data.map((item, index) => (
        <React.Fragment key={index}>
          <h3>{item.info.collection_name}</h3>
          <h4>PRICE GROUP: {item.info.price_group}$</h4>
          <div className="grid-border material-container">
            <div className="clearfix grid-border-inner">
              { renderSwatches(item.swatches) }
            {/* {item.swatches.map((swatch, key) => (
              <div key={key} className="item-col-2 item-grid material-item">
                <a className="full-img"><img src={swatch.thumb} /></a>
                <div className="item-content">
                  <span>{swatch.swatch_name}</span>
                  <button className="add-swatch-btn" onClick={() => dispatch(addToCart({item: swatch, quantity: 1}))} >Order swatch</button>
                </div>
              </div>
            ))} */}
            </div>
          </div>
        </React.Fragment>
      )) }
      </div>
    </div>
  )
}

export default LoopMaterial