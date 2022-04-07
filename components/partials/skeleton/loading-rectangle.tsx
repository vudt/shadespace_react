import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingRectangle = ({count}: {count: number}) => {
  
  const styleDefault: React.CSSProperties = {
    height: '40px', 
    width: '100%',
    marginBottom: '0.6rem'
  }

  return (
    <div className="section">
      <div className="container">
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} style={styleDefault} />
      ))}
      </div>
    </div>
  )
}

export default LoadingRectangle