import React, { useContext, useState } from 'react'
import './Login.module.css'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext'

export default function Login() {
  const { setUserToken, setUserData } = useContext(userContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function submitLogin(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);

      if (data.message === 'success') {
        localStorage.setItem("Token", data.token);
        const user = data.user
        localStorage.setItem('userData', JSON.stringify(user));
        setUserToken(data.token);
        setUserData(data.user);
        navigate('/home');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = yup.object({
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}/, "Password must start with uppercase and contain 5-10 letters/numbers"),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: submitLogin
  });

  return (
    <div className='w-75 m-auto my-5'>
      <h2 className='mb-4'>Login Now....</h2>

      <form onSubmit={formik.handleSubmit}>
        {errorMessage && (
          <div className="mt-2 mb-3 text-danger">
            <h5><i className="fa-solid fa-triangle-exclamation"></i> {errorMessage}</h5>
          </div>
        )}

        <div className='my-2'>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            className='form-control p-2'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="mt-2 mb-3 text-danger">
              <h5><i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.email}</h5>
            </div>
          )}
        </div>

        <div className='my-2'>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            className='form-control p-2'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="mt-2 mb-3 text-danger">
              <h5><i className="fa-solid fa-triangle-exclamation"></i> {formik.errors.password}</h5>
            </div>
          )}
        </div>

        <button
          type="submit"
          className='btn bg-main'
          disabled={!formik.isValid || !formik.dirty || isLoading}
        >
          {isLoading ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Login'}
        </button>
      </form>
    </div>
  );
}
