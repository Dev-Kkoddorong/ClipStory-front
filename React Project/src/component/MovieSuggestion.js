import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MovieSuggestion.css";
import axios from "axios";

function MovieSuggestion() {
  const [MovieList, setMovieList] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const likemovie = location.state.Id.slice(0, 3);
  const hatemovie = location.state.Id.slice(-3);

  useEffect(() => {
    sendPostRequest();
  }, []);

  const sendPostRequest = async () => {
    try {
      // `postData`는 서버로 보낼 데이터입니다.
      const postData = {
        likeMovieIdList: likemovie,
        hateMovieIdList: hatemovie,
      };
      const response = await axios.post(
        "http://localhost:9292/movieSuggestion/similarMovie",
        postData
      );
      setMovieList(response.data.data.item);
      // 응답 데이터를 state에 저장합니다.
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (IsLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Clipstory 영화추천</h1>
        <hr />
        <div>
          Clip Story가 회원님을 위한 영화를 추천해 보았어요
          <div id="recomment_again">
            <Link to="/select1">
              <button id="again">다시</button>
            </Link>
          </div>
        </div>
        <div className="suggestionContainer">
          <div className="screen">
            <h2>{MovieList[0]}</h2>
            <p>This is the content of screen 1.</p>
          </div>
          <div className="screen">
            <h2>{MovieList[1]}</h2>
            <p>This is the content of screen 2.</p>
          </div>
          <div className="screen">
            <h2>{MovieList[2]}</h2>
            <p>This is the content of screen 3.</p>
          </div>
        </div>
        <div>
          <Link to="/">
            <button className="box">목록 보기</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MovieSuggestion;
