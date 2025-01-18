// import "./Mainslider.module.css";
import style from "./Mainslider.module.css";
import img1 from '../../images/lust header.png'
import img2 from '../../images/logo-leaf-new.png'
import { Link } from "react-router-dom";


export default function Mainslider() {
    return (
        <div className=' my-5 pb-5  container-fluid pt-5  header  px-5'>
            <div className=' row  px-5'>
                <div className='  pt-5 d-flex justify-content-center align-items-center col-md-6 header-img'>
                    <img src={img1} className=' w-100' alt="" />
                </div>
                <div className={`${style.headercontent}  col-md-6 headercontent d-flex justify-content-center align-items-center ps-5 mb-5  `}>
                    <div className=' pb-5 header-content-item'>
                        <img className=' my-3' src={img2} alt="" />
                        <h5 className={`${style.h5Style} my-3`} >Best Quality Products</h5>
                        <h1 className={`${style.h1Style} my-3`} >Join The Organic Movement!</h1>
                        <p className='my-3 text-muted lead'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        <button className= {`${style.bgMain} btn text-white  py-3 px-5 `}><Link className={`text-white ${style.dicorationNon}`}  to="/products"><i className="me-2 fa-solid fa-cart-shopping"></i> SHOP NOW</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
