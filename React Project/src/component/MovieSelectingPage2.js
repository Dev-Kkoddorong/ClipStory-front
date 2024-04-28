import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";

function MovieSelectingPage2() {
  // 상태 관리를 위한 useState 훅 사용
  const [searchTerm, setSearchTerm] = useState(""); // 검색어를 저장할 상태
  const [selectedItem, setSelectedItem] = useState([]); // 선택된 항목을 저장할 상태
  const [movieList, setMovieList] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const copy = [...selectedId, location.state.Id]
    setSelectedId(copy);
  },[]);

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
        `http://172.16.233.102:9292/movie/?partOfTitle=${searchTerm}&page=0&size=10`
      )
      .then((Response) => {
        setMovieList(Response.data.data.items);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <header>
        <h1>싫어하는 영화 3개를 선택하세요</h1>
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
      {selectedItem && (
        <div>
          <h3>
            선택된 항목: {selectedItem[0]} {selectedItem[1]} {selectedItem[2]}
          </h3>
        </div>
      )}
      <Link to="/suggest" state={{Id:selectedId}}>
        <button>결과보기</button>
      </Link>
    </div>
  );
}

export default MovieSelectingPage2;
