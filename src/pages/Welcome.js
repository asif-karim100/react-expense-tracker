import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import axios from "axios";
import "./Welcom.css";

const Welcome = () => {
  
    const authCtx = useContext(AuthContext);
    const verifyEmailHandler = async () => {
      const url =
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCgRIRM-lxcgOr8ZlinFrQV2WU-V0AB_nQ";
      const token = authCtx.token;
      try {
          const response = await axios.post(url, {
              requestType: "VERIFY_EMAIL",
              idToken:token
          });
  
          if(response.status === 200) {
              console.log(response);
          }
          else{
              console.log('Email not sent');
          }
  
      } catch (error) {
          console.log(error);
  
      }
};

return (
  <div>
    <h1>Welcome to Expense Tracker</h1>
    <div>
      <span> Your Profile is incomplete</span>
      <Link to="/profile">Complete Now</Link>
    </div>
    <button onClick={verifyEmailHandler}>Verify Email</button>
  </div>
);
};

export default Welcome;