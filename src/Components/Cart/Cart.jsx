

import { useContext, useEffect, useState } from "react"
import style from "./Cart.module.css"
import { CartContext } from "../../Contexst/Addtocartcontext"
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
export default function Cart() {
    
    let {getCart , deleteCartProduct , updateProductsCount , deleteAllProducts} = useContext(CartContext);
    const [cartDetails, setCartDetails] = useState(null)
    
    // function for get all products in cart
    async function getCartProducts(){
      let {data} =  await getCart();
      console.log( "cart data" , data);
      setCartDetails(data);
    }

    async function deleteProducts(productId) {
        let {data} = await deleteCartProduct(productId)
        setCartDetails(data);
    }


    async function updateProductCounts(productId , count) {
        let {data} = await updateProductsCount(productId , count)
        console.log("update date cart" , data)
        setCartDetails(data);
    }

    async function deleteAllCartProducts() {
        let {data} = await deleteAllProducts()
        setCartDetails(null);
    }


    useEffect(()=>{
        getCartProducts();
    } , [])

    return (
        <>
            {cartDetails && cartDetails.data.products.length > 0   ?<>
                <div className={`mt-5 ${style.cartbody} w-100 p-5 `}>
                    <div className={`${style.cart} p-4`}>
                        <div className=" w-50 m-auto text-center">
                            <button onClick={()=>deleteAllCartProducts()} className=" btn btn-danger">delete all products</button>
                        </div>
                        <div className=" row">
                            <div className=" col-md-10 "><h2 className=" fw-bold text-main">Shopping Cart</h2></div>
                            <div className=" col-md-2"><h4 className=" float-end clearfix pe-5">Price</h4></div>
                        </div>
                        <hr className=" fw-bold text-main"></hr>
                        {cartDetails?.data.products.map((product , index)=> <><div key={index} className=" row ">
                            <div className=" col-md-2">
                                <Link to={`/Productsdetails/${product.product._id}`}><img src={product.product.imageCover} className=" w-100" alt="" /></Link>
                            </div>

                            <div className=" ps-5 col-md-8">
                                <h3>{product.product.title}</h3>
                                <h5>Brand : {product.product.category.name}</h5>
                                <h5>Brand : {product.product.brand.name}</h5>
                                <h6 className=" py-2 text-danger">only {product.product.quantity} left in stock</h6>
                                <h6 className=" py-2">Eligible for FREE delivery</h6>
                                <div className=" py-2 d-flex justify-content-start align-items-center">

                                    <div onClick={()=>updateProductCounts(product.product._id ,product.count-1 )} className={` ${style.iconminus} d-flex justify-content-center align-items-center  text-white bg-danger`}>
                                            <i className="   fa-solid fa-minus"></i>
                                    </div>

                                    <h4 className=" mx-3">{product.count}</h4>

                                    <div onClick={()=>updateProductCounts(product.product._id ,product.count+1 )}  className={`${style.icon} ${style.iconplus} d-flex justify-content-center align-items-center  text-white bg-success`}>
                                        <i className="   fa-solid fa-plus"></i>
                                    </div>
                                </div>
                                <button onClick={()=>deleteProducts(product.product._id)} className=" btn btn-danger my-2"><i className="fa-solid fa-trash"></i> remove </button>
                            </div>

                            <div className=" col-md-2 position-relative">
                                <h3 className=" float-end clearfix fw-bold"> {product.price} EGP</h3>
                                <h3 className=" my-5 position-absolute bottom-0 end-0">total: {product.price} x {product.count} = {product.price * product.count} EGP </h3>
                            </div>
                        </div>
                        <hr className=" fw-bold text-main" />
                        </>
                        )}
                        
                        <div className=" row">
                            <div className=" col-md-6">
                                <h4>Total items : <span className=" fw-bold"> {cartDetails.numOfCartItems}</span></h4>
                            </div>
                            <div className=" col-md-6">
                                <h4 className=" float-end clearfix">Total prices: <span className=" fw-bold">{cartDetails.data.totalCartPrice} EGP</span> </h4>
                            </div>
                        </div>

                        <div className=" w-75 d-flex justify-content-evenly align-items-center m-auto text-center mt-5 ">
                            <div className=" w-25 ">
                                <Link to="/Onlinepaydetails" > <button className=" btn bg-main text-white py-3 form-control ">Online payment</button> </Link>
                            </div>

                            <div className=" w-25">
                                <Link to="/Onlinepaydetails" > <button className=" btn bg-main text-white py-3 form-control">CASH ON delivery</button> </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
             : <>
                             <div className="mt-5 text-center p-5">
        <h3 className=" pt-5">Your cart is empty</h3>
        <Link to="/products" className="btn bg-main text-white mt-3">Start Shopping</Link>
    </div>
                        </> }
        </>
  )
}
{/* <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
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
                             </div> */}