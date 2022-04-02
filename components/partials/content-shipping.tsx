import React from "react";
import { IContentShipping } from "../../interfaces/page";

const ContentShipping = ({data}: {data: IContentShipping[]}) => {

  const renderElement = () => {
    return data.map((data_item, index) => {
      if (data_item.img && data_item.item) {
        return (
          <div key={index} className="wrap-generic">
            <div style={{lineHeight: 'initial'}} dangerouslySetInnerHTML={{__html: data_item.img}}></div>
            <div className="product-info">
              <h3>{data_item.item.title}</h3>
              <div className="description" dangerouslySetInnerHTML={{__html: data_item.item.description}}></div>
            </div>
          </div>
        )
      }
    })
  }
  
  return (
    <div className="content-page">
      <div className="container">{ renderElement() }</div>
    </div>
  )
}

export default ContentShipping