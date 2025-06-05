

import React from "react";
import Slider from "react-slick";
import img1 from "../../images/1.webp";
import img2 from "../../images/2.webp";
import img3 from "../../images/3.webp";
import img4 from "../../images/4.webp";
import img5 from "../../images/5.webp";
import img6 from "../../images/6.webp";
import { useState } from "react";
import style from './Header.module.css'


export default function Header() {
  const [activeIndex, setActiveIndex] = useState(0);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    customPaging: (i) => (
      <div
        style={{
          marginTop: "30px",
          width: "20px",
          height: "20px",
          backgroundColor: i === activeIndex ? "#DB4444" : "transparent", // 🔴 Active is Red
          border: "1px solid #DB4444",
          borderRadius: "50%",
          margin: "0 5px",
          transition: "all 1s ease-in-out",
        }}
      ></div>
    ),
  };

  return (
    <>
      <div className={`${style.myMt} slider-container container mb-5 pt-0`}>
        <Slider {...settings}>
          <div>
            <img src={img1} className="w-100" alt="" style={{ height: 400 }} />
          </div>
          <div>
            <img src={img2} className="w-100" alt="" style={{ height: 400 }} />
          </div>
          <div>
            <img src={img3} className="w-100" alt="" style={{ height: 400 }} />
          </div>
          <div>
            <img src={img4} className="w-100" alt="" style={{ height: 400 }} />
          </div>
          <div>
            <img src={img5} className="w-100" alt="" style={{ height: 400 }} />
          </div>
          <div>
            <img src={img6} className="w-100" alt="" style={{ height: 400 }} />
          </div>
        </Slider>
      </div>
    </>
  );
}
