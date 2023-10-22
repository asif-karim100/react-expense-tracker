
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login"
import Profile from "./pages/Profile";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Layout from "./components/Layout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

const App = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Layout>
    <Routes>
      {!isLoggedIn && <Route path="/" element={<Login />} />}
      {isLoggedIn && <Route path="/welcome" element={<Welcome />} />}
      {isLoggedIn && <Route path="/profile" element={<Profile />} />}
      {!isLoggedIn && <Route path='forgot-password' element={<ForgotPasswordPage />} />}
    </Routes>
    
    </Layout>
  );
};
 
 export default App;