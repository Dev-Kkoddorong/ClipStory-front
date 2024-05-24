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
    window.scrollTo(0, 0);
  }, [currentPage]);
  
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

  const [genres, setGenres] = useState([
    'Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy', 'Romance', 'Drama', 'Action', 'Crime', 'Thriller',
    'Horror', 'Mystery', 'Sci-Fi', 'War', 'Musical', 'Documentary', 'IMAX', 'Western', 'Film-Noir', 'No Genres'
  ]);

  const handleGenreClick = (genre) => {
    
    fetchMoviesByGenre(genre);
  };

  const fetchMoviesByGenre = (genre) => {
    alert(genre);
    axios.get(`http://localhost:9292/movie/genre?genreName=${genre}&page=${currentPage}&size=${postsPerPage}`)
    .then((Response) => {
      setMovieList(Response.data.data.items);
      setPageCount(Response.data.data.totalPages);
    })
    .catch((error) => {
      console.log("Error", error);
    });
  };

  return (
    <>
      <title>영화 추천 사이트</title>
      <Header />
      <div className="genrelist">
          {genres.map((genre) => (
            <button key={genre} className="genrebutton" onClick={() => handleGenreClick(genre)}>
              {genre}
            </button>
          ))}
        </div>
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
            <h4>{movie.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default MovieComponentList;
