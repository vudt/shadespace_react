import React from "react";

const PageBody = ({content}: {content: string}) => {
  if (!content) return null
  return (
    <div className="content-page 11">
      <div className="container" dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  )
}

export default PageBody