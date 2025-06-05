


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../Header/Header';
import style from './BrandProducts.module.css'

export default function BrandProducts() {


  const params = useParams();
  console.log(params);


  function getBrandProducts(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${params.brandId}`);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['getBrandProducts', params.brandId],
    queryFn: getBrandProducts
  });


  console.log("ppp",data?.data.data)


  return (
    <>
        <Header/>
        <div className={`${style.myContainer} mx-auto mt-5`}>
            {isLoading? <div className=' vh-100 d-flex justify-content-center align-items-center'>
                <h1>product is  loading</h1>
            </div>:<>
            <div className=' row g-2 gx-2 '>
        {data?.data.data &&data.data.data.length>0 ?
            <>
                  <div className=' sectionHead'>
                      <div className=' d-flex justify-content-start  my-4'>
                            <div className='sideitem me-2'></div>
                            <h5 className='sideItemContent pt-2 '><span className=' text-main fw-bolder'>{data?.data.data &&data.data.data.length>0 ? data.data.data[0].brand.name : ""}</span> products</h5>
                      </div>
                      <h3 className='mb-5'>Browse <span className=' text-main'>{data?.data.data &&data.data.data.length>0 ? data.data.data[0].brand.name : ""}</span> Category products</h3>
                  </div>
                
                  {data.data.data.map(
                    (product , index)=><div  key={index} className={` col-xl-3 col-lg-4 col-md-5  p-3  text-center `} style={{ height: 600 }} >
                        <div className={`${style.productItem} p-2 `} style={{ height: 550 }}>
                            <div >
                            <h3 className=' fw-bold'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                                <img src={product.imageCover} className=' w-100' style={{ height: 300 }} alt="" />
                                <div className=' d-flex justify-content-between my-3 px-3'>
                                    <div className=' ratting '>
                                        <h4>{product.ratingsAverage}<i className=" text-warning ms-1 fa-solid fa-star"></i></h4>
                                    </div>
                                    <div className={`${style.productCart}`}>
                                        <Link to='/cart'><h4><i className="fa-solid fa-cart-shopping"></i></h4></Link>
                                    </div>
                                </div> 

                                <span>{product.description.split(" ").slice(0, 15).join(" ")}</span>
                        
                                <div className=' text-main d-flex justify-content-end'>
                                    <h4 className=''>{product.price}$</h4>
                                </div>   
                                <button  className={`${style.detailsBtn} btn bg-main p-3 `}> <Link to={`/ProductDetails/${product.category._id}/${product._id}`}>view details</Link> </button>
                            </div>
                                
                        </div>
                </div>
                )}
            </>
            
                
            : <>
                <div className=' vh-100 d-flex justify-content-center align-items-center '>
                    <h2 className=' fw-bold text-uppercase text-main'>There is no product yet</h2>
                </div>
            </>}
        </div>


        

            </>}
       
        </div>
        
        
    </>
  )
}

