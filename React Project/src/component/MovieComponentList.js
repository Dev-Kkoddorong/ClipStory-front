import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";

const postsPerPage = 10;

function MovieComponentList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = () => {
    axios
      .get("/movie/")
      .then((Response) => {
        setMovieList(Response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const currentPosts = movieList.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

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
        {currentPosts.map((movie) => (
          <MovieComponent key={movie.id} movie={movie} />
        ))}
      </ul>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={Math.ceil(movieList.length / postsPerPage)}
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
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.genreNameList}</p>
      </div>
    </div>
  );
};

export default MovieComponentList;
