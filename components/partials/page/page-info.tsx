import React from "react";

const PageInfo = ({post_title, post_content}: {post_title: string, post_content: string}) => {
  return (
    <div className="container page-desc">
      <h1>{post_title}</h1>
      { post_content && 
          <div className="page-content" dangerouslySetInnerHTML={{__html: post_content}}></div>
      }
    </div>
  )
}

export default PageInfo