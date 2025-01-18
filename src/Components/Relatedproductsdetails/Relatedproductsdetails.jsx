// import { useContext, useEffect, useState } from "react"
// import { CounterContext } from "../../Contexst/CounterContext"
// import axios from "axios";
// import style from "./Relateproductdetails.module.css";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";




// export default function Relatedproductsdetails() {
//     let {relatedProduct , setRelatedProduct } = useContext(CounterContext);
//     const [related, setRelated] = useState([]);
//     const settings = {
//         dots: false,
//         infinite: true,
//         slidesToShow: 5, // Default number of slides
//         slidesToScroll: 1,
//         autoplay: true,
//         speed: 3000,
//         autoplaySpeed: 2000,
//         cssEase: "linear",
//         responsive: [
//             {
//                 breakpoint: 1200, // Devices with max-width 1200px
//                 settings: {
//                     slidesToShow: 4, // Show 4 slides
//                 },
//             },
//             {
//                 breakpoint: 992, // Devices with max-width 992px
//                 settings: {
//                     slidesToShow: 3, // Show 3 slides
//                 },
//             },
//             {
//                 breakpoint: 768, // Devices with max-width 768px
//                 settings: {
//                     slidesToShow: 2, // Show 2 slides
//                 },
//             },
//             {
//                 breakpoint: 576, // Devices with max-width 576px
//                 settings: {
//                     slidesToShow: 1, // Show 1 slide
//                 },
//             },
//         ],
//     };

//     async function getRelatedProducts(){
//             let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${relatedProduct}`)
//             setRelated(data.data);
//             console.log(data.data);
//     }

//     useEffect(()=>{
//         getRelatedProducts();
//     } , [relatedProduct])

//   return (
//         <>
//         {related ? <div className={` px-5 ${style.relatedproduct}`}>
//                         <Link className={`${style.dicorationNon}  pt-5`} to='/Categories'><h3 className={`  fw-bold my-5  text-main `}>Related products</h3></Link>
//                         <div className="slider-container">
//                             <Slider {...settings}>
//                                 {related.map((product , index)=>
                            
//                                 <Link to="/Categories" className={`${style.dicorationNon} text-black text-center mx-2 p-2 `}  style={{ textDecoration: "none" }}  key={index} >
//                                     <h3>{product.title}</h3>
//                                     <img className=" px-2 w-100" height={350} src={product.imageCover} alt="" />
//                                 </Link>)
                            
//                             }
                        
//                             </Slider>
//                         </div>
//                     </div> : ""}
//         </>
//   )
// }





import { useContext, useEffect, useState } from "react";
import { CounterContext } from "../../Contexst/CounterContext";
import axios from "axios";
import style from "./Relateproductdetails.module.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function Relatedproductsdetails() {
    let { relatedProduct, setRelatedProduct } = useContext(CounterContext);
    const [related, setRelated] = useState([]);
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5, // Default number of slides
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: .0000000000000000001,
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

    async function getRelatedProducts() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${relatedProduct}`);
        setRelated(data.data);
        console.log(data.data);
    }

    useEffect(() => {
        getRelatedProducts();
    }, [relatedProduct]);

    return (
        <>
            {related ? (
                <div className={`px-5 ${style.relatedproduct}`}>
                    <Link className={`${style.dicorationNon} pt-5`} to={`/Categoriesdetailes/${relatedProduct}`}>
                        <h3 className={`fw-bold my-5 text-main`}>Related products</h3>
                    </Link>
                    <div className="slider-container">
                        <Slider {...settings}>
                            {related.map((product, index) => (
                                <Link
                                    to={`/Productsdetails/${product._id}`}
                                    className={`${style.dicorationNon} text-black text-center mx-2 p-5`}
                                    style={{ textDecoration: "none" }}
                                    key={index}
                                >
                                    <img
                                        className={`w-100 ${style.productImage}`}
                                        src={product.imageCover}
                                        alt={product.title}
                                    />
                                    <h3 className={`mt-2 ${style.productTitle}`}>{product.title}</h3>
                                </Link>
                            ))}
                        </Slider>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
}
