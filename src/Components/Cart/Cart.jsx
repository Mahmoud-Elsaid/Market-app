


import React, { useState } from 'react'
import { useContext } from 'react';
import { CartContext } from './../../Context/CartContext';
import { useEffect } from 'react';
import style from './Cart.module.css'
import { Link } from 'react-router-dom';
export default function Cart() {

    const [cartProducts, setCartProducts] = useState([]);
    const [cart, setCart] = useState([]);


    let {getCart , deleteCartProduct , updateProductsCount , deleteAllProducts} = useContext(CartContext)
    async function getCartProducts(){
        let response  = await getCart();
        setCart(response);
        setCartProducts(response.data.data.products);
        
    }

    async function deleteProducts(productId) {
        let response = await deleteCartProduct(productId)
        setCartProducts(response.data.data.products);
    }


    async function updateProductCounts(productId , count) {
        let response = await updateProductsCount(productId , count)
        setCartProducts(response.data.data.products);
        getCartProducts();
    }

    async function deleteAllCartProducts() {
        let response = await deleteAllProducts();
        console.log(response);
        setCartProducts([]);
    }


    useEffect(()=>{
        getCartProducts()
    },[])

    useEffect(() => {
    }, [cartProducts]);

    return (
        <>
            {cartProducts && cartProducts.length >0 ? <>
                <div className='sectionHead px-5 py-1'>
                    <div className='d-flex justify-content-start my-4'>
                        <div className='sideitem me-2'></div>
                        <h5 className='sideItemContent pt-2 text-main'>Cart</h5>
                    </div>
                    <h3 className='mb-5'>Shopping Cart Products</h3>
                </div>
                        <div className={`w-100  `}>
                            <div className={`  w-100 p-5 `}>
                                <div className={` p-4`}>
                                    
                                    <div className={`container m-auto  ${style.cartbody} p-5`}>
                                        <div className={` w-100  text-end`}>
                                        <button onClick={()=>deleteAllCartProducts()}  className=" btn btn-danger">delete all products</button>
                                    </div>
                                        <div className={` row mt-5 `}>
                                        <div className=' col-lg-6'>
                                            <h3 className=' fw-bold text-main'>product</h3>
                                        </div>

                                        <div className=' col-md-2  d-flex justify-content-center  '>
                                            <h3 className=' fw-bolder '>Price</h3>
                                        </div>
{/* //quantity */}
                                        <div className=' col-md-2  d-flex justify-content-center  '>
                                            <h3 className=' fw-bolder '>Quantity</h3>
                                        </div>
{/* // supTotal */}
                                        <div className=' col-md-2  d-flex justify-content-center  '>
                                            <h3 className=' fw-bolder '>Sup Total</h3>
                                        </div>
                                        
                                        <hr className=" fw-bold text-main mb-5"></hr>
                                        {cartProducts.map((product , index)=>(
                                            <React.Fragment key={product._id || product.product._id || index}>
                                                                                                <div className=' row' key={index}>
                                                <div className=" col-md-2 ">
                                                    <Link to={`/ProductDetails/${product.product.category._id}/${product.product._id}`}><img src={product.product.imageCover} className=" w-100" alt="" /></Link>

                                                </div>

                                                <div className="  col-md-4 ">
                                                    <h3>{product.product.title}</h3>
                                                    <h5><span className=' fw-bold'>Category</span> : {product.product.category.name}</h5>
                                                    <h6 className=" py-2 text-danger">only {product.product.quantity} left in stock</h6>
                                                    <h6 className=" py-2">Eligible for FREE delivery</h6>
                                                    

                                                    <button onClick={()=>deleteProducts(product.product._id)}  className=" btn btn-danger my-2"><i className="fa-solid fa-trash"></i> remove </button>
                                                </div>

                                                <div className='price col-lg-2  d-flex justify-content-center align-items-start'>
                                                    <h3 className=" ms-5 "> {product.price}  EGP</h3>

                                                </div>

                                                <div className='price col-lg-2 d-flex justify-content-center align-items-start'>
                                                    <div className=" ms-5 py-2 d-flex justify-content-start align-items-center">

                                                        <div onClick={()=>updateProductCounts(product.product._id ,product.count-1 )} className={` ${style.iconminus} d-flex justify-content-center align-items-center  text-white bg-danger`}>
                                                                <i className="   fa-solid fa-minus"></i>
                                                        </div>

                                                        <h4 className=" mx-3">{product.count}</h4>

                                                        <div onClick={()=>updateProductCounts(product.product._id ,product.count+1 )}  className={`${style.icon} ${style.iconplus} d-flex justify-content-center align-items-center  text-white bg-success`}>
                                                            <i className="   fa-solid fa-plus"></i>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className=" col-md-2 d-flex justify-content-center align-items-start">
                                                    <h3 className="ms-5  "> {product.price * product.count} EGP</h3>
                                                </div>
                                            </div>
                                            <hr className=" fw-bold text-main my-4" />
                                            </React.Fragment>

                                            
                                            
                                        ))}
                                        
                                        <div className=" col-lg-12">
                                            <div className=' row'>
                                                <div className=" col-md-6">
                                                <h4 className=' fw-bold'>Total items : <span className="text-main "> {cart.data.numOfCartItems}</span></h4>
                                            </div>
                                            <div className=" col-md-6 d-flex justify-content-end ">
                                                <h4 className="fw-bold">Total prices: <span className="  text-main">{cart.data.data.totalCartPrice} EGP</span> </h4>
                                            </div>
                                            </div>
                                            
                                        </div>

                                        <div className=" w-75 d-flex justify-content-evenly align-items-center m-auto text-center mt-5 ">
                                            <div className=" w-25 ">
                                                <Link to="/onlinepayment" > <button className=" btn bg-main text-white py-3 form-control ">Online payment</button> </Link>
                                            </div>

                                            <div className=" w-25">
                                                <Link to="/Onlinepaydetails" > <button className=" btn bg-main text-white py-3 form-control">CASH ON delivery</button> </Link>
                                            </div>
                                        </div>
                                    </div>
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
                </> 
            }
        </>
        
        
    )
}
