


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import style from './CategoryProducts.module.css'



export default function CategoryProducts() {

    const parms = useParams();
    console.log(parms);


    function getCategoryProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${parms.categoryId}`)
    }

    const {data , isLoading} = useQuery({
        queryKey: ['getCategoryProducts',parms.categoryId],
        queryFn: getCategoryProducts
    })

    console.log( "chhh" , data?.data.data)

    return (
    <>
        {isLoading? <div className=' vh-100 d-flex justify-content-center align-items-center'>
                <h2>Is Loading</h2>
        </div>:
        <div className='row px-5'>
            <div className='sectionHead p-5'>
          <div className='d-flex justify-content-start my-4'>
            <div className='sideitem me-2'></div>
            <h5 className='sideItemContent pt-2 text-main'>{data?.data.data &&data.data.data.length>0 ? data.data.data[0].category.name : ""} products</h5>
          </div>
          <h3 className='mb-5'>Browse <span className=' text-main'>{data?.data.data &&data.data.data.length>0 ? data.data.data[0].category.name : ""}</span> Category products</h3>
        </div>
            {data?.data &&data.data.data.length>0 ? data.data.data.map((product, index) => (
                <Link to={`/ProductDetails/${product.category._id}/${product._id}`}  key={index} className="col-xl-3 col-lg-4 col-md-5 p-3 text-center" style={{ height: 500 }}>
                    <div className={`${style.productItem} p-2`} style={{ height: 450 }}>
                            <h3 className='fw-bold text-main bg-gradient'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                            <img src={product.imageCover} className='w-100' style={{ height: 350 }} alt={product.name} />
                    </div>
                </Link>
            )):<div className=' vh-100 d-flex justify-content-center align-items-center '>
                    <h2 className=' fw-bold text-uppercase text-main'>There is no product yet</h2>
                </div>}
        </div>}
    </>
  )
}
