import React from "react";
import Slider, { Settings } from 'react-slick'

const SliderBanner = () => {

  const defaultSettings: Settings = {
    dots: false,
    infinite: true,
    className: "slider-home",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }

  return (
    <Slider {...defaultSettings}>
        <a className="slide-item">
          <div className="slide-bg" style={{ backgroundImage: 'url("https://shop.shadespace.com.sg/mobile/sources/img/slide-1.jpg")'}}></div>
          <div className="slide-note">
            <h4>BRING YOUR STYLE TO HOME</h4>
            <div>
              <p>
                Your window. Your thoughts. Your style. <br />
                Express yourself &amp; customize the way you want it. <br />
              </p>
            </div>
          </div>
        </a>
        <a
          className="slide-item"
          style={{
            backgroundImage:
              'url("https://shop.shadespace.com.sg/mobile/sources/img/slide-2.jpg")'
          }}
        >
          <div className="slide-bg" style={{ backgroundImage: 'url("https://shop.shadespace.com.sg/mobile/sources/img/slide-2.jpg")'}}></div>
          <div className="slide-note">
            <h4>COLORS DELIVERED TO YOUR DOORSTEP</h4>
            <p>
              {`Want to view our range of swatches? <br />
              We've got you covered.`}
              <br />
            </p>
          </div>
        </a>
        <a
          href="#!/window-treatments/"
          className="slide-item"
          style={{
            backgroundImage:
              'url("https://shop.shadespace.com.sg/mobile/sources/img/slide-3.jpg")'
          }}
        >
          <div className="slide-bg" style={{ backgroundImage: 'url("https://shop.shadespace.com.sg/mobile/sources/img/slide-3.jpg")'}}></div>
          <div className="slide-note">
            <h4>SHADES FOR SALE</h4>
            <div>Look no further for our monthly update sales.</div>
          </div>
        </a>
    </Slider>
  )
}

export default SliderBanner;