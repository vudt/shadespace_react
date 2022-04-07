import React from "react";
import { MeasurementResponse, IMeasureMent } from "../../../interfaces/page";

const MeasurePanel = ({data, index}: {data: IMeasureMent, index: number}) => {
  
  const PanelHeading = ({index, name} : {index: number, name: string}) => {
    return (
      <div className="panel-heading">
        <h4 className="panel-title">
          <span className="step">{index + 1}</span>
          <span>{name}</span>
        </h4>
      </div>
    )
  }

  const Item = ({index, data}: {index: number, data: MeasurementResponse}) => {
    return (
      <div key={index} className="item-col-2 item-grid">
        <a target="_blank" href={data.pdf} className="full-img" dangerouslySetInnerHTML={{__html: data.thumb || ''}}>    
        </a>
      </div>
    )
  }

  return (
    <div className="clearfix grid-border-inner" key={index}>
      <PanelHeading index={index} name={data.term.name}   />
      <div className="clearfix">
        {data.measurement.map((item, index) => (
           <Item key={index} index={index}  data={item} />)
        )} 
      </div>
    </div>
  )
}

export default MeasurePanel