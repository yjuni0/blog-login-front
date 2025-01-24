import React from "react";
import { Link } from "react-router-dom";
import "../../css/adminMain.css";
function AdminMain() {
  return (
    <div className="admin-main">
      {/* 헤더 */}
      <header className="admin-header">
        <h1>관리자 페이지</h1>
      </header>

      {/* 사이드바 */}
      <aside className="admin-sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/admin/userlist">유저 관리</Link>
            </li>
            <li>
              <Link to="/admin/boardlist">게시글 관리</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="admin-content">
        <h2>환영합니다!</h2>
        <p>관리자 페이지에서 유저 및 게시글을 관리할 수 있습니다.</p>
      </main>
    </div>
  );
}

export default AdminMain;
