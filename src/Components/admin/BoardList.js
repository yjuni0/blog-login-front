import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { Link } from "react-router";
import "../../css/adminMain.css"; // 새로운 스타일을 위한 css 파일

const BoardList = () => {
  const [boards, setBoards] = useState([]); // 게시판 목록 상태
  const [loading, setLoading] = useState(true);

  // 페이징
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const getBoardList = async (page) => {
    try {
      const response = await axios.get(
        "http://localhost:8989/admin/board/list"
      );
      setBoards(response.data.content); // 응답받은 데이터를 boards 상태에 저장
      setPageSize(response.data.pageSize);
      setTotalPages(response.data.totalPages);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.error("게시판 목록 불러오기 실패", error);
    }
  };

  useEffect(() => {
    getBoardList(1).then(() => setLoading(false)); // 데이터 로드 후 로딩 상태 변경
  }, []);

  const changePage = (page) => {
    setPage(page);
    getBoardList(page);
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
      <h1 className="board-list-title">게시판 목록</h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <table className="board-list-table">
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody>
              {boards.map((board) => (
                <tr key={board.boardId}>
                  <td>
                    <a href={`/bbsdetail/${board.boardId}`}>{board.title}</a>
                  </td>
                  <td>{board.writer}</td>
                  <td>{board.createdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            className="pagination"
            activePage={page}
            itemsCountPerPage={pageSize}
            totalItemsCount={totalCnt}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={changePage}
          />
        </>
      )}
    </div>
  );
};

export default BoardList;
