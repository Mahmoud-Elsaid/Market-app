import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Categoriesdetailes.module.css";

export default function Categoriesdetailes() {
  let params = useParams();
  const [categoryList, setCategoryList] = useState([]);

  async function getCategory() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category=${params.categoryId}`
    );
    setCategoryList(data.data);
  }

  useEffect(() => {
    getCategory();
  }, [params.categoryId]); 


  const headerMessage = params.categoryId === "6439d5b90049ad0b52b90048"
    ? "Our Men's Fashion Products"
    : params.categoryId === "6439d58a0049ad0b52b9003f"
    ? "Our Women's Fashion Products"
    : params.categoryId === "6439d2d167d9aa4ca970649f"
    ? "Our Electronic Fashion Products"
    : null;

  return (
    <div>
      {categoryList.length > 0 ? (
        params.categoryId === "6439d5b90049ad0b52b90048" || params.categoryId === "6439d58a0049ad0b52b9003f" || params.categoryId === "6439d2d167d9aa4ca970649f" ? (
          
          <div className="container mt-5">
            {headerMessage && <h2 className={`container mt-5 ${style.colormain}`} >{headerMessage}</h2>}
            <div className="row gy-4 py-5">
              {categoryList.map((category) => (
                <Link 
                  to={`/Productsdetails/${category._id}`}
                  key={category._id}
                  className={`text-black col-md-3 ${style.item}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className={`product ${style.product}`}>
                    <img
                      className="w-100"
                      height={350}
                      src={category.imageCover}
                      alt={category.title}
                    />
                    <h3>{category.title}</h3>
                    <button className={` mt-2 btn text-white ${style.categorybutton}`}>
                      see details
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : <>
              
        </>
      ) : (
        <div className="pb- vh-100 w-100 d-flex justify-content-center align-items-center">
                <h2 className="">there is no products for this category right now</h2>
              </div>
      )}
    </div>
  );
}
