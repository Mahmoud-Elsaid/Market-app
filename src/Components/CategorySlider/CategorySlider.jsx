


import { useQuery } from '@tanstack/react-query';
import style from './CategorySlider.module.css'
import axios from 'axios'
import React from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom';


export default function CategorySlider() {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5, // Default for large screens
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 1,
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 1500, // For screens <= 1024px
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 1300, // For screens <= 768px
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 992, // For screens <= 768px
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768, // For screens <= 768px
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480, // For screens <= 480px (Mobile)
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
      
    function getCategory(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }

    let {data , isLoading} = useQuery({ queryKey:['getCategoryItems'] ,queryFn :getCategory});
    console.log( 'data' , data?.data.data)

    return (
        <>
        {isLoading?<div className=' d-flex justify-content-center align-items-center'>
          <h1> category slider is loading</h1>
        </div>: <>
        {data?.data.data ?<div className="slider-container p-5 mx-5">
          <div className=' sectionHead'>
            <div className=' d-flex justify-content-start  my-4'>
              <div className='sideitem me-2'></div>
              <h5 className=' sideItemContent pt-2 text-main'>Categories</h5>
            </div>
              <h3 className=' mb-5'>Browse By Category</h3>
          </div>
          
                    <Slider className={`${style.slickDots} ${style.slider}`} {...settings}>
                        {data?.data.data.map((category , index)=>
                            <Link to={`/categoryProducts/${category._id}`} key={index} className={`${style.item} text-center p-5 d-flex flex-column `}> 
                                  <div className={`p-3   ${style.CategoryItem}`}     height={200}>
                                      <img src={category.image} className=' w-100' height={150} alt="" />
                                  </div>
                                  <h5 className=' fw-bold text-main'>{category.name}</h5>
                            </Link>)}
                    </Slider>
                </div>   :''}
                <div className=' container'>
                <hr className=' my-5'/>

                </div>
        </>
        }</>
            
   )
}
