import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SuggestionPage() {

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(2);
  }, []);

  const fetchMovieById = (id) => {
    axios.get(`http://localhost:9292/movie/${id}`)
      .then(Response => {
        setMovie(Response.data.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      {/* movie 상태 변수에 값이 있을 때만 화면에 영화 정보를 렌더링 */}
      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <p>ID: {movie.id}</p>
          <p>장르: {movie.genreNameList.join(', ')}</p>
          <p>태그: {movie.tagList.join(', ')}</p>
          <p>평균 평점: {movie.averageRating}</p>
          <p>TID: {movie.tid}</p>
          {/* 필요한 영화 정보를 화면에 추가 */}
        </div>
      )}
    </div>
  );
}

export default SuggestionPage;
