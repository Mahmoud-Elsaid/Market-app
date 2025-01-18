import axios from "axios";
import { get } from "jquery";
import { createContext, useEffect, useState } from "react"



    export let CartContext =createContext();
    let userToken = localStorage.getItem("token");
    let headers = {token : userToken}


    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
            {
                productId
            },
            {
                headers
            }
        ).then((response)=> response)
        .catch((error)=>error);
    }

    function getCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , 
            
            {
                headers
            }
        ).then((response)=> response)
        .catch((error)=>error);
    }

    function deleteCartProduct(productid){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}` , 
            
            {
                headers
            }
        ).then((response)=> response)
        .catch((error)=>error);
    }

    function updateProductsCount(productId , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
            {
                count
            },
            {
                headers
            }
        ).then((response)=> response)
        .catch((error)=>error);
    }

    function deleteAllProducts(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , 
            
            {
                headers
            }
        ).then((response)=> {console.log("all products deleted ")
            return response ;
        })
        .catch((error)=> {console.log('error delete all ')
            return error
        });
    }

    function onlinePayment(cartId , values , url){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` , 
            {
                shippingAddress:values
            },
            {
                headers
            }
        ).then((response)=> response)
        .catch((error)=>error);
    }


    function getAllUserOrders(userId){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        .then((response)=> response)
        .catch((error)=>error);
    }
    


export default function CartContextProvider({children}) {

    const [cartId, setcartId] = useState(null)

    async function getCartForId(){
        let {data} = await getCart();
        setcartId(data.data._id);
        console.log( "this is the cart id" , data.data._id);
    }

    useEffect(()=>{
        getCartForId();
    } , [])

    return <CartContext.Provider value={{ cartId , addToCart , onlinePayment , getCart , deleteCartProduct , updateProductsCount , deleteAllProducts , getAllUserOrders}}>
            {children}
    </CartContext.Provider>
}
