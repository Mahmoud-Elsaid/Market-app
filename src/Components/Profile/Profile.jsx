




import { NavLink, Outlet } from 'react-router-dom';

export default function Profile() {



    return (
        <div className=' vh-100 py-5'>
            
            <div className=' container  my-5'>
                <div className=' row'>
                    <div className=' col-lg-4'>
                        <nav>
                            <NavLink className={`nav-link my-3 active fw-bold`} to={`profileDetails`}> <h3 className=' text-main'>Profile</h3> </NavLink>
                            <NavLink className={`nav-link my-3 fw-bold`} to={`/allorders`}><h3>Your Orders</h3> </NavLink>
                        </nav>
                    </div>

                    <div className=' col-lg-8'>
                        <Outlet/>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}
