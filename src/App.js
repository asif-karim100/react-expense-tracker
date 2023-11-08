// import Expenses from './pages/Expenses';
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Expenses from "./pages/Expenses";
import { useSelector } from "react-redux";
import Modal from "./components/Modal";
import { Fragment } from "react";

const App = () => {
  const isEditing = useSelector((state) => state.expnese.isEditing);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
    <Layout>
    {isEditing && <Modal />}
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Login />} />}
        {isLoggedIn && <Route path="/" element={<Welcome />} />}

        {isLoggedIn && <Route path="/welcome" element={<Welcome />} />}
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        {isLoggedIn && (
          <Route path="/expenses" element={<Expenses />} />
        )}
        {!isLoggedIn && (
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        )}
      </Routes>

    </Layout>
    </Fragment>
  );
};

export default App;
