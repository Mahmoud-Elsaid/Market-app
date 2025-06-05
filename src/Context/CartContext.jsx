import axios from "axios";
import { createContext, useContext } from "react";
import { counterContext } from "./CounterContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const userToken = localStorage.getItem("Token");
  const headers = { token: userToken };
  const { setNumberOfCartItems } = useContext(counterContext);

  async function addToCart(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );
      await getCart(); // Update cart count
      return response;
    } catch (error) {
      return error;
    }
  }

  async function getCart() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      setNumberOfCartItems(response.data.numOfCartItems || 0);
      return response;
    } catch (error) {
      return error;
    }
  }

  async function deleteCartProduct(productId) {
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
      await getCart();
      return response;
    } catch (error) {
      return error;
    }
  }

  async function updateProductsCount(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );
      await getCart();
      return response;
    } catch (error) {
      return error;
    }
  }

  async function deleteAllProducts() {
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      await getCart();
      return response;
    } catch (error) {
      return error;
    }
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

  return (
    <CartContext.Provider value={{ addToCart, getCart, deleteCartProduct, updateProductsCount, deleteAllProducts , onlinePayment  }}>
      {children}
    </CartContext.Provider>
  );
}
