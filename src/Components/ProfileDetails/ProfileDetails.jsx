import React from 'react';
import style from './ProfileDetails.module.css';

export default function ProfileDetails() {
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log( "mahmosd" , user)


  return (
    <div className={`${style.profileItem} w-75 p-5`}>
      <div className={`ms-5 w-75 m-auto text-center ${style.profileHeader}`}>
        <i className="fa-solid fa-address-card"></i>
        <h2 className='text-main fw-bold my-4'>Simple profile</h2>
        <hr className="fw-bold text-main my-5" />
      </div>

      <div className='ms-5 w-75 m-auto'>
        {user ? (
          <div>
            <h3 className='fw-bold'>Name: <span className='text-main'>{user.name}</span></h3>
            <h3 className='fw-bold my-4'>Email: <span className='text-main'>{user.email}</span></h3>
            <h3 className='fw-bold'>Role: <span className='text-main'>{user.role}</span></h3>
          </div>
        ) : (
          <div className='ms-5 w-75 m-auto text-center'>
            <h2>Please login again</h2>
          </div>
        )}
      </div>
    </div>
  );
}
