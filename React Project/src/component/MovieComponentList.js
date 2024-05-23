import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./MovieComponentList.css";
import { Button } from "@mui/material";
import Header from "./header.jsx";
import Bottom from "./bottom.jsx";
import LoginPage from "./LoginPage.jsx";

const postsPerPage = 16;

function MovieComponentList() {
  const myRef = useRef(null);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [movieList, setMovieList] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetchMovieList();
    if(localStorage.getItem("signup")) {
      myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      localStorage.removeItem("signup");
    }
  }, [currentPage]);

  const fetchMovieList = () => {
    axios
      .get(
        `http://localhost:9292/movie/?page=${currentPage}&size=${postsPerPage}`
      )
      .then((Response) => {
        setMovieList(Response.data.data.items);
        setPageCount(Response.data.data.totalPages);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handlePageLeftClick = () => {
    let i = currentPage;
    if (currentPage !== 0) {
      setCurrentPage(--i);
    }
  };

  const handlePageRightClick = () => {
    let i = currentPage;
    if (currentPage !== pageCount) {
      setCurrentPage(++i);
    }
  };

  return (
    <>
      <title>영화 추천 사이트</title>
      <Header />
      <div className="boxcontainer">
        <div className="movielistbackground1">
          <div className="movielistbackground2">
            <div className="logo"></div>
            <div className="movielistbox">
              {movieList.map((movie) => (
                <MovieComponent key={movie.id} movie={movie} />
              ))}
              <div className="pagebuttoncontainer">
                <Button
                  className="pageleft"
                  onClick={handlePageLeftClick}
                ></Button>
                <Button
                  className="pageright"
                  onClick={handlePageRightClick}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      //<React.StrictMode>
      <Bottom />
      //</React.StrictMode>
      <LoginPage ref={myRef}/>
    </>
  );
}

let MovieComponent = ({ movie }) => {
  return (
    <div className="moviebox">
      <div className="movie-info">
        <img src={movie.imageUrl} alt="NO IMAGE" class = "img"/>
        <div className = "detail">
            <h2>{movie.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default MovieComponentList;
