import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../../CustomHook/useToken';
import auth from '../../../firebase.init';
import Loading from '../../Loading/Loading';



const SocialLogin = () => {
    const navigate = useNavigate()
    //for google sign in purpose
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [token, setToken] = useToken(user);

    //user login kora na tahley to login page a niye jabey plus user login korar por shei user k jei page thekey login ar jnno ashsey shei page a niye jabey
    const location=useLocation()
    let from = location.state?.from?.pathname || "/";  

    if(loading){
        return <Loading></Loading>
    }
    
    let errorElement;
    if (error) {
        errorElement = <div>
            <p style={{color:'red',textAlign:'center',fontFamily:'monospace'}}>Error: {error?.message}</p>
        </div>
    }

    
    //accesstoken backend thekey pailey e navigate kora holo//
    if(token){
        navigate(from, { replace: true });
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ border: '1px solid lightblue', width: '400px', height: '1px' }}></div>
                <p style={{ margin: '0 10px', fontFamily: 'sans-serif',fontSize:'14px'}}>OR</p>
                <div style={{ border: '1px solid lightblue', width: '400px', height: '1px' }}></div>
            </div>
            {errorElement}
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,marginTop:'55px' }}>
                <button style={{ borderRadius: '5px', border: '3px solid gray', padding: '5px', marginBottom: '10px', width: '250px',display:'flex' ,justifyContent:'center',alignItems:'center' }} onClick={() => signInWithGoogle()}>
                    <img style={{ width: '25%', }} src='https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1' alt="" />
                    <span style={{ textAlign: 'center' }}>Sign in with Google</span>
                </button>
            </div>    
        </div>
    );
};

export default SocialLogin;