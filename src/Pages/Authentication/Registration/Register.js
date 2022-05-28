import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init'
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../../Loading/Loading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const [agree,setAgree]=useState(false)
    const navigate=useNavigate()
    //for updating user profile
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
      //updating urer profile
      const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const submitHandler=async(e)=>{
        e.preventDefault()
        const userName=e.target.name.value
        const userEmail=e.target.email.value
        const userPassword=e.target.password.value
        const userAdress=e.target.adress.value

        await createUserWithEmailAndPassword(userEmail, userPassword)
        await updateProfile({ displayName:userName });  //user reg korar por e tar display name property update hoa jabey
    }  
    //console.log(user)

    if(user){
        navigate('/')
    }

    let registerError;
    if (error || updateError) {
        registerError = <p className='text-red-500 font-bold'><small>{error?.message} || {updateError?.message}</small></p>
        
    }

    if(loading || updating){
        return <Loading></Loading>
    }
    return (
        <div>
            <div className='container w-50 mx-auto'>
                <h3 style={{ color: 'lightBlue', textAlign: 'center', marginTop: '50px' }}>Register page</h3>
                <Form  className="grid grid-cols-1 gap-6 justify-items-center" onSubmit={submitHandler}>

                    <input
                    type="text"
                    name='name'
                    placeholder="Enter Name"
                    class="input input-bordered input-info w-full max-w-xs"
                    required
                    />

                    <input
                    type="text"
                    name='adress' 
                    placeholder="Enter Adress"
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
                    <p style={{ marginTop: '10px' }}>Already registed? <Link to='/login' style={{ color: 'teal', fontWeight: '600' }}>login</Link></p>
                </div>
            </div>
            {/* <SocialLogin></SocialLogin> */}
            
        </div>
    );
};

export default Register;