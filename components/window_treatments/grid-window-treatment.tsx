import React, { useEffect, useState } from "react";
import Loading from "../loading";

const GridWindowTreatment = () => {

  useEffect(() => {
    // fetChAppi
    // https://shadespace.com.sg/api/app/get_term_window_treatments/
  }, [])

  return (
    <div className="section">
      <div className="container grid-border">
        <div ng-repeat='item in WindowTreatmentsItem.items' class="item-col-2 item-grid square-bg" style="background-image: url('{{item.img}}')">
          <a ng-href="#!/category-collection/0/{{item.id}}">
            <span className="item-name">{{item.name}}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default GridWindowTreatment;