import React, { useEffect, useState } from "react";
import Loading from "../loading";
import Link from "next/link";
import { useAppSelector } from '../../redux/store'


interface HomeData {
  id: number,
  name: string,
  template: string
}

const GridInner = () => {

  const { data } = useAppSelector(state => state.navigation)

  const DisplayItems = (arrData: HomeData[]) => {
    const result: any = arrData.map((item, index) => {
      let image_url: string = item.name.toLocaleLowerCase().replace(/\s/g, "") + '.jpg'
      let link_url: string = `/${item.template}/${item.id}`
      if (item.template == 'portfolio' || item.template == 'customer-service' ||item.template == 'free-swatches') {
        link_url = `/${item.template}`
      }
      return(
        <div key={index} className="item-col-2 item-grid square-bg" style={{ backgroundImage: 'url(/img/' + image_url + ')' }}>
          <Link href={link_url}>
            <a><span className="item-name">{item.name}</span></a>
          </Link>
        </div>
      )
    })
    return result
  }

  if (data.length == 0) {
    return <Loading />
  }

  return (
    <div className="container grid-border">
      <div className="clearfix grid-border-inner">
        { DisplayItems(data) }
      </div>
    </div>
  )
}

export default GridInner