import React from "react";
import { ICollectionItem } from "../../interfaces/page";
import Link from "next/link";
import { useRouter } from "next/router";

const LoopFilterCollection = (props: {data: ICollectionItem[]}) => {
  const router = useRouter()
  return (
    <div className="section">
      <div className="container">
        {props.data.map((item, index) => (
          <Link key={index} href={`/filter-material/?term_id=${router.query.id}&collection_id=${item.id}`}>
            <a className="mobile-btn">{item.name}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LoopFilterCollection