import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";

const postsPerPage = 10;

function MovieComponentList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [movieList, setMovieList] = useState([]);
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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <title>영화 추천 사이트</title>
      <header>
        <div>
          <div><h1>영화 추천 사이트</h1></div>
          <div><Link to="/login"><button>로그인</button></Link></div>
        </div>
        <div>
          <Link to="/select1">
            <button>영화 추천</button>
          </Link>
        </div>
      </header>
      <ul className="movieComponentContainer">
        {movieList.map((movie) => (
          <MovieComponent key={movie.id} movie={movie} />
        ))}
      </ul>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

let MovieComponent = ({ movie }) => {
  return (
    <div className="movie">
      <div className = "movie-info">
        <h3>{movie.title}</h3>
        <h3>{movie.genreNameList}</h3>
      </div>
    </div>
  );
};

export default MovieComponentList;
