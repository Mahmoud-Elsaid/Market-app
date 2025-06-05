import React, { useContext, useEffect } from 'react';
import './Navbar.module.css';
import style from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../images/mylogo.svg';
import { userContext } from '../../Context/UserContext';
import { counterContext } from '../../Context/CounterContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  
  
  let { UserToken, setUserToken } = useContext(userContext);
  let {   numberOfCartItems , setNumberOfCartItems  } = useContext(counterContext);
  let navigate = useNavigate();


  let {getCart}= useContext(CartContext);
  async function getCartAllProducts(){
    let response = await getCart();
    setNumberOfCartItems(response.data.numOfCartItems);
    console.log("nav" , numberOfCartItems)
}
  useEffect(()=>{
    getCartAllProducts()
  },[numberOfCartItems])



  function logOut() {
    localStorage.removeItem('Token');
    setUserToken(null);
    navigate('/login');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark text-danger p-3 position-fixed top-0 start-0 end-0 z-3 mb-5 text-center">
        <div className="container-fluid px-5">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className=" text-white fa-solid fa-bars "></i> 
          </button>

          <Link
            to="home"
            className={`navbar-brand text-light ${style.logo}`}
            state={{ width: '30%' }}
          >
            <img src={logo} alt="" />
          </Link>

          <div className="collapse navbar-collapse text-center myNav " id="navbarSupportedContent">
            <ul className={`navbar-nav  d-flex justify-content-evenly align-items-center mb-2 mb-lg-0 ${style.links}`}>
              <li className="nav-item">
                <NavLink to="home" className="nav-link text-light">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="products" className="nav-link text-light ">
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="category" className="nav-link text-light">
                  Category
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="brands" className="nav-link text-light">
                  Brands
                </NavLink>
              </li>
            </ul>

            <div className={`${style.icons}  text-center d-flex justify-content-evenly align-items-center`}>
              <a className=' mx-2' href="https://www.facebook.com/profile.php?id=100040795912735">
                <i className={`${style.socialIcons} text-light fa-brands fa-facebook`}></i>
              </a>
              <a className=' mx-2' href="https://github.com/Mahmoud-Elsaid">
                <i className={`${style.socialIcons} text-light fa-brands fa-github`}></i>
              </a>
              <a className=' mx-2' href="https://www.linkedin.com/in/mahmoud-elsaid-a55a29239/">
                <i className={`${style.socialIcons} text-light fa-brands fa-linkedin`}></i>
              </a>
              {UserToken ?
                  <NavLink  to="/Profile/profileDetails" className="nav-link mx-2 text-light fw-bold">
                    <i className={`${style.socialIcons} fw-bold fa-solid fa-user`}></i>
                  </NavLink> :''}

                  

                  <NavLink  to="cart" className="nav-link text-light mx-2 fw-bold">
                    <i className={`${style.socialIcons} fw-bold fa-solid fa-cart-shopping position-relative`}>
                      <div className={`${style.shoppingCounter} text-main  p-2`}>
                        {numberOfCartItems}
                      </div>
                    </i>
                  </NavLink>
              
            </div>

            {UserToken ? (
              <ul className={`  navbar-nav d-flex justify-content-evenly align-items-center mb-2 mb-lg-0 ${style.socialLinks}`}>
                

                <span onClick={logOut} className="  cursor-pointer nav-item text-light">Logout</span>
              </ul>
            ) : (
              <ul className={`navbar-nav d-flex justify-content-evenly align-items-center mb-2 mb-lg-0 ${style.socialLinks}`}>
                <li className="nav-item">
                  <NavLink to="Login" className="nav-link text-light">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="register" className="nav-link text-light">
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
