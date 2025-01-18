

import axios from "axios"
import style from "./Categories.module.css"
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";


export default function Categories() {




    function getCategory(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    let {data , isLoading} = useQuery("myCategory" , getCategory )

    return (
        <>
            {isLoading ? <>
                                <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
                                                <RotatingLines
                                                        visible={true}
                                                        height="96"
                                                        width="96"
                                                        color="grey"
                                                        strokeWidth="5"
                                                        animationDuration="0.75"
                                                        ariaLabel="rotating-lines-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                />
                                                </div>
                        </> : <>
                        {data?.data.data ? <div className=" container mt-5">
                            <h2 className={`py-5 cursor-pointer ${style.colormain}`}>Categories</h2>
                            <div className=" row gy-5">
                                    {data?.data.data.map((category )=> <>
                                        <Link to={`/Categoriesdetailes/${category._id}`} key={category._id} height={450} className={` text-black col-md-3`} style={{ textDecoration: "none" }}>
                                                <div className={` product  ${`${style.product} , ${style.item}` } p-2  text-center`}>
                                                    <img className="w-100" height={350} src={category.image} alt="" />
                                                    <h3>{category.name}</h3>
                                                    <button className= {`${style.categorybutton} btn text-white my-3 py-3 px-5 `}>View detaild</button>
                                                </div>
                                        </Link>
                                    </>)}
                                </div>
                            </div> : ""}
                        </>}
            
        </>
    )
}

