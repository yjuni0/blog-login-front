/* 로그인 컴포넌트 */

import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
function Login() {
  const { setAuth } = useContext(AuthContext);
  const { setHeaders } = useContext(HttpHeadersContext);
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        loginForm,
        { withCredentials: true } // 쿠키 포함 요청
      );

      const { email, accessToken } = response.data;

      // 액세스 토큰 로컬 스토리지 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userEmail", email);

      // 컨텍스트 업데이트
      setAuth(email);
      setHeaders({ Authorization: `Bearer ${accessToken}` });

      alert(`${email}님, 성공적으로 로그인 되었습니다 🔐`);
      navigate("/bbslist");
    } catch (error) {
      console.error("[Login] 로그인 에러:", error);
      alert(`⚠️ ${error.response?.data || "로그인 중 오류가 발생했습니다"}`);
    }
  };

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th className="col-3">아이디</th>
            <td>
              <input
                type="text"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
                size="50px"
              />
            </td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                size="50px"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="my-1 d-flex justify-content-center">
        <button className="btn btn-outline-secondary" onClick={login}>
          <i className="fas fa-sign-in-alt"></i> 로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
