import React from "react";
import { Measurement } from "../../models/measurement";
import { IMeasureMent } from "../../interfaces/page";

const GridMeasureInstall = (props: {index: number, data: IMeasureMent}) => {
  const renderItem = () => {
    return props.data.measurement.map((item, key) => (
      // const msmObj = new Measurement(item)
      <div key={key} className="item-col-2 item-grid">
        <a target="_blank" href={item.pdf} className="full-img" dangerouslySetInnerHTML={{__html: item.thumb || ''}}>    
        </a>
      </div>
    ))
  }

  return (
    <div className="clearfix grid-border-inner" key={props.index}>
      <div className="panel-heading">
        <h4 className="panel-title">
          <span className="step">{props.index + 1}</span>
          <span>{props.data.term.name}</span>
        </h4>
      </div>
      <div className="clearfix">
        { renderItem() }
      </div>
    </div>
  )
}

export default GridMeasureInstall