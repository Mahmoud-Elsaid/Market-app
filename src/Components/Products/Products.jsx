

import { useContext } from "react";
import style from "./Products.module.css"
import axios from "axios"
import { RotatingLines } from "react-loader-spinner";
import {  useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexst/Addtocartcontext";
import toast from "react-hot-toast";


export default function Products() {

    


    function getProducts(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/Products")
    }
    
    let {data , isLoading} = useQuery("myproducts" , getProducts ,{
            cacheTime:Infinity,
            staleTime: Infinity
          // refetchInterval:1000
          // refetchOnWindowFocus:false
          // refetchOnMount:false
          // staleTime: 2000,
          // enabled: false
        } );
    console.log(data?.data.data , ("isloading " , isLoading));


    let {addToCart} = useContext(CartContext);

    async function addProductToCart(productId)
    {
        let response = await addToCart(productId);
        if(response.data.status === "success")
        {
            toast.success('product Successfully Added to Cart!')
        }
        else
        {
            toast.error("product didnt Added to Cart")
        }
    }


    
    return (
        <>
            {isLoading ? <>
                <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
                <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                />
                </div>
            </> : ""}
            {data?.data.data ? <div className=" container mt-5">
                <Link className={`${style.dicorationNon} `} to='/products'><h2 className={`py-5 ${style.colormain}`}  >Products</h2></Link>
                <div className=" row gy-5  ">
                    {data.data.data.map((Products )=> <>
                        <div  key={Products._id} height={450} className={`p-2  text-center product text-black col-xl-3 col-lg-4 col-md-6`} >
                        <Link className={`${style.dicorationNon}  text-black`}   to={`/Productsdetails/${Products._id}`}>
                                <div  className={` p-2  text-center`}>
                                    <img className="w-100" height={350} src={Products.imageCover} alt="" />
                                    <h3 className=" text-main">{Products.title}</h3>
                                    <h4 className=" ">{Products.category.name}</h4>
                                    <h4 className=" ">{Products.brand.name}</h4>
                                    <div className=" row">
                                        <div className=" col-md-6">
                                            <h6>{Products.price} EGP</h6>
                                            
                                        </div>
                                        <div className=" col-md-6">
                                            <h6>{Products.ratingsAverage} <i className=" text-warning fa-solid fa-star"></i></h6>
                                        </div>
                                    </div>
                                    <button className= {`${style.Productsbutton} btn text-white my-3 py-3 px-5 `}>View detaild</button>
                                </div>
                        </Link>
                        <button onClick={()=> addProductToCart(Products._id)} className= {`${style.Productsbutton} btn text-white my-3 py-3 px-5 `}>Add cart</button>
                        </div>
                        
                    </>)}
                </div>
            </div> : ""}
        </>
    )
  
}





