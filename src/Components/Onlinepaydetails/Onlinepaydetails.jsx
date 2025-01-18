import { useFormik } from "formik"
import { useContext, useState } from "react";
import * as yup from "yup"
import { CartContext } from "../../Contexst/Addtocartcontext";




export default function Onlinepaydetails() {
    let {onlinePayment , cartId} = useContext(CartContext)
    
    async function submitDetails(values){
        let response = await onlinePayment(cartId , values  , 'http://localhost:5173');
        console.log("details submit" , response)
        window.location.href = response.data.session.url
        console.log("details submit" , response)
    }

        // const [errorMessage, setErrorMessage] = useState(null);
    



    let validationSchema = yup.object({
                details:yup.string().required("name is required").min(2).max(12),
                phone:yup.string().required('Phone number is required').matches(/^(\+20|0)(10|11|12|15)\d{8}$/,'Invalid Egyptian phone number format'),
                city:yup.string().required("city name is required").min(2).max(20),
        })

    let formik = useFormik({
        initialValues:{
            details:"",
            phone:"",
            city:""
        }
        ,validationSchema,
        onSubmit:submitDetails
    })
  
    return (
        <div className=" w-75 mx-auto mt-5">
            
            <form className=" py-5 mt-5" onSubmit={formik.handleSubmit}>
                    <h2 className=" text-main pt-5 pb-3 mt-5"> Enter this information to payment online</h2>

                    {/* {errorMessage !== null ? <div className="alert alert-danger p-2">{errorMessage}</div> : ""} */}
                    <div className=" input-info my-2">
                        <label htmlFor="name">Name</label>
                        <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className=" form-control mt-2 p-2" name="details" id="name" />
                        {formik.errors.details &&formik.touched.details ? <div className=" mb-2 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.name}</h5></div> :""}
                    </div>


                    <div className=" input-info my-2">
                        <label htmlFor="phone">Phone</label>
                        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className=" form-control mt-2 p-2" name="phone" id="phone" />
                        {formik.errors.phone &&formik.touched.phone ? <div className=" mb-2 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.phone}</h5></div> :""}
                    </div>


                    <div className=" input-info my-2">
                        <label htmlFor="city">City</label>
                        <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className=" form-control mt-2 p-2" name="city" id="city" />
                        {formik.errors.city &&formik.touched.city ? <div className=" mb-2 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.city}</h5></div> :""}
                    </div>

                    <button type="submit" className=" btn bg-main my-4 text-white px-4 py-2">Subnit</button>

            </form>
        </div>
    )
}
