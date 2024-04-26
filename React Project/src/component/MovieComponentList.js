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
  });

  const fetchMovieList = () => {
    axios
      .get(
        `http://172.16.233.102:9292/movie/?page=${currentPage}&size=${postsPerPage}`
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
      <title>영화 추천 사이트</title>
      <header>
        <h1>영화 추천 사이트</h1>
        <Link to="/Suggest">
          <button>영화 추천</button>
        </Link>
      </header>
      <ul className="container">
        {movieList.map((movieList) => (
          <MovieComponent key={movieList.id} movie={movieList} />
        ))}
      </ul>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={10}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => {
          setCurrentPage(selected);
        }}
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
      <div>
        <h3>{movie.title}</h3>
        <p>{movie.genreNameList}</p>
      </div>
    </div>
  );
};

export default MovieComponentList;
