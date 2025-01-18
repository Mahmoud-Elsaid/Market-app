
import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import { UserContext } from "../../Contexst/UserContext";
import { Grid } from "react-loader-spinner";
export default function Login() {
    
    
    let {setToken} = useContext(UserContext);
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false)
    async function submitDat (values){
        setLoading(true)
        try
        {
        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" ,values)
            if(data.message =="success")
                {
                    console.log("hello home")
                    setLoading(false);
                    localStorage.setItem("token" , data.token);
                    setToken(localStorage.getItem("token"));

                    navigate("/home");
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
            
            email:yup.string().email("email is required").required("email is required"),
            password:yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}/ , "password must begin with uppercase character and followed with at least 5 characters or number"),
    })
    
    
    let formik = useFormik({
        initialValues:{
            
            email:"",
            password:"",
        
        }, validationSchema,
        onSubmit:submitDat ,
    })
    return (
        <>
            <div className=" w-75 mx-auto mt-5">
                <h1 className=" mb-4">Login now...</h1>
                <form onSubmit={formik.handleSubmit}>
                    {errorMessage !== null ? <div className="alert alert-danger p-2">{errorMessage}</div> : ""}
                    

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

                    

                    {loading == false ?<button disabled={!formik.isValid || formik.isSubmitting} type="submit" className=" btn bg-main p-2 mt-2">submit</button> :<button type='button' >
                    <Grid
  visible={true}
  height="40"
  width="40"
  color="#4fa94d"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  />  
                                    </button> }
                </form>
            </div>
        </>
    )
}

