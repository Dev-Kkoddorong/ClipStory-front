import React, { useState, useEffect } from "react";
import axios from "axios";
import './MovieComponentList.css';
import { Button } from "@mui/material";
import Header from "./header.jsx";
import Bottom from "./bottom.jsx"


const postsPerPage = 16;

function MovieComponentList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [movieList, setMovieList] = useState([{"id": 1, "title": "Toy story", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 2, "title": "Title2", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 3, "title": "Title3", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 4, "title": "Title4", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 5, "title": "Title5", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 6, "title": "Title6", "genreNameList": ["Adventure"], "tagList": ["pixar"]}, {"id": 7, "title": "Title7", "genreNameList": ["Adventure"], "tagList": ["pixar"]}, {"id": 8, "title": "Title8", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 9, "title": "Title9", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 10, "title": "Title10", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 11, "title": "Title11", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 12, "title": "Title12", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 13, "title": "Title13", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 14, "title": "Title14", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 15, "title": "Title15", "genreNameList": ["Adventure"], "tagList": ["pixar"]},{"id": 16, "title": "Title16", "genreNameList": ["Adventure"], "tagList": ["pixar"]}]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetchMovieList();
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
    let i=currentPage;
    if(currentPage!=0) {
      setCurrentPage(--i);
    }
  };

  const handlePageRightClick = () => {
    let i=currentPage;
    if(currentPage!=pageCount) {
      setCurrentPage(++i);
    }
  };

  return (
    <>
      <title>영화 추천 사이트</title>
      <Header/>
      <div className="boxcontainer">
        <div className="movielistbackground1">
          <div className="movielistbackground2">
            <div className="logo"></div>
            <div className="movielistbox">
              {movieList.map((movie) => (
                <MovieComponent key={movie.id} movie={movie} />
              ))}
              <div className="pagebuttoncontainer">
                <Button className="pageleft" onClick={handlePageLeftClick}></Button>
                <Button className="pageright" onClick={handlePageRightClick}></Button>
              </div>
            </div>         
          </div>
        </div>
      </div>
      <Bottom/>
    </>
  );
}

let MovieComponent = ({ movie }) => {
  return (
    <div className = "moviebox">
      <div className = "movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.genreNameList[0]}</p>
        <p>{movie.genreNameList[1]}</p>
        <p>{movie.genreNameList[2]}</p>
      </div>
    </div>
  );
};

export default MovieComponentList;
