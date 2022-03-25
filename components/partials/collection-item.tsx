import React from "react";
import { ICollectionItem } from "../../interfaces/page";

interface CollectionItemProps {
  dataCollection: ICollectionItem[]
}

const CollectionItem = (props: CollectionItemProps) => {
  if (props.dataCollection.length == 0) {
    return null
  }

  const render_collection_item = () => {
    return props.dataCollection.map((item, index) => (
      <div key={index} className="cat-collection-item">
        <a href={item.link} target="_blank">
          <img src={item.img} />
        </a>
        <h4 className="ng-binding">{item.name}</h4>
        { item.description &&
          <div className="item-desc" dangerouslySetInnerHTML={{__html: item.description}}></div>
        }
        <div className="clearfix">
          {item.price_from && 
            <div className="price" dangerouslySetInnerHTML={{__html: `Price from ${item.price_from}`}}></div>
          }
          <a className="web-link" href={item.link} target="_blank">Full Site &gt;&gt;</a>
        </div>
      </div>
    ))
  }

  return (
    <div className="content-page">
      <div className="container">
        { render_collection_item() }
      </div>
    </div>
  )
}

export default CollectionItem