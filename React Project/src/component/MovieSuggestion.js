import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MovieSuggestion.css";
import axios from "axios";

function MovieSuggestion() {
  const [MovieList, setMovieList] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const likeMovieIdList = location.state.selectedIdFromSelect1
  const hateMovieIdList = location.state.selectedIdFromSelect2
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    sendPostRequest();
  }, []);

  const sendPostRequest = async () => {
    try {
      // `postData`는 서버로 보낼 데이터입니다.
      const postData = {
        "likeMovieIdList" : likeMovieIdList,
        "hateMovieIdList" : hateMovieIdList
      };
      const json = JSON.stringify(postData);
      const config = {
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${accessToken}`
        }
      };      
      const response = await axios.post('http://localhost:9292/movieSuggestion/similarMovie', json, config)
      setMovieList(response.data.data);
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
            <h2>{MovieList[0].id}</h2>
            <h2>{MovieList[0].title}</h2>
            <h2>{MovieList[0].genreNameList}</h2>
            <p>This is the content of screen 1.</p>
          </div>
          <div className="screen">
            <h2>{MovieList[1].id}</h2>
            <h2>{MovieList[1].title}</h2>
            <h2>{MovieList[1].genreNameList}</h2>
            <p>This is the content of screen 2.</p>
          </div>
          <div className="screen">
            <h2>{MovieList[2].id}</h2>
            <h2>{MovieList[2].title}</h2>
            <h2>{MovieList[2].genreNameList}</h2>
            <p>This is the content of screen 3.</p>
          </div>
        </div>
        <div>
          Clip Story가 회원님과 취향이 비슷한 사람들의 영화를 추천해 보았어요
          <div id="recomment_again">
            <Link to="/select1">
              <button id="again">다시</button>
            </Link>
          </div>
        </div>
        <div className="suggestionContainer">
          <div className="screen">
            <h2>{MovieList[0].id}</h2>
            <h2>{MovieList[0].title}</h2>
            <h2>{MovieList[0].genreNameList}</h2>
            <p>This is the content of screen 1.</p>
          </div>
          <div className="screen">
            <h2>{MovieList[1].id}</h2>
            <h2>{MovieList[1].title}</h2>
            <h2>{MovieList[1].genreNameList}</h2>
            <p>This is the content of screen 2.</p>
          </div>
          <div className="screen">
            <h2>{MovieList[2].id}</h2>
            <h2>{MovieList[2].title}</h2>
            <h2>{MovieList[2].genreNameList}</h2>
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
