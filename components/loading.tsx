import React from "react";
import LoadingSpin from "react-loading-spin";

const Loading = () => {
  return (
    <section>
      <div className="container page-desc" style={{textAlign: "center"}}>
        <LoadingSpin />
      </div>
    </section>
    // <div className="loading" >
    //   <img src="https://shadespace.com.sg/mobile/sources/img/ajax-loader3.gif" />
    // </div>
  )
}

export default Loading