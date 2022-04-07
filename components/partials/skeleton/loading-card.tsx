import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingCard = () => {
  
  const styleDefault: React.CSSProperties = {
    height: '100%', 
    width: '100%',
    position: 'absolute', 
    left: '0', 
    top: '0', 
    zIndex: '9999'
  }

  return (
    <div className="item-col-2 item-grid">
      <img src="/img/thumbnail-default.jpg" />
      <Skeleton borderRadius="0" style={styleDefault} />
      {/* <Skeleton borderRadius="0" style={{height: '175px', width: '100%'}} /> */}
     </div>
  )
}

export default LoadingCard