
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Contexst/Addtocartcontext'
import { jwtDecode } from "jwt-decode";


export default function Allorders() {
    
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    let userId = user.id;
    let {getAllUserOrders} = useContext(CartContext);

    let [orders, setOrders] = useState([]);
    
    async function getAllOrders(userId){
        try {
            let { data } = await getAllUserOrders(userId); // جلب البيانات
            console.log("Fetched data:", data); // تأكيد جلب البيانات
            setOrders(data); // تحديث الحالة
            console.log( "kgkgkgk" , orders)
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(()=>{
        getAllOrders(userId);
    } ,[userId])

    return (
        <div className=' p-5'>

<h2 className=' text-main'>Your orders</h2>
            {orders? orders.map((order , index)=>  <>
            
                <div className="row py-5 mb-5">
                    <hr></hr>
                    <div className=' col-md-6'>
                        <h3 className=' text-main'>Your {index + 1} order</h3> 
                    </div>
                    <div className=' col-md-6'>
                        <h4 className=' float-end clearfix'>your {index + 1} order total price = <span className=' text-main fw-bold'>{order.totalOrderPrice} EGP</span> </h4>
                    </div>
                    <div className='  row  ' key={index}>
                    {order.cartItems.map(( item ,index)=> <>
                        <div className=' p-3 row' key={index}>
                            <div className=" col-md-2">
                                <img src={item.product.imageCover} className=" w-100" alt="" />
                            </div>

                            <div className=' col-md-8 ps-5'>
                                <h3 className=' text-main'>{item.product.title}</h3>
                                <h3 className=' '>Brand: {item.product.brand.name}</h3>
                                <h3 className=' '>Brand: {item.product.category.name}</h3>
                                <h3 className=' fw-bold'>count:<span>{item.count}</span></h3>
                            </div>

                            <div className=' col-md-2 position-relative '>
                                <h3>price : {item.price}</h3>
                                {<h3 className=' position-absolute bottom-0 end-0'> total price: <span className=' fw-bold text-main'>{item.price * item.count} EGP</span>  </h3>}
                            </div>
                            <hr className=' text-main mt-5'></hr>
                        </div>
                    </>)}
                    </div>
                    
                </div>
                <div className=' w-50 m-auto text-center'>
                    
                </div>

            </>) :"" }
            <button className='btn bg-main w-50 m-auto  float-end clearfix py-4 text-white fw-bold'> total payments:  {orders.reduce((acc, order) => acc + order.totalOrderPrice, 0)}  </button>

        </div>
  )
}
