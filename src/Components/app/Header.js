import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리 import

function Header() {
  const { auth, setAuth } = useContext(AuthContext);

  // 로컬 스토리지에서 토큰을 가져와서 디코딩하고 role을 확인
  const token = localStorage.getItem("accessToken");
  let userRole = null;

  if (token) {
    try {
      // 토큰 디코딩
      console.log(token);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      userRole = decodedToken.roles; // 디코딩된 토큰에서 roles 추출
    } catch (error) {
      console.error("토큰 디코딩 오류:", error);
    }
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="container">
          <div
            className="navbar-collapse collapse justify-content-between"
            id="navbar-content"
          >
            <ul className="navbar-nav mr-auto">
              {/* 메인 화면 */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>

              {/* 게시판 */}
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  게시판
                </div>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/bbslist">
                    글목록
                  </Link>
                  <Link className="dropdown-item" to="/bbswrite">
                    글추가
                  </Link>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {auth ? (
                <>
                  {/* 회원 정보 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/checkpwd">
                      <i className="fas fa-sign-out-alt"></i> {auth} 님
                      반갑습니다 <i className="fab fa-ello"></i> &nbsp;{" "}
                    </Link>
                  </li>

                  {/* 로그아웃 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                      <i className="fas fa-sign-out-alt"></i> 로그아웃
                    </Link>
                  </li>

                  {/* 관리자 메뉴 - roles이 'ADMIN'인 경우에만 표시 */}
                  {userRole === "ROLE_ADMIN" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">
                        <i className="fas fa-cogs"></i> 관리자
                      </Link>
                    </li>
                  )}
                </>
              ) : (
                <>
                  {/* 로그인 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      로그인
                    </Link>
                  </li>

                  {/* 회원가입 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/join">
                      회원가입
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
