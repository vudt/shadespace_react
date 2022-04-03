import React from "react";
import { FaqItem } from "../../../interfaces/page";

const FaqPanel = ({headTitle, posts} : {headTitle: string, posts: FaqItem[]}) => {

  const Post = ({post, index}: {post: FaqItem, index: number}) => {
    return(
      <div key={index}>
        <div className="panel-heading">
            <h4 className="panel-title">
            <span className="step">{index + 1}</span>
            <span>{post.post_title}</span>
          </h4>
        </div>
        <div className="panel-body" dangerouslySetInnerHTML={{__html: post.post_content}}></div>
     </div>
    )
  }

  return (
    <div className="faq-panel">
      <h3>{headTitle}</h3>
      { posts.map((item, index) => (
        <Post key={index} post={item} index={index} />
      )) }
    </div>
  )
}

export default FaqPanel