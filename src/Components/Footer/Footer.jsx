

import style from "./Footer.module.css"
import footerLogo from "../../images/organic-store-white-logo.png"
import { Link } from "react-router-dom"
export default function Footer() {
    return (
        <>
            <div className=" row p-5 bg-dark text-white">
                <div className=" col-md-4">
                    <div className=" footerLogo p-4">
                        <img src={footerLogo}  alt="" />

                        
                    </div>
                </div>

                <div className=" col-md-4">
                    <h2>sections</h2>
                    <ul>
                    <li className=" m-3">Home</li>
                    <li className=" m-3">Products</li>
                    <li className=" m-3">Category</li>
                    <li className=" m-3">Brands</li>
                    <li className=" m-3">Cart</li>
                    </ul>
                </div>

                <div className=" col-md-4">
                    <h3>Contact us</h3>
                    <ul>
                    <li className=" m-3  fw-bold"> <i className="fa-solid fa-mobile-screen me-1"></i>Phone <span className=" text-main ">:01032578410 </span> </li>
                    <li className=" m-3  fw-bold"> <i className="fa-solid fa-mobile-screen me-1"></i>Phone <span className="text-main ">:01221399966 </span> </li>
                    <li className=" m-3  fw-bold"> <i className="fa-brands fa-google"></i> Email <Link target="_blank" to={"mailto:mahmoudelsaid560@gmil.com"} className=" text-main">Email.MahmoudElsaied</Link> </li>
                    <li className=" m-3  fw-bold"> <i className="fa-solid fa-mobile-screen me-1"></i>LinkedIn <Link target="_blank" to={"https://www.linkedin.com/feed/"} className=" text-main">Linkedin.MahmoudElsaied</Link> </li>
                    <li className=" m-3  fw-bold"> <i className="fa-solid fa-mobile-screen me-1"></i>GitHub <Link target="_blank" to={"https://www.linkedin.com/feed/"}className=" text-main">Github.MahmoudElsaied </Link> </li>
                    
                    </ul>

                </div>

                <div className=" w-50 m-auto text-center">
                <h5 className=" mt-3">© Copyright <span className=" text-main">Market</span>. All Rights Reserved</h5>
                </div>
            </div>
        </>
  )
}
