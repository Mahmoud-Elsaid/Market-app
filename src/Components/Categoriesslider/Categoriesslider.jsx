
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import style from './Categoriesslider.module.css'

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default  function Categories() {
    const [categoryList, setCategoryList] = useState([])
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5, // Default number of slides
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: .00000000050,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200, // Devices with max-width 1200px
                settings: {
                    slidesToShow: 4, // Show 4 slides
                },
            },
            {
                breakpoint: 992, // Devices with max-width 992px
                settings: {
                    slidesToShow: 3, // Show 3 slides
                },
            },
            {
                breakpoint: 768, // Devices with max-width 768px
                settings: {
                    slidesToShow: 2, // Show 2 slides
                },
            },
            {
                breakpoint: 576, // Devices with max-width 576px
                settings: {
                    slidesToShow: 1, // Show 1 slide
                },
            },
        ],
    };


        async function getCategories(){
            let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
            console.log(data);
            setCategoryList(data.data);
        }

        useEffect(()=>{
            getCategories();
        } , [])


    return (<>
    
        {categoryList ? <div className={` ${style.category} px-5 mt-5 pt-5 pb-5`}>
            <Link className={`${style.dicorationNon}  pt-5`} to='/Categories'><h3 className={`  fw-bold my-5  ${style.colormain} `}>Categories</h3></Link>
            <div className="slider-container pb-5">
                <Slider {...settings}>
                    {categoryList.map((category , index)=>
                            
                                <Link to="/Categories" className={`${style.dicorationNon} text-black text-center mx-2`}  style={{ textDecoration: "none" }}  key={index} >
                                    <h3>{category.name}</h3>
                                    <img className=" px-2 w-100" height={350} src={category.image} alt="" />
                                </Link>)
                            
                            }
                        
                </Slider>
            </div>
        </div> :""}
        
    
        </>
    )
    }
                
            
// AutoPlay;














