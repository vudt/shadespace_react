import React from "react";
import Link from "next/link";
import { GridItem } from "../../interfaces/page";

const GridBorder = ({listItems}: {listItems: GridItem[]}) => {

  const LoopItem = (item: GridItem) => {
    return (
      <div className="item-col-2 item-grid square-bg" style={{ backgroundImage: `url(${item.img})` }}>
        <Link href={item.link || ''}>
          {item.name ? (
            <a><span className="item-name">{item.name.replace(/#038;/, "")}</span></a>  
          ) : (
            <a></a>
          )}
        </Link>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container grid-border">
        <div className="clearfix grid-border-inner">
          { listItems.map((item, index) => <LoopItem key={index} {...item} />) }
        </div>
      </div>
    </div>
  )
}

export default GridBorder