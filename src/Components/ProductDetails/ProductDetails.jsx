import React, { useContext, useEffect, useState } from 'react';
import style from './ProductDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Slider from "react-slick";
import { counterContext } from '../../Context/CounterContext';
import { CartContext } from '../../Context/CartContext';
import toast from "react-hot-toast";


export default function ProductDetails() {
  const params = useParams();
  const [productImages, setProductImages] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
    
    

  const { setNumberOfCartItems} = useContext(counterContext);
  
  
      //Update cart Number in the navbar
        let {getCartProducts}= useContext(CartContext);
        async function getCartAllProducts(){
              let response = await getCartProducts();
              setNumberOfCartItems(response.data.numOfCartItems)
          }
  

    const {addToCart} = useContext(CartContext);

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


  const productSliderImages = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    customPaging: (i) => (
      <div
        style={{
          marginTop: "30px",
          width: "20px",
          height: "20px",
          backgroundColor: i === activeIndex ? "#0aad0a" : "transparent",
          border: "1px solid #0aad0a",
          borderRadius: "50%",
          margin: "0 5px",
          transition: "all 1s ease-in-out",
        }}
      ></div>
    ),
  };

  const relatedProductSlider = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 4 } },
      { breakpoint: 1300, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${params.productId}`);
  }

  const { data: productDetailsData,isLoading: isProductDetailsLoading,} = useQuery({
    queryKey: ['productDetails', params.productId],
    queryFn: getProductDetails,
  });

  function getProductCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${params.productCategory}`);
  }

  const {
    data: productCategoryData,
    isLoading: isCategoryLoading,
  } = useQuery({
    queryKey: ['productCategory', params.productCategory],
    queryFn: getProductCategory,
  });

  useEffect(() => {
    if (
      productDetailsData?.data?.data?.images &&
      productDetailsData.data.data.images !== productImages
    ) {
      setProductImages(productDetailsData.data.data.images);
    }
  }, [productDetailsData]);

  useEffect(() => {
    if (
      productCategoryData?.data?.data &&
      productCategoryData.data.data !== relatedProduct
    ) {
      setRelatedProduct(productCategoryData.data.data);
    }
  }, [productCategoryData]);

  useEffect(() => {
    getProductDetails();
  }, [params]);

  return (
    <>
      {isProductDetailsLoading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <h2>Your product is loading...</h2>
        </div>
      ) : productDetailsData?.data?.data ? (
        <div className={`${style.productDetailsImages} row my-5`}>
          <div className="col-md-6 pt-5 px-3">
            <div className="slider-container container mb-5">
              <Slider {...productSliderImages}>
                {productImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      className="w-100"
                      alt={`Product ${index}`}
                      style={{ height: 500 }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="col-md-6 pt-5 px-3">
            <div className={`${style.productDetailsContent} text-center p-3`}>
              <h2>{productDetailsData.data.data.title}</h2>
              <div className="d-flex justify-content-between align-items-center p-4">
                <h3 className={`${style.detailsInfo} text-main`}>
                  {productDetailsData.data.data.price}$
                </h3>
                <h3 className={`${style.detailsInfo} text-primary`}>
                  {productDetailsData.data.data.brand?.name || 'Unknown Brand'}
                </h3>
                <h3 className={`${style.detailsInfo} text-danger`}>
                  {productDetailsData.data.data.category?.name || 'Unknown Category'}
                </h3>
              </div>
              <p className={`${style.detailsDesc} p-4`}>
                {productDetailsData.data.data.description}
              </p>
              <div className="d-flex justify-content-between align-items-center px-5 py-3">
                <span className={style.detailsRating}>
                  Rating: {productDetailsData.data.data.ratingsAverage}
                  <i className="text-warning ms-1 fa-solid fa-star"></i>
                </span>
                <span className={style.detailsRating}>
                  Ratings: {productDetailsData.data.data.ratingsQuantity}
                </span>
              </div>
              <button onClick={() => {
                                AddProductToCart(productDetailsData.data.data._id);
                                getCartAllProducts()
                                }} className="btn bg-main w-100 text-white fw-bold">Add To Cart</button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Product not found</h1>
      )}

      {isCategoryLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <h2>Related products are loading...</h2>
        </div>
      ) : productCategoryData?.data?.data ? (
        <Slider {...relatedProductSlider}>
          {relatedProduct.map((product, index) => (
            <div key={index} style={{ height: 600 }} className="p-4">
              {product.category?._id ? (
                <Link to={`/ProductDetails/${product.category._id}/${product._id}`}>
                  <div className={`${style.relatedProductItem} p-4 text-center`} style={{ height: 500 }}>
                    <img
                      src={product.imageCover}
                      className="w-100"
                      alt={`Product ${index}`}
                      style={{ height: 300 }}
                    />
                    <h2 className=' mt-3 fw-bold'>{product.title.split(" ").slice(0, 5).join(" ")}...</h2>
                  </div>
                </Link>
              ) : (
                <div className="text-center text-muted">Invalid product data</div>
              )}
            </div>
          ))}
        </Slider>
      ) : (
        <h1>No related products found</h1>
      )}
    </>
  );
}
