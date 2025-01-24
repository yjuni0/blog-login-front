import { Routes, Route } from "react-router-dom";

import Home from "../app/Home";
import BbsList from "../bbs/BbsList";
import BbsWrite from "../bbs/BbsWrite";
import BbsDetail from "../bbs/BbsDetail";
import BbsUpdate from "../bbs/BbsUpdate";
import Join from "../user/Join";
import Login from "../user/Login";
import Logout from "../user/Logout";
import UserUpdate from "../user/UserUpdate";
import CheckPwd from "../user/CheckPwd";
import AdminMain from "../admin/AdminMain";
import UserList from "../admin/UserList";
import BoardList from "../admin/BoardList";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route path="/bbslist" element={<BbsList />}></Route>
      <Route path="/bbswrite" element={<BbsWrite />}></Route>
      <Route path="/bbsdetail/:boardId" element={<BbsDetail />}></Route>
      <Route path="/bbsupdate/:boardId" element={<BbsUpdate />}></Route>

      <Route path="/login" element={<Login />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/checkpwd" element={<CheckPwd />}></Route>
      <Route path="/update" element={<UserUpdate />}></Route>
      <Route path="/logout" element={<Logout />}></Route>

      <Route path="/admin" element={<AdminMain />}></Route>
      <Route path="/admin/userlist" element={<UserList />}></Route>
      <Route path="/admin/boardlist" element={<BoardList />}></Route>
    </Routes>
  );
}

export default Router;
