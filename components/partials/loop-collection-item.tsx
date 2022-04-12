import React from "react";
import { ICollectionItem } from "../../interfaces/page";

interface CollectionItemProps {
  dataCollection: ICollectionItem[]
}

const LoopCollectionItem = ({dataCollection}: CollectionItemProps) => {

  const CollectionItem = ({item}: {item: ICollectionItem}) => {
    return (
      <div className="cat-collection-item">
        <a href={item.link} target="_blank" rel="noreferrer">
          <img src={item.img} />
        </a>
        <h4>{item.name}</h4>
        { item.description &&
          <div className="item-desc" dangerouslySetInnerHTML={{__html: item.description}}></div>
        }
        <div className="clearfix">
          {item.price_from && 
            <div className="price" dangerouslySetInnerHTML={{__html: `Price from ${item.price_from}`}}></div>
          }
          <a className="web-link" href={item.link} target="_blank" rel="noreferrer">Full Site &gt;&gt;</a>
        </div>
      </div>
    )
  }

  return (
    <div className="content-page">
      <div className="container">
        {dataCollection.map((item, index) => <CollectionItem key={index} item={item}  />)}
      </div>
    </div>
  )
}

export default LoopCollectionItem