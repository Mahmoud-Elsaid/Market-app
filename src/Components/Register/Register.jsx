

import React, { useState } from 'react'
import './Register.module.css'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'

export default function Register() {

  let navigate = useNavigate();
  const [ErrorMessage , setErrorMessage ] = useState('');
  const [IsLoading, setIsLoading] = useState(false);

  async function submitRegister(values){
    try
    {
      setIsLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' ,values)
      if(data.message === 'success')
      {
          setIsLoading(false)
          console.log('hello login');
          navigate('/home')
      }

      else
      {
        setIsLoading(false)
        console.log( 'else error message' , data.message)
        setErrorMessage(data.message);
      }
    }
    
    catch(error)
    {
        setErrorMessage(error.response.data.message);
        setIsLoading(false)
    }
  }

  let validationSchema = yup.object({
    name:yup.string('name should be string').required("name is required").min(2 , "min length is 2 characters").max(10 , 'max length is 10 characters'),
            phone:yup.string().required('Phone number is required').matches(/^(\+20|0)(10|11|12|15)\d{8}$/,'Invalid Egyptian phone number format'),
            email:yup.string().email("email is required").required("email is required"),
            password:yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}/ , "password must begin with uppercase character and followed with at least 5 characters or number"),
            rePassword:yup.string().required("rePassword is required").oneOf([yup.ref("password") ] , "password and repassword isn't matching")
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:''
    }
    ,validationSchema
    , onSubmit:submitRegister
  })

  return (
    <>
        <div className=' w-50 m-auto my-5 bg-main p-5'>
            <h2 className=' mb-4 text-white'>Register Now....</h2>

            <form onSubmit={formik.handleSubmit}>
                {ErrorMessage ? <div className=" mt-2 mb-3 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {ErrorMessage}</h5></div> : ''}
                <div className=' my-2 '>
                    <label htmlFor="name">Name</label>
                    <input id='name' onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} type="text" name='name' className=' form-control p-2' />
                    {formik.errors.name && formik.touched.name ?<div className=" mt-2 mb-3 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.name}</h5></div> :""}
                </div>

                <div className=' my-2 '>
                    <label htmlFor="email">Email</label>
                    <input id='email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" name='email' className=' form-control p-2' />
                    {formik.errors.email && formik.touched.email ?<div className=" mt-2 mb-3 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.email}</h5></div> :""}

                </div>

                <div className=' my-2 '>
                    <label htmlFor="name">Phone</label>
                    <input id='phone' onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} type="tel" name='phone' className=' form-control p-2' />
                    {formik.errors.phone && formik.touched.phone ?<div className=" mt-2 mb-3 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.phone}</h5></div> :""}

                </div>

                <div className=' my-2 '>
                    <label htmlFor="password">Password</label>
                    <input id='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" name='password' className=' form-control p-2' />
                    {formik.errors.password && formik.touched.password ?<div className="mt-2 mb-3 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.password}</h5></div> :""}

                </div>

                <div className=' my-2 '>
                    <label  htmlFor="rePassword">Repassword</label>
                    <input id='rePassword' onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} type="password" name='rePassword' className=' form-control p-2' />
                    {formik.errors.rePassword && formik.touched.rePassword ?<div className=" mt-2 mb-3 text-danger"><h5> <i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.rePassword}</h5></div> :""}

                </div>
                <button disabled={!formik.isValid || formik.isSubmitting} type='submit' className=' btn bg-main'>{IsLoading ? <i className='fa-solid fa-spinner fa-spin'></i> :'submit'}</button>
            </form>
        </div>
    </>
  )
}
