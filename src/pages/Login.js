import axios from "axios";
// import { useRef, useState } from "react";
import "./Login.css";
import { useRef } from "react";
// import AuthContext from "../store/auth-context";
import { useNavigate,Link } from "react-router-dom";
import { authActions } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

 
  const navigate = useNavigate();

  const toggleButton = () => {
    dispatch(authActions.toggle());
  };
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();


    if (!isLogin) {
      //Login Logic
      const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

      const Loginurl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgRIRM-lxcgOr8ZlinFrQV2WU-V0AB_nQ";

      try {
        const authData = {
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true,
        };

        const response = await axios.post(Loginurl, authData);
        dispatch(authActions.login(response.data.idToken));
        localStorage.setItem("token", response.data.idToken);
        navigate("/welcome");
      } catch (error) {
        alert(error.response.data.error.message);
      }
    } else {
      //Signup Logic
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    const confirmPasswordInput = confirmPasswordInputRef.current.value;

      const url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgRIRM-lxcgOr8ZlinFrQV2WU-V0AB_nQ";

      if (passwordInput === confirmPasswordInput) {
        try {
          const authData = {
            email: emailInput,
            password: passwordInput,
            returnSecureToken: true,
          };

          const response = await axios.post(url, authData);
          dispatch(authActions.login(response.data.idToken));
          alert("Signup successful, You can Login now");
          navigate("/");
        } catch (error) {
          alert(error.response.data.error.message);
        }
      } else {
        alert("Password Does Not Match");
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
      <h2 className="text-lg text-gray-900">
          {isLogin ? "Signup" : "Login"}
        </h2>
        <input type="email" placeholder="Email" required ref={emailInputRef} />
        <input
          type="password"
          placeholder="Password"
          required
          ref={passwordInputRef}
        />
        {isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            required
            ref={confirmPasswordInputRef}
          />
        )}
        <button type="submit">{isLogin ? "Signup" : "Login"}</button>
        <Link to="forgot-password">
          <button>Forgot Password</button>
        </Link>
        <button onClick={toggleButton}>
        {isLogin
            ? "Have an account? Login"
            : "Don't have an account ? Signup"}
        </button>
      </form>
    </div>
  );
};

export default Login;