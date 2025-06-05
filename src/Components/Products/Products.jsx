

import React, { useContext, useState } from 'react';
import style from './Products.module.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { counterContext } from '../../Context/CounterContext';
import { CartContext } from '../../Context/CartContext';
import toast from "react-hot-toast";

export default function Products() {
    
    const {addToCart} = useContext(CartContext);
    const { setNumberOfCartItems , numOfCartItems} = useContext(counterContext);


    //Update cart Number in the navbar
      let {getCartProducts}= useContext(CartContext);
      async function getCartAllProducts(){
            let response = await getCartProducts();
            console.log("hello")
            setNumberOfCartItems(response.data.numOfCartItems);
            console.log("product" , response);
            console.log(numOfCartItems)
        }

    const [page, setPage] = useState(1);
    const limit = 10;


    // Add product to cart
    async function AddProductToCart(productId){
        let response = await addToCart(productId);
        if(response.data.status === "success")
        {
            toast.success('product Successfully Added to Cart!')
        }
        else
        {
            toast.error("product didnt Added to Cart")
        }
        console.log("response",response)
    }


    // get products 
    function getAllProducts({ queryKey }) {
        const [, currentPage] = queryKey;
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${currentPage}`);
    }

    const { data, isLoading } = useQuery({
        queryKey: ['allProducts', page],
        queryFn: getAllProducts,
    });

    return (
        <>
            <Header />
            <div className={`${style.myContainer} mx-auto mt-5`}>
                {isLoading ? (
                    <div className="vh-100 d-flex justify-content-center align-items-center">
                        <h1>product is loading</h1>
                    </div>
                ) 
                : (
                    <>
            <div className="row g-2 gx-2">
              {data?.data.data ? (
                <>
                  <div className="sectionHead">
                    <div className="d-flex justify-content-start my-4">
                      <div className="sideitem me-2"></div>
                      <h5 className="sideItemContent pt-2 text-main">
                        Products
                      </h5>
                    </div>
                    <h3 className="mb-5">Browse By Products</h3>
                  </div>

                  {data.data.data.map((product, index) => {

                    return (
                      <div key={index} className={`col-xl-3 col-lg-4 col-md-8 p-3 text-center`}style={{ height: 670 }}>
                        <div className={`${style.productItem} p-2`} style={{ height: 655 }}>
                          <div>
                            <h3 className="fw-bold">
                              {product.title.split(' ').slice(0, 2).join(' ')}
                            </h3>

                            <img
                              src={product.imageCover}
                              className="w-100"
                              style={{ height: 300 }}
                              alt=""
                            />

                            <div className="d-flex justify-content-between my-3 px-3">
                              <div className="ratting">
                                <h4>
                                  {product.ratingsAverage}
                                  <i className="text-warning ms-1 fa-solid fa-star"></i>
                                </h4>
                              </div>
                              <div className={`${style.productCart}`}>
                                <Link to="/cart">
                                  <h4>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                  </h4>
                                </Link>
                              </div>
                            </div>

                            <span>{product.description.split(' ').slice(0, 15).join(' ')}</span>

                            <div className="text-main d-flex justify-content-end">
                              <h4>{product.price}$</h4>
                            </div>

                            <button className={`${style.detailsBtn} btn bg-main p-3 mx-2 mt-4`}>
                              <Link
                                className="text-white fw-bold"
                                to={`/ProductDetails/${product.category._id}/${product._id}`}
                              >
                                view details
                              </Link>
                            </button>

                            <button onClick={() => {
                                AddProductToCart(product._id);
                                getCartAllProducts()
                                }} className={`${style.detailsBtn} btn bg-main p-3 mx-2 text-white fw-bold mt-4`}>
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="vh-100 d-flex justify-content-center align-align-items-start p-5">
                  <h2 className="fw-bold mt-5">'No brands Found'</h2>
                </div>
              )}
            </div>

            <div className="w-50 mx-auto d-flex justify-content-center align-items-center mt-3">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  className={`btn mx-2 ${page === num ? 'bg-main' : 'bg-warning'} text-white`}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

