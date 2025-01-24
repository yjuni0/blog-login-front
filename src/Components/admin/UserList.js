import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { Link } from "react-router";
import "../../css/adminMain.css";
const UserList = () => {
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  // user 리스트
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //페이징
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  //검색용
  const [choiceVal, setChoiceVal] = useState("");
  const [searchVal, setSearchVal] = useState("");

  const getUserList = async (page) => {
    try {
      const response = await axios.get(
        "http://localhost:8989/admin/user/list",
        {
          headers: headers,
          params: { page: page - 1 },
        }
      );
      console.log("유저목록 불러오기 성공");
      console.log(response.data);
      setUsers(response.data.content);
      setPageSize(response.data.pageSize);
      setTotalPages(response.data.totalPages);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("불러오기 실패");
      console.log(error);
    }
  };

  useEffect(() => {
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    });
    getUserList(1).then(() => setLoading(false)); // 데이터 로드 후 로딩 상태 변경
  }, []);
  const changePage = (page) => {
    setPage(page);
    getUserList(page);
  };

  return (
    <div className="board-list-container">
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
      <h1 className="board-list-title">사용자 목록</h1>
      <table className="board-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이메일</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userEmail}</td>
              <td>{user.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        className="pagination"
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={totalPages}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={changePage}
      />
    </div>
  );
};

export default UserList;
