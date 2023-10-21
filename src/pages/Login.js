import axios from "axios";
// import { useRef, useState } from "react";
import "./Login.css"
import { useContext, useRef, useState } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleButton = () => {
    setIsLogin((prevStat) => !prevStat);
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

        const response= await axios.post(Loginurl, authData);
        authCtx.login(response.data.idToken);
        console.log(authCtx.token);
        navigate('/welcome')
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
          authCtx.login(response.data.idToken);
          alert('Signup successful, You can Login now');
          navigate('/')
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
        <h2>{isLogin ? "Signup" : "Login"}</h2>
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
      </form>
      <button onClick={toggleButton}>
        {isLogin ? "Have an account? Login" : "Don't have an account ? Signup"}
      </button>
    </div>
  );
};

export default Login;