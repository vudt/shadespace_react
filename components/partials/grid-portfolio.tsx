import React from "react";
import Link from "next/link";
import { Portfolio } from "../../interfaces/page";

const GridPortfolio = (props: {data: Portfolio[]}) => {

  return (
    <div className="section">
      <div className="container grid-border">
        <div className="clearfix grid-border-inner">
          {
            props.data.map((item, index) => (
              <Link key={index} href={`/portfolio/${item.id}`}>
                <a className="item-col-2 item-grid"><img src={item.img} /></a>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default GridPortfolio