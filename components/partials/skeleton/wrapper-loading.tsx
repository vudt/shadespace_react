import React from "react";

interface PropTypes {
  children: React.ReactNode
}

const WrapperLoading = (props: PropTypes) => {
  return (
    <div className="section">
      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default WrapperLoading

