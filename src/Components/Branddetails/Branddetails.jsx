import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Branddetails.module.css";


export default function Branddetails() {


    let params = useParams();
  const [brandProducts, setBrandProducts] = useState([]);

  async function getCategory() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${params.brandId}`);

    setBrandProducts(data.data);
  }

  useEffect(() => {
    getCategory();
  }, [params.brandId]); 



  return (
    <div>
          {brandProducts.length > 0 ? (
            // params.categoryId === "6439d5b90049ad0b52b90048" || params.categoryId === "6439d58a0049ad0b52b9003f" || params.categoryId === "6439d2d167d9aa4ca970649f" ? (
              
              <div className="container mt-5">
                {/* {headerMessage && <h2 className={`container mt-5 ${style.colormain}`} >{headerMessage}</h2>} */}
                <div className="row gy-4 py-5">
                  {brandProducts.map((brand) => (
                    <Link 
                      to={`/Productsdetails/${brand._id}`}
                      key={brand._id}
                      className={`text-black col-md-3 ${style.item}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className={`product ${style.product}`}>
                        <img
                          className="w-100"
                          height={350}
                          src={brand.imageCover}
                          alt={brand.title}
                        />
                        <h3>{brand.title}</h3>
                        <button className={` mt-2 btn text-white ${style.categorybutton}`}>
                          see details
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            // ) : <>
                  
            // </>
          ) : (
            <div className="pb- vh-100 w-100 d-flex justify-content-center align-items-center">
                    <h2 className="">there is no products for this category right now</h2>
                  </div>
          )
          }
        </div>
  )
}
