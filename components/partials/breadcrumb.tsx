import React, {Fragment} from "react";
import Link from "next/link";
import { BreadCrumbProps } from "../../interfaces/page";


const BreadCrumb = (props: BreadCrumbProps) => {
  const HOME_URL = 'http://localhost:3000'
  const renderBreadcumb = () => {
    return props.breadcrumb.map((item, index) => {
      if (item.link) {
        return <Link key={index} href={item.link}>
          {index < (props.breadcrumb.length -1)? (
            <a>{item.name} &gt;&gt; </a>
          ) : (
            <a>{item.name}</a>
          )}
        </Link>
      } else {
        return <span key={index}>{item.name}</span>
      }
    })
  }
  
  return (
    <div className="section">
      <div className="container breadcrumb">
        <Link href={HOME_URL}><a>Home  &gt;&gt; </a></Link>
        { renderBreadcumb() }
      </div>
    </div>
  )
}

export default BreadCrumb;