import React from "react";

interface PropTypes {
  children: React.ReactNode
}

const WrapSection = (props: PropTypes) => {
  return (
    <div className="section">
      <div className="container grid-border">
        <div className="clearfix grid-border-inner">{props.children}</div>
      </div>
    </div>
  )
}

export default WrapSection