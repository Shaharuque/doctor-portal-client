import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init'
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../../Loading/Loading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToken from '../../../CustomHook/useToken';
import SocialLogin from '../SocialLogin/SocialLogin';
import { AiFillFire } from 'react-icons/ai'

// import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const [agree, setAgree] = useState(false)
    const navigate = useNavigate()
    //for updating user profile
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    //updating urer profile
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    //useToken hook use kora holo//
    const [token, setToken] = useToken(user)  //parameter hisabey user k pathano hoisey

    const submitHandler = async (e) => {
        e.preventDefault()
        const userName = e.target.name.value
        const userEmail = e.target.email.value
        const userPassword = e.target.password.value

        await createUserWithEmailAndPassword(userEmail, userPassword)
        await updateProfile({ displayName: userName });  //user reg korar por e tar displayName property userName diye update hoa jabey
    }
    //console.log(user)

    //server side thekey client side a accessToken provide korlei navigate kora hobey//
    if (token) {
        navigate('/')
    }

    let registerError;
    if (error || updateError) {
        registerError = <p className='text-red-500 font-bold'><small>{error?.message} || {updateError?.message}</small></p>

    }

    if (loading || updating) {
        return <Loading></Loading>
    }
    return (
        <div className='mt-20'>
            <div>
                <div data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000">
                    <h3 style={{ color: 'lightBlue', marginTop: '20px',marginBottom:'20px' ,fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center' }}>Register To, Get Started With Us Today<AiFillFire /></h3>
                </div>
                
                <Form className="grid grid-cols-1 gap-6 justify-items-center mt-12" onSubmit={submitHandler}>

                    <input
                        type="text"
                        name='name'
                        placeholder="Enter Name"
                        class="input input-bordered input-info w-full max-w-xs"
                        required
                    />

                    <input
                        type="email"
                        name='email'
                        placeholder="Enter Email"
                        class="input input-bordered input-info w-full max-w-xs"
                        required
                    />

                    <input
                        type="password"
                        name='password'
                        placeholder="Enter Password"
                        class="input input-bordered input-info w-full max-w-xs"
                        required
                    />
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    {/* error show ar jnno toast use korsi aikhaney */}
                    {registerError}
                </Form>
                <div className='grid grid-cols-1 gap-6 justify-items-center'>
                    <p style={{ marginTop: '10px' }}>Already registed? <Link to='/login' style={{ color: 'lightgreen', fontWeight: '600' }}>Login</Link></p>
                </div>
            </div>
            <div className='grid grid-cols-1 justify-items-center'>
                <SocialLogin></SocialLogin>
            </div>


        </div>
    );
};

export default Register;