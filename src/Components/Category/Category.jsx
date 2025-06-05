import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import Header from '../Header/Header';
import style from './Category.module.css'
import { Link } from 'react-router-dom';

export default function Category() {

  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['getCategoryItems'],
    queryFn: getCategories
  });

  console.log("ll" , data?.data.data)
  return (
    <>
      <Header />
      <div className='p-5'>
        <div className='sectionHead p-5'>
          <div className='d-flex justify-content-start my-4'>
            <div className='sideitem me-2'></div>
            <h5 className='sideItemContent pt-2 text-main'>Categories</h5>
          </div>
          <h3 className='mb-5'>Browse By Category</h3>
        </div>

        {isLoading? <div className=' vh-100 d-flex justify-content-center align-items-center'>
                <h2>Is Loading</h2>
        </div>:
        <div className='row px-5'>
        {data?.data ? data.data.data.map((category, index) => (
          <Link to={`/categoryProducts/${category._id}`} key={index} className="col-xl-3 col-lg-4 col-md-5 p-3 text-center" style={{ height: 500 }}>
            <div className={`${style.productItem} p-2`} style={{ height: 450 }}>
              <h3 className='fw-bold text-main bg-gradient'>{category.name.split(" ").slice(0, 2).join(" ")}</h3>
              <img src={category.image} className='w-100' style={{ height: 350 }} alt={category.name} />
              <h4 className='my-3  fw-bold'>{category.slug.split("-").slice(0, 4).join(" ")}</h4>
              
            </div>
          </Link>
        )) : 'No Categories Found'}
      </div>
        }
        


      </div>
    </>
  );
}
