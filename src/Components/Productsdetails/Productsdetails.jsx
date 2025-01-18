import axios from "axios"
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import style from "./Productsdetails.module.css"
import { RotatingLines } from "react-loader-spinner";
import { useContext, useEffect } from "react";
import { CounterContext } from './../../Contexst/CounterContext';
import Relatedproductsdetails from "../Relatedproductsdetails/Relatedproductsdetails";
import { CartContext } from "../../Contexst/Addtocartcontext";
import toast from "react-hot-toast";



export default function Productsdetails() {

    let params = useParams();
    let { relatedProduct , setRelatedProduct } = useContext(CounterContext);

    function getProductsDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/Products/${params.productsId}`)
    }

    let {data , isLoading , refetch } = useQuery("productsDetails" , getProductsDetails);
    {data?.data.data!== null ? setRelatedProduct(data?.data.data.category._id) : setRelatedProduct()};
    console.log( "counter context" , relatedProduct)

    useEffect(()=>{
        getProductsDetails();
        refetch();
    } , [params.productsId , refetch])


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

    return (<>
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
                    </> : <div className={` p-5 ${style.productsDetails}`}>
                            <div className=" container pt-5">
                                <div className=" row">
                                    <div className=" col-md-5">
                                        <div className={`p-5 ${style.item}`}>
                                            <img className=" w-100" src={data?.data.data.imageCover} alt="" />
                                        </div>
                                    </div>
                                    <div className=" col-md-6 offset-1">
                                        <div className=" product-details-content mt-5">
                                            <h2 className=" text-main fw-bold">{data?.data.data.title}</h2>
                                            <h4>Brand:  {data?.data.data.brand.name}</h4>
                                            <h4>Category: {data?.data.data.category.name}</h4>
                                            <div className={`rating d-flex justify-content-start align-items-center ${style.rating}`} >
                                                <div className="d-flex align-items-center justify-content-center ">
                                                    <span className=" ">{data?.data.data.ratingsAverage}</span>
                                                </div>
                                                <div className="  d-flex align-items-center justify-content-center">
                                                    <li className=" list-unstyled ms-1"><i className="fa-solid fa-star"></i></li>
                                                    <li className=" list-unstyled ms-1"><i className="fa-solid fa-star"></i></li>
                                                    <li className=" list-unstyled ms-1"><i className="fa-solid fa-star"></i></li>
                                                    <li className=" list-unstyled ms-1"><i className="fa-solid fa-star"></i></li>
                                                    <li className=" list-unstyled ms-1"><i className="fa-solid fa-star-half-stroke"></i></li>
                                                </div>
                                            </div>
                                            <hr/>
                                            <h3>Price: {data?.data.data.price} EGP</h3>
                                            <h4>All prices include VAT.</h4>
                                            <hr></hr>
                                            <h3>discretion: <p className=" lead text-muted">{data?.data.data.description}</p></h3>
                                            <hr />
                                            <button onClick={()=>addProductToCart(data?.data.data._id)} className=" bg-main text-white btn px-4 py-2 form-control">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>}
                        <Relatedproductsdetails/>
                    </>)
}
