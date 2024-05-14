import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";

const postsPerPage = 10;

function MovieSelectingPage1() {
  // 상태 관리를 위한 useState 훅 사용
  const accessToken = localStorage.getItem('accessToken');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState(""); // 검색어를 저장할 상태
  const [selectedItem, setSelectedItem] = useState([]); // 선택된 항목을 저장할 상태
  const [movieList, setMovieList] = useState([]);
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {
    if (!accessToken) {
      window.location.href = '/login';
    }
  }, []);


  useEffect(() => {
    fetchMovieList(searchTerm);
  }, [searchTerm,currentPage]);

  // 검색창 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 목록 항목 선택 핸들러
  const handleItemClick = (item) => {
    let copy = [...selectedItem];
    if (copy.length < 3 && !copy.includes(item.title)) {
      copy = [...selectedItem,item.id];
      setSelectedItem(copy);
      setSelectedId([...selectedId, item.id]);
    }
  };

  const fetchMovieList = (searchTerm) => {
    axios
      .get(
        `http://localhost:9292/movie/title?partOfTitle=${searchTerm}&page=${currentPage}&size=${postsPerPage}`
      )
      .then((Response) => {
        setMovieList(Response.data.data.items);
        setPageCount(Response.data.data.totalPages);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <header>
        <h1>좋아하는 영화 3개를 선택하세요</h1>
      </header>
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button
        onClick={() => {
          fetchMovieList(searchTerm);
        }}
      >
        검색
      </button>
      <ul>
        {movieList.map((item) => (
          <ul key={item.id} onClick={() => handleItemClick(item)}>
            {item.title}
          </ul>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => {
          setCurrentPage(selected);
        }}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      {selectedItem && (
        <div>
          <h3>
            선택된 항목: {selectedItem[0]} {selectedItem[1]} {selectedItem[2]}
          </h3>
        </div>
      )}
      <Link to="/select2" state={{selectedIdFromSelect1:selectedId}}>
        <button>다음</button>
      </Link>
    </div>
  );
}

export default MovieSelectingPage1;
