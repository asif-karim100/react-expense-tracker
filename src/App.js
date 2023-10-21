
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login"
import Profile from "./pages/Profile";


const App = () => {
  const token = localStorage.getItem('token');

  const isLoggedIn = !!token
  return (
    <Routes>
    {isLoggedIn && <Route path="/" element={<Login/>} />}

    {isLoggedIn && <Route path="/welcome" element={<Welcome/>}  />}
    {isLoggedIn && <Route path="/profile" element={<Profile/>}  />}
 
     </Routes>
     );
 }
 export default App;