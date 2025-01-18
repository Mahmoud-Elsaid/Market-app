import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
export default function Register() {

    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false)
    async function submitDat (values){
        setLoading(true)
        try
        {
        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" ,values)
            if(data.message =="success")
                {
                    console.log("hello login")
                    setLoading(false)
                    navigate("/login");
                }
            else
                {
                    console.log( "not 200", data.message)
                    setLoading(false)
                }
        }
        catch(error)
            {
                setErrorMessage(error.response.data.message);
                setLoading(false)
                console.log("set error message" , error.response.data.message)
            }
            };
    let validationSchema = yup.object({
            name:yup.string().required("name is required").min(2).max(12),
            phone:yup.string().required('Phone number is required').matches(/^(\+20|0)(10|11|12|15)\d{8}$/,'Invalid Egyptian phone number format'),
            email:yup.string().email("email is required").required("email is required"),
            password:yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}/ , "password must begin with uppercase character and followed with at least 5 characters or number"),
            rePassword:yup.string().required("rePassword is required").oneOf([yup.ref("password") ] , "password and repassword isn't matching")
    })
    
    
    let formik = useFormik({
        initialValues:{
            name:"",
            phone:"",
            email:"",
            password:"",
            rePassword:""
        }, validationSchema,
        onSubmit:submitDat ,
    })
    return (
        <>
            <div className=" w-75 mx-auto mt-5">
                <h1 className=" mb-4">register now...</h1>
                <form onSubmit={formik.handleSubmit}>
                    {errorMessage !== null ? <div className="alert alert-danger p-2">{errorMessage}</div> : ""}
                    <div className=" input-info my-2">
                        <label htmlFor="name">Name</label>
                        <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className=" form-control mt-2 p-2" name="name" id="name" />
                        {formik.errors.name &&formik.touched.name ? <div className=" mb-2 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.name}</h5></div> :""}
                    </div>

                    <div className=" input-info my-2">
                        <label htmlFor="phone">phone</label>
                        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className=" form-control mt-2 p-2" name="phone" id="phone" />
                        {formik.errors.phone &&formik.touched.phone ? <div className=" mb-2 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.phone}</h5></div> :""}
                    </div>

                    <div className=" input-info my-2">
                        <label htmlFor="email">email</label>
                        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className=" form-control mt-2 p-2" name="email" id="email" />
                        {formik.errors.email &&formik.touched.email ? <div className=" mb-2 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.email}</h5></div> :""}
                    </div>

                    <div className=" input-info my-2">
                        <label htmlFor="password">password</label>
                        <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className=" form-control mt-2 p-2" name="password" id="password" />
                        {formik.errors.password &&formik.touched.password ? <div className=" mb-2 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.password}</h5></div> :""}
                    </div>

                    <div className=" input-info my-2">
                        <label htmlFor="rePassword">rePassword</label>
                        <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className=" form-control mt-2 p-2" name="rePassword" id="rePassword" />
                        {formik.errors.rePassword &&formik.touched.rePassword ? <div className=" mb-2 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.rePassword}</h5></div> :""}
                    </div>

                    {loading == false ?<button disabled={!formik.isValid || formik.isSubmitting} type="submit" className=" btn bg-main p-2 mt-2">submit</button> :<button type='button' className='btn bg-main text-white'><i className='fa-solid fa-spinner fa-spin'></i></button> }
                </form>
            </div>
        </>
    )
}
