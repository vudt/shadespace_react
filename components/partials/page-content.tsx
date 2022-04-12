import React from "react";
import { PageContentProps } from "../../interfaces/page";

const PageContent = (props: PageContentProps) => {
  if (!props.title && !props.description && !props.content) {
    return null
  }
  
  return(
    <div className="section">
      <div className="container page-desc">
        <h1>{props.title}</h1>
        { props.description && 
          <div className="page-content" dangerouslySetInnerHTML={{__html: props.description}}></div>
        }
      </div>
      { props.content && 
        <div className="content-page">
          <div className="container" dangerouslySetInnerHTML={{__html: props.content}}></div>
        </div>
      }
    </div>
  )
}

export default PageContent