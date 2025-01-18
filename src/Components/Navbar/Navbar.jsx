import { Link, NavLink ,useNavigate } from "react-router-dom";
import logo from "../../images/mylogo.svg"
import { useContext } from "react";
import { UserContext } from "../../Contexst/UserContext";
import style from "./Navbar.module.css"


export default function Navbar() {

    

    let {token , setToken} = useContext(UserContext);

    let navigate = useNavigate();

    function logout(){
            localStorage.removeItem("token");
            setToken(null);
            navigate("/login");
        }

    console.log( "token" , token)
    return (
        <>
            <nav className={`${style.navbar} navbar position-fixed top-0 start-0 end-0 z-5 navbar-expand-lg bg-body-tertiary p-4 `}>
                <div className="container-fluid ">
                        <Link to="/home" className="navbar-brand" ><img src={logo}  alt="" /></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {token !== null ?
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/home" className="nav-link active" aria-current="page" >Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="products" className="nav-link" >Products</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="categories" className="nav-link" >Categories</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="cart" className="nav-link" >Cart</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="brands" className="nav-link" >Brands</NavLink>
                                    </li>
                                </> : ""}
                            </ul>

                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                
                                {token !== null ? <>
                                    <ul className=" list-unstyled d-flex justify-content-center align-items-center mt-1">
                                        <li><Link target="_blank" to={"https://www.linkedin.com/feed/"}><i className=" text-dark mx-2 fab fa-linkedin"></i></Link></li>
                                        <li><Link target="_blank" to={"https://www.linkedin.com/feed/"}><i className=" text-dark mx-2 fab fa-github"></i></Link></li>
                                        <li><Link target="_blank" to={"https://www.linkedin.com/feed/"}><i className=" text-dark mx-2 fab fa-facebook"></i></Link></li>
                                    </ul>
                                
                                    <li className=" d-flex justify-content-center align-items-center mt-2 nav-item">
                                        <h4  onClick={()=>logout()} className="cursor-pointer pt-2 nav-link" >Logout</h4>
                                    </li>
                                </> : <>
                                    <li className="nav-item">
                                        <Link to="login" className="nav-link" >Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="register" className="nav-link" >Registe</Link>
                                    </li>
                                </>}
                                
                                
                            </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
