

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import style from './AllOrders.module.css'

export default function AllOrders() {

    const undecodedToken = localStorage.getItem("Token");
    const decodedToken = jwtDecode(undecodedToken);
    console.log("decodedToken" , decodedToken);

    function getAllOrders(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`)
    }

    const {data , isLoading} = useQuery({
        queryKey:['getAllOrders'],
        queryFn:getAllOrders
    })

    const orders = data?.data;
    
    return (
        <div className=' myContainer'>
            <div className="sectionHead">
                <div className="d-flex justify-content-start my-4">
                    <div className="sideitem me-2"></div>
                    <h5 className="sideItemContent pt-2 text-main">
                        Orders
                    </h5>
                </div>
                    <h3 className="mb-5">Check Your Orders</h3>
            </div>


            { orders && orders.length > 0 ? orders.map((order , index)=> (
            <div className=' row px-5'>
                {console.log('ord' , orders)}
                <div className=' col-lg-12 '>
                    <div className={`${style.order} p-5`}>
                        <h3 className=' text-main fw-bold'>Order Number {index+1}</h3>
                        <div className=' d-flex justify-content-between align-items-center mt-5 ms-5'>
                                <h5 >Date:<span className=' fw-bold'> {new Date(order.createdAt).toLocaleDateString()}</span> </h5>
                                <h5>Is Delivered: <span className=' fw-bold'>{order.isDelivered ? "Yes" : "Not delivered yet"}</span></h5>
                                {console.log("isDelivered" , order.isDelivered)}
                        </div>
                        
                        <hr className=" fw-bold text-main mb-5"></hr>
                        <div className=' row'>
                            {order.cartItems.map((product , index)=>(
                                <div className=' col-lg-12'>
                                    <div className=' row'>
                                        <div className=' col-lg-2'>
                                            <div className=' productImg'>
                                                <img src={product.product.imageCover} className=' w-100' height={200} alt="" />
                                            </div>
                                        </div>
                                        <div className=' col-lg-8'>
                                            <div className=' p-4'>
                                                <h3 className=' fw-bold'>{product.product.title}</h3>
                                                <h4 className=' text-muted'> quantity: <span className=' fw-bold'>{product.count}</span></h4>
                                                <h4 className=' text-muted'> price: <span className=' fw-bold'>{product.price}</span></h4>

                                                <h4> rating: {product.product.ratingsAverage}</h4>
                                            </div>
                                        </div>

                                        <div className=' col-lg-2'>
                                            <h3 className=' fw-bolder'>{product.count * product.price} EGP</h3>
                                        </div>

                                    </div>
                                    
                                    <hr className=" fw-bold text-main mb-5"></hr>

                                </div>
                            ))}

                            <div className='col-lg-12 '>
                                <div className=' row'>
                                    <div className=' col-lg-4'>
                                        <div className=' payment'>
                                            <h3 className=' fw-bold'>Payment</h3>
                                            <h4 className=' my-4'>Payed at : <span className=' fw-bold'>{new Date(order.paidAt).toLocaleDateString()}</span></h4>
                                        </div>
                                    </div>

                                    <div className=' col-lg-4'>
                                        <div className=' delivery'>
                                            <h3 className=' fw-bold'>Delivery</h3>
                                            <p className=' text-muted'>Address : <span className=' fw-bold'>{order.shippingAddress.city}</span></p>
                                            <p className=' text-muted'>phone : <span className=' fw-bold'>{order.shippingAddress.phone}</span></p>
                                            <p className=' text-muted'>Name : <span className=' fw-bold'>{order.shippingAddress.details}</span></p>
                                        </div>
                                    </div>

                                    <div className=' col-lg-4'>
                                        <div className=' totalPayed'>
                                            <h3>Total Order Price : <span className=' fw-bold'>{order.totalOrderPrice} EGP</span> </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
                                        <hr className=" fw-bold text-main mb-5"></hr>

            </div>
            
            )) 
            : <div className=' vh-100 d-flex justify-content-center align-items-center'>
                    <h2 className=' text-main'>there is no orders Yet</h2>
                </div>}

        </div>
    )
}
