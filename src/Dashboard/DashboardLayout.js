import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAuthorization from "../hooks/useAuthorization/useAuthorization";
import { AuthContext } from '../contexts/AuthProvider';
import Loading from '../component/Loading/Loading';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAuthorized, isUserLoading] = useAuthorization(user?.email);
    // console.log(user?.email)
    if (isUserLoading) {
        return <Loading />
    }
    // 
    return (
        <div>
            {/* <Navbar /> */}
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>

                <div className='drawer-side'>
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                    <div className="flex flex-col rounded-xl w-64 h-3/4 px-4 py-8 bg-white">



                        <div className="flex flex-col items-center mt-6 -mx-2">

                            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user.displayName}</h4>
                            <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>

                        <div className="flex flex-col justify-between flex-1 mt-6">

                            <div>
                                {/* For Buyer Dashboard*/}
                                {
                                    isAuthorized === "buyer" && <Link to={"/dashboard/myOrder"} className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200 mt-3" >


                                        <span className="mx-4 font-medium">My Order</span>
                                    </Link>
                                }
                                {/* For Seller Dashboard */}
                                {
                                    isAuthorized === "seller" && <>
                                        <Link to={"/dashboard/addProduct"} className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200 mt-3" >


                                            <span className="mx-4 font-medium">Add Product</span>
                                        </Link>

                                        <Link to={"/dashboard/myProduct"} className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200 mt-3" >


                                            <span className="mx-4 font-medium">My Product</span>
                                        </Link>
                                    </>
                                }


                                {/* For Admin Dashboard */}
                                {
                                    isAuthorized === "admin" && <>
                                        <Link to={"/dashboard/allSeller"} className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200 mt-3" >


                                            <span className="mx-4 font-medium">All Seller</span>
                                        </Link>

                                        <Link to={"/dashboard/allBuyer"} className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200 mt-3" >

                                            <span className="mx-4 font-medium">All Buyers</span>
                                        </Link>

                                    </>
                                }
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;