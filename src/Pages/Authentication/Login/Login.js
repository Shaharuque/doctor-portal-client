import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
// import SocialLogin from '../SocialLogin/SocialLogin';
// import Loading from '../../Shared/Loading/Loading';
//for tostify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../Loading/Loading";
import auth from "../../../firebase.init";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  //useSignInWithEmailandPassword react-firebase-hook
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  //reset password ar jnno useSendPasswordResetEmail react-firebase-hook use kora holo
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //input field thekey data collect korar 2nd way (input field thekey data collect kora 1st way holo useState use kora)
    const userEmail = emailRef.current.value; //returns the input field value(user email)
    const userPassword = passwordRef.current.value; //returns the input field value (user password)
    console.log(userEmail, userPassword);
    await signInWithEmailAndPassword(userEmail, userPassword);
  };

  if (loading || sending) {
    return <Loading></Loading>;
  }
  if(user){
      navigate('/')
  }

  //Error massege show
  let errorElement;
  if (error) {
    errorElement = (
      <div>
        <p
          style={{ color: "red", textAlign: "center", fontFamily: "monospace" }}
        >
          Error: {error?.message}{" "}
        </p>
      </div>
    );
  }

  //password reset link
  const resetPassword = async () => {
    const userEmail = emailRef.current.value; //returns the input field value(user email)
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
      <Form
        className="grid grid-cols-1 gap-6 justify-items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          ref={emailRef}
          placeholder="Enter email"
          class="input input-bordered input-info w-full max-w-xs"
          required
        />

        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          class="input input-bordered input-info w-full max-w-xs"
          required
        />
        <Button
          style={{
            color: "white",
            backgroundColor: "teal",
            border: "1px solid lightgreen",
          }}
          type="submit"
        >
          Login
        </Button>
        {/* showing error */}
        {errorElement}
      </Form>

      <div className="grid grid-cols-1 justify-items-center">
        <p style={{ marginTop: "10px" }}>
          New to Doctor's Portal?{" "}
          <span
            onClick={nevigateToRegister}
            style={{ color: "red", cursor: "pointer" }}
          >
            register now
          </span>
        </p>
        <p style={{ marginTop: "10px" }}>
          Forget password?{" "}
          <span
            onClick={resetPassword}
            style={{ color: "teal", cursor: "pointer" }}
          >
            Reset password
          </span>
        </p>

        {/* <SocialLogin></SocialLogin> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
