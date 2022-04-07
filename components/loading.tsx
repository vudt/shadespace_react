import React from "react";
import LoadingSpin from "react-loading-spin";

const Loading = () => {
  return (
    <section>
      <div className="container page-desc" style={{textAlign: "center"}}>
        <LoadingSpin width="4px" size="48px" primaryColor="#544F4E" />
      </div>
    </section>
  )
}

export default Loading