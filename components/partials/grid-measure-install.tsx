import React from "react";
import MeasurePanel from "./measure-install/measure-panel";
import { IMeasureMent } from "../../interfaces/page";

const GridMeasureInstall = ({data}: {data: IMeasureMent[]}) => {
  return (
    <div className="page-content">
      <div className="container grid-border">
        {data.map((item, index) => <MeasurePanel key={index} data={item} index={index} />)}
      </div>
    </div>
  )
}

export default GridMeasureInstall