import React from "react";
import Link from "next/link";
import WrapSection from "../wrap-section";
import { GridItem } from "../../interfaces/page";

const GridBorder = ({listItems}: {listItems: GridItem[]}) => {

  const LoopItem = () => {
    const element = listItems.map((item, index) => (
      <div key={index} className="item-col-2 item-grid square-bg" style={{ backgroundImage: `url(${item.img})` }}>
        <Link href={item.link!}>
          <a>
            {item.name && (
              <span className="item-name">{item.name.replace(/#038;/, "")}</span>
            )}
          </a>  
        </Link>
      </div>
    ))
    return <>{element}</>
  }

  return (
    <WrapSection>
      <LoopItem />
    </WrapSection>
  )
}

export default GridBorder