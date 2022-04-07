import React from "react";
import Link from "next/link";
import WrapSection from "./wrap-section";
import { Portfolio } from "../../interfaces/page";

const GridPortfolio = (props: {data: Portfolio[]}) => {

  return (
    <WrapSection>
      {props.data.map((item, index) => (
        <Link key={index} href={`/portfolio/${item.id}`}>
          <a className="item-col-2 item-grid"><img src={item.img} /></a>
        </Link>
      ))}
    </WrapSection>
  )
}

export default GridPortfolio