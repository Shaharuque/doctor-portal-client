import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init'
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from 'react-firebase-hooks/auth';
import Loading from '../../Loading/Loading';

// import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const [agree,setAgree]=useState(false)
    const navigate=useNavigate()

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
   

    const submitHandler=async(e)=>{
        e.preventDefault()
        const userName=e.target.name.value
        const userEmail=e.target.email.value
        const userPassword=e.target.password.value
        const userAdress=e.target.adress.value

        await createUserWithEmailAndPassword(userEmail, userPassword)
    }  

    if(user){
        navigate('/')
    }

    if(loading){
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
                    
                    <div>
                    <input onClick={()=>setAgree(!agree)} style={{marginRight:'3px',marginBottom:'20px'}} type="checkbox" name="terms" id="" />
                    {/*css styling a conditional rendering ar use */}
                    <label style={agree ?{fontWeight:'bold',color:'teal'} : {fontWeight:'bold',color:'lightblue'}} htmlFor="term&condition">Terms&conditions</label>
                    </div>
                    
                    <Button variant="primary" type="submit" disabled={!agree}>
                        Register
                    </Button>
                    <p style={{color:'red'}}>{error?.message}</p>
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