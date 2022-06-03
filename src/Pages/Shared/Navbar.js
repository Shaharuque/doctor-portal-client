import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init'
import Loading from "../Loading/Loading"

const Navbar = () => {
    const [user,loading,error]=useAuthState(auth)
    const navigate=useNavigate()
    //console.log(user)

    if(loading){
        return <Loading></Loading>
    }

    //handle logout
    const signOutHandle=()=>{
        signOut(auth);
        localStorage.removeItem('token') //logout ar sathey sathey access token removed
        navigate('/login')
    }
    // const menuItems = <>
    //     <li><Link to="/">Home</Link></li>
    //     <li><Link to="/appointment">Appointment</Link></li>
    //     <li><Link to="/review">Review</Link></li>
    //     <li><Link to="/contact">Contact</Link></li>
    //     <li><Link to="/about">About</Link></li>
    //     <li><Link to="/login">Login</Link></li>
    // </>
    return (
        <div className="navbar bg-black rounded text-white font-bold">
            {/* mobile device a dekhabey */}
            <div className="navbar-start ">
                <div className="dropdown ">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-black ">
                        <li className='hover:bg-yellow-500 rounded-lg'><Link to="/">Home</Link></li>
                        <li className='hover:bg-yellow-500 rounded-lg'><Link to="/appointment">Appointment</Link></li>
                        <li className='hover:bg-yellow-500 rounded-lg'><Link to="/review">Review</Link></li>
                        <li className='hover:bg-yellow-500 rounded-lg'><Link to="/contact">Contact</Link></li>
                        <li className='hover:bg-yellow-500 rounded-lg'><Link to="/about">About</Link></li>
                        {/* user logged in kora thaklei dashboard ta dekhabo */}
                        {
                            user&& <li className='hover:bg-yellow-500 rounded-lg'><Link to="/dashboard">Dashboard</Link></li>
                        }
                        {
                            user? <button onClick={signOutHandle} style={{color:"yellow"}}>Sign-out<sup>{user?.displayName}</sup></button>
                            :
                            <li className='hover:bg-yellow-500 rounded-lg'><Link to="/login">Login</Link></li>
                        }
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl font-serif lg:text-center hover:bg-yellow-400">Doctors-Chamber <img style={{width:'40px'}} src='https://freesvg.org/img/1533845191.png'/></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 ">
                    <li className='hover:bg-yellow-500 rounded-lg'><Link to="/">Home</Link></li>
                    <li className='hover:bg-yellow-500 rounded-lg'><Link to="/appointment">Appointment</Link></li>
                    <li className='hover:bg-yellow-500 rounded-lg'><Link to="/review">Review</Link></li>
                    <li className='hover:bg-yellow-500 rounded-lg'><Link to="/contact">Contact</Link></li>
                    <li className='hover:bg-yellow-500 rounded-lg'><Link to="/about">About</Link></li>
                    {/* user logged in kora thaklei dashboard ta dekhabo */}
                    {
                        user&& <li className='hover:bg-yellow-500 rounded-lg'><Link to="/dashboard">Dashboard</Link></li>
                    }
                    {
                        user? <button onClick={signOutHandle} className='text-yellow-500 hover:bg-red-500 hover:text-white hover:p-2 rounded-lg'>Sign-out<sup>{user?.displayName}</sup></button>
                        :
                        <li className='hover:bg-red-700 rounded-lg'><Link to="/login">Login</Link></li>
                    }
                    
                </ul>
            </div>
            {/* mobile device a side bar open ar jnno ekta icon dekhabo */}
          
        </div>
    );
};

export default Navbar;