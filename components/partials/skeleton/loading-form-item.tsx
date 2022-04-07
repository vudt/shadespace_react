import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface PropTypes {
  style_label?: any,
  style_control?: any
}

const LoadingFormItem = ({style_label, style_control} : PropTypes) => {
  return (
    <>
      <Skeleton style={style_label} /> 
      <Skeleton style={style_control} /> 
    </>
  )
}

LoadingFormItem.defaultProps = {
  style_label: {height: '15px', marginBottom: '0.4rem', width: '25%'},
  style_control: {height: '35px', marginBottom: '0.6rem'}
}

export default LoadingFormItem