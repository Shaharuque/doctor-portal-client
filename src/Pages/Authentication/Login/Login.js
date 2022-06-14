//React form hook use kora hoisey
import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
// import SocialLogin from '../SocialLogin/SocialLogin';
//for tostify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../Loading/Loading";
import auth from "../../../firebase.init";
//for react hook form
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useToken from "../../../CustomHook/useToken";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [formData, setFormData] = useState();
  //for react hook form purpose
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //useSignInWithEmailandPassword react-firebase-hook
  const [signInWithEmailAndPassword, user, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);
  //reset password ar jnno useSendPasswordResetEmail react-firebase-hook use kora holo
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  //useToken hook use kora holo//
  const [token, setToken] = useToken(user);
  

  //user login kora na tahley to login page a niye jabey plus user login korar por shei user k jei page thekey login ar jnno ashsey shei page a niye jabey
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   //input field thekey data collect korar 2nd way (input field thekey data collect kora 1st way holo useState use kora)
  //   const userEmail = emailRef.current.value; //returns the input field value(user email)
  //   const userPassword = passwordRef.current.value; //returns the input field value (user password)
  //   console.log(userEmail, userPassword);
  //   await signInWithEmailAndPassword(userEmail, userPassword);
  // };

  // react hook form ar submit handler
  const onSubmit =async (data) => {
    setFormData(data);
    await signInWithEmailAndPassword(data.email, data.password);
  };
  console.log(formData);
  //loading spinner from daisy UI
  if (loading || sending) {
    return <Loading></Loading>;
  }

  //login korar por user k jei page thekey login ar jnno ashsey shei page a niye jabey
  // if (user) {
  //   navigate(from, { replace: true });
  // }
   //server side thekey client side a accessToken provide korlei navigate kora hobey//
   if(token){
    navigate(from, { replace: true })
  }

  //console.log(user);
  //Error massege show
  let errorElement;
  if (firebaseError) {
    errorElement = (
      <div>
        <p
          style={{ color: "red", textAlign: "center", fontFamily: "monospace" }}
        >
          Error: {firebaseError?.message}{" "}
        </p>
      </div>
    );
  }

  //password reset link(react form hook use korar jnno kaj kortesey kichota onno bhabey like email and password dewar por reset password a click korley reset mail jassey email a )
  const resetPassword = async () => {
    const userEmail = formData.email; //user email from firebase reack hook thkeye jei 'user' paisi tar thekey
    console.log(userEmail);
    if (userEmail) {
      await sendPasswordResetEmail(userEmail);
      toast("password reset link sent into your mail adress");
    } else {
      toast("Provide valid email please");
    }
  };

  const nevigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container w-50 mx-auto">
      <h3 style={{ color: "teal", textAlign: "center", margin: "50px 0" }}>
        Login page
      </h3>

      {/* React hook form use kora hoisey */}
      <form className="grid grid-cols-1 justify-items-center" onSubmit={handleSubmit(onSubmit)}>
        {/* inpur field ar design daisy UI thekey newa(Text Input) */}

        {/* email field validation and error handling */}
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">What is your name?</span>
          </label>
          <input
            type="email"
            placeholder="Your Email"
            class="input input-bordered w-full max-w-xs"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              // email pattern need to be followed cuz it will checked (validation)
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,     
                message: "Provide a valid Email",
              },
            })}
          />
          <label class="label">
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        {/* password field validation and error handling */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            {...register("password", {
              required: {
                value: true,
                message: "Password is Required",
              },
              minLength: {
                value: 6,
                message: "Must be 6 characters or longer",
              },
            })}
          />
          <label className="label">
            {errors.password?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>
        </div>
        <input className='btn w-full max-w-xs text-white bg-teal-800' type="submit" value="Login" />
      </form>
      {/* password or email match na korley firebase error show korabo */}
      {errorElement}
      {/* ---------------------------------------- */}
      <div className="grid grid-cols-1 justify-items-center">
        <p style={{ marginTop: "10px" }}>
          New to Doctor's Chamber App?{" "}
          <span
            onClick={nevigateToRegister}
            style={{ color: "lightgreen", cursor: "pointer",fontWeight:'bold' }}
          >
            REGISTER NOW
          </span>
        </p>
        <p style={{ marginTop: "10px" }}>
          Forget password?{" "}
          <span
            onClick={resetPassword}
            style={{ color: "teal", cursor: "pointer" ,fontWeight: "bold"}}
          >
            RESET PASSWORD
          </span>
        </p>

        <SocialLogin></SocialLogin>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
