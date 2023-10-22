import axios from "axios";
import { useRef } from "react";
import './ForgotPasswordPage.css'

const ForgotPasswordPage = () => {

  const emailInputRef = useRef();

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCgRIRM-lxcgOr8ZlinFrQV2WU-V0AB_nQ";

    try {
      const response = await axios.post(url , {
        requestType: "PASSWORD_RESET",
        email:email
      });
      if(response.status === 200) {
        alert('Please check your email');
      }else{
        console.log('error');
      }

    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div  className="forgot-password-container">
    <form onSubmit={forgotPasswordHandler}>
      <input placeholder="Enter Your Email" ref={emailInputRef} />
      <button>Send Link</button>
    </form>
    </div>
  );
};

export default ForgotPasswordPage;