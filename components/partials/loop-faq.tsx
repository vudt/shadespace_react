import React from "react";
import FaqPanel from "./faq/faq-panel";
import { IFaq } from "../../interfaces/page";

const LoopFaq = (props: {data: IFaq[]}) => {
  return (
    <div className="content-page">
      <div className="container">
        { props.data.map((item, index) => (
          <FaqPanel key={index} headTitle={item.term.name} posts={item.posts} />
        )) }
      </div>
    </div>
  )
}

export default LoopFaq;