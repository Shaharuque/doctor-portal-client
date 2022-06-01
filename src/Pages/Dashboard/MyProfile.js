import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { MdOutlineMail } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";

const MyProfile = () => {
    const [user]=useAuthState(auth)
    console.log(user)
    return (
        <div className='p-4'>
            <div className='flex flex-col items-end'>
                <h1 className='font-bold text-gray-500 flex items-center'>Your Name<FaUserAstronaut/>: {user?.displayName}</h1>
                <h1 className=' text-lime-500 font-mono flex items-center'>Email<MdOutlineMail/>: {user?.email}</h1>
            </div>
            <div className='flex flex-col items-center mt-8'>
                <div>
                    <h1 className='text-teal-600 font-bold text-2xl'>Want to update your profile! put your informations down there.</h1>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
};

export default MyProfile;