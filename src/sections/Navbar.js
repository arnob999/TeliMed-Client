import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
const Navbar = () => {
    const [sticky, setSticky] = useState(false);

    const { user, logOut } = useContext(AuthContext)

    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate("/")
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    });

    return (
        <nav className={`${sticky ? "sticky" : ""}`}>

            <div className='  flex justify-between '>
                {/* Logo Section */}
                <div>
                    <p className='text-6xl font-bold text-green-500 '>Teli<span className=' text-orange-500'>MED</span></p>
                </div>
                {/* Navigation */}
                <div className=' flex space-x-3'>
                    <div className='text-3xl hover:bg-lime-400  text-orange-500   rounded-md p-2'>
                        <Link to="/" >Home</Link>
                    </div>
                    <div className='text-3xl hover:bg-lime-400  text-orange-500 rounded-md p-2'>
                        <Link to="/services">Products</Link>
                    </div>
                    {/* <div className='text-3xl hover:bg-lime-400  text-orange-500 rounded-md p-2'>
                        <Link to="/manage">Manage</Link>
                    </div> */}


                    {user?.uid ?
                        <>
                            <div className='text-3xl hover:bg-lime-400  text-orange-500 rounded-md p-2'>
                                <Link to="/dashboard">Dashboard</Link>
                            </div>

                            <div className='text-3xl hover:bg-lime-400  text-orange-500 rounded-md p-2'>
                                <button onClick={handleLogOut}>Sign out</button>
                            </div>
                        </>
                        :
                        <>
                            <div className='text-3xl hover:bg-lime-400  text-orange-500 rounded-md p-2'>
                                <Link to="/login">Login</Link>
                            </div>
                            <div className='text-3xl hover:bg-lime-400  text-orange-500 rounded-md p-2'>
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        </>
                    }

                    {/* <div className='text-3xl hover:bg-lime-400  text-orange-500 rounded-md p-2'>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className='text-3xl hover:bg-lime-400  text-orange-500 rounded-md p-2'>
                    <Link to="/banner">Banner</Link>
                </div>
                <div className='text-3xl hover:bg-lime-400  text-orange-500 rounded-md p-2'>
                    <Link to="/review">Review</Link>
                </div>
                <div className='text-3xl hover:bg-lime-400  text-orange-500 rounded-md p-2'>
                    <Link to="/footer">About Us</Link>
                </div> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;