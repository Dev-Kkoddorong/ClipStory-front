import React from "react";
import { Link } from "react-router-dom";
import "./MovieSuggestion.css";

function MovieSuggestion() {
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
      <div className="container">
        <div className="screen">
          <h2>Screen 1</h2>
          <p>This is the content of screen 1.</p>
        </div>
        <div className="screen">
          <h2>Screen 2</h2>
          <p>This is the content of screen 2.</p>
        </div>
        <div className="screen">
          <h2>Screen 3</h2>
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

export default MovieSuggestion;
