import React, { useState } from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import WrapSection from "../wrap-section";
import { GalleryItem } from "../../interfaces/page";

interface IConfigLightbox {
  photoIndex: number,
  isOpen: boolean
}

const GridGalleries = ({data}: {data: GalleryItem[]}) => {
  const [configLightbox, setConfigLightbox] = useState<IConfigLightbox>({photoIndex: 0, isOpen: false})
  const nextIndex: any = (configLightbox.photoIndex + 1) % data.length
  const prevIndex: any = (configLightbox.photoIndex + data.length -1) % data.length

  const LoopGallery = () => {
    const element = data.map((item, index) => (
      <div key={index} onClick={() => setConfigLightbox({isOpen: true, photoIndex: index})} className="item-col-2 item-grid square-bg" style={{ backgroundImage: `url(${item.url})` }}>
         <img src={item.url} style={{display: 'none'}} />
      </div>
    ))
    return <React.Fragment>{element}</React.Fragment>
  }

  return (
    <WrapSection>
      <LoopGallery />
      { configLightbox.isOpen && 
        <Lightbox 
          mainSrc={data[configLightbox.photoIndex].url}
          nextSrc={data[nextIndex].url}
          prevSrc={data[prevIndex].url}
          onMoveNextRequest={() => {
            setConfigLightbox({
              isOpen: true, 
              photoIndex: (configLightbox.photoIndex + 1) % data.length})
            }}
          onMovePrevRequest={() => {
            setConfigLightbox({
              isOpen: true,
              photoIndex: (configLightbox.photoIndex + data.length -1) % data.length
            })
          }}
          onCloseRequest={() => setConfigLightbox({photoIndex: 0, isOpen: false})}
        />
      }
    </WrapSection>
  )
}

export default GridGalleries