import React from "react";
import WrapSection from "../../wrap-section";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingCard = ({count}: {count: number}) => {
  
  const styleDefault: React.CSSProperties = {
    height: '100%', 
    width: '100%',
    position: 'absolute', 
    left: '0', 
    top: '0', 
    zIndex: '9999'
  }

  return (
    <WrapSection>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="item-col-2 item-grid">
          <img src="/img/thumbnail-default.jpg" />
          <Skeleton borderRadius="0" style={styleDefault} />
        </div>
      ))}
    </WrapSection>
  )
}

export default LoadingCard