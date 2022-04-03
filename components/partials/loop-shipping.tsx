import React from "react";
import { IContentShipping } from "../../interfaces/page";

const LoopShipping = ({data}: {data: IContentShipping[]}) => {

  const ShippingInfo = ({post, index} : {post: IContentShipping, index: number}) => {
    return (
      <div key={index} className="wrap-generic">
        <div style={{lineHeight: 'initial'}} dangerouslySetInnerHTML={{__html: post.img!}}></div>
        <div className="product-info">
          <h3>{post.item?.title}</h3>
          <div className="description" dangerouslySetInnerHTML={{__html: post.item?.description!}}></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="content-page">
      <div className="container">
      {data.map((shipping_info, index) => {
        if (shipping_info.img && shipping_info.item) {
          return <ShippingInfo key={index} post={shipping_info} index={index} />
        }
      })}
      </div>
    </div>
  )
}

export default LoopShipping