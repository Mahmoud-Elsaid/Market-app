

import style from "./Footer.module.css"
import footerLogo from "../../images/organic-store-white-logo.png"
import { Link } from "react-router-dom"
export default function Footer() {
    return (
        <>
            <div className={`row p-5 bg-dark text-white ${style.footer}`}>
                <div className=" col-lg-3">
                    <div className=" footerLogo p-4">
                        <img src={footerLogo}  alt="" />

                       
                        
                    </div>
                </div>

                <div className=" col-lg-3">
                    <h2 className=" fw-bold text-main">Sections:</h2>
                    <ul>
                    <li className=" m-3"><Link to='home' className=" text-white">Home</Link></li>
                    <li className=" m-3"><Link to='products' className=" text-white">Products</Link></li>
                    <li className=" m-3"><Link to='category' className=" text-white">Category</Link></li>
                    <li className=" m-3"><Link to='brands' className=" text-white">Brands</Link></li>
                    <li className=" m-3"><Link to='cart' className=" text-white">Cart</Link></li>
                    
                    </ul>
                </div>

                <div className=" col-lg-3">
                    <h2 className=" fw-bold text-main">Profile:</h2>
                    <ul>
                    <li className=" m-3"><Link to='/profile/profileDetails' className=" text-white">Account</Link></li>
                    <li className=" m-3"><Link to='/allorders' className=" text-white">Orders</Link></li>
                    
                    
                    </ul>
                </div>


                <div className=" col-lg-3">
                                        <h2 className=" fw-bold text-main">Contact Us:</h2>

                     <div className=" Footer-contact-icons mt-5 me-5 pe-5   d-flex justify-content-between align-items-center">
                            
                                <div className="Footer-contact-icons-item ">
                                    <a target="_blank" href={"https://www.facebook.com/profile.php?id=100040795912735"}><i className=" fa-brands fa-facebook"></i></a>
                                </div>
                            
                                <div className="Footer-contact-icons-item">
                                
                                    <a target="_blank" href={"mailto:mahmoudelsaid560@gmail.com"}><i className="fa-solid fa-envelope"></i></a>

                                </div>

                                <div className="Footer-contact-icons-item">
                                
                                    <a target="_blank" href={"https://github.com/Mahmoud-Elsaid"}><i className="fa-brands fa-github"></i></a>

                                </div>

                                <div className="Footer-contact-icons-item">
                                    <a target="_blank" href={"https://www.linkedin.com/in/mahmoud-elsaid-a55a29239/"}><i className="fa-brands fa-linkedin"></i></a>
                                
                                </div>
                            
                        </div>
                </div>
                

                <div className=" w-100 m-auto text-center">
                <h5 className=" mt-3">© Copyright <span className=" text-main">Market</span>. All Rights Reserved</h5>
                </div>
            </div>
        </>
  )
}
