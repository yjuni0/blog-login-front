import { Routes } from "react-router-dom";
import Login from "../Components/user/Login";
import Register from "../Components/user/Register";
import Home from "../Components/app/Home";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default Router;
