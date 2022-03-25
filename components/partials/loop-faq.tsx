import React from "react";
import { IFaq, FaqItem } from "../../interfaces/page";

const LoopFaq = (props: {data: IFaq[]}) => {

  const loopPost = (posts: FaqItem[]) => {
    return posts.map((item, index) => (
      <div key={index}>
        <div className="panel-heading">
          <h4 className="panel-title">
            <span className="step">{index + 1}</span>
            <span>{item.post_title}</span>
          </h4>
        </div>
        <div className="panel-body" dangerouslySetInnerHTML={{__html: item.post_content}}></div>
      </div>
    ))
  }

  return (
    <div className="content-page ng-scope">
      <div className="container">
        { props.data.map((item, index) => (
          <div className="faq-panel">
            <h3>{item.term.name}</h3>
            { loopPost(item.posts) }
          </div>
        )) }
      </div>
    </div>

  )
}

export default LoopFaq;