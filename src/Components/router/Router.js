import { Routes, Route } from "react-router-dom";
import Login from "../user/Login";
import Register from "../user/Register";
import Home from "../app/Home";
import Logout from "../user/Logout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
    </Routes>
  );
}

export default Router;
