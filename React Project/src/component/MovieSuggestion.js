import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MovieSuggestion.css";
import axios from "axios";
import Header from "./SuggestionHeader";

function MovieSuggestion() {
  const [MovieListCosine, setMovieListCosine] = useState([]);
  const [MovieListKnn, setMovieListKnn] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const likeMovieIdList = location.state.selectedIdFromSelect1
  const hateMovieIdList = location.state.selectedIdFromSelect2
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    sendPostRequest();
  }, []);

  const navigate = useNavigate();
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
      const responseCosine = await axios.post('http://localhost:9292/movieSuggestion/similarMovie', json, config);
      setMovieListCosine(responseCosine.data.data);

      const responseKnn = await axios.post('http://localhost:9292/movieSuggestion/similarPeoplesMovie', json, config);
      setMovieListKnn(responseKnn.data.data);
       // 응답 데이터를 state에 저장합니다.
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToMain = () => {
    navigate("/");
  };

  const goToSelect1 = () => {
    navigate("/select1");
  };

  if (IsLoading) {
    return (
      <> <Header />
        <div id="loading-screen">
       <div className = "logo1"></div>
       <div className = "logo2"></div>
       <div className = "logo3"></div>
      </div>
      </>
    );
  }  else {
    return (
      <>
        <Header />
      <div>
          <div>
            <div className = "center1">
              <button className="center1" onClick={goToSelect1} >
                  다시 추천 받기
              </button>
            </div>
              <div className="recommendation-header">
                회원님 맞춤 영화
              </div>
          </div>

   

        <div className="suggestionContainer">
          {MovieListCosine.map((movie, index) => {
            const isScare = movie.genreNameList.includes('Horror');
            const isAdult = movie.isAdult;
            return (
                    <div key={index} className={`screen ${isScare ? 'horror' : ''} ${isAdult ? 'adult' : ''}`}>
                      <img src={movie.imageUrl} alt="NO IMAGE" className="suggestionImg" />
                        <div className="text-container">
                          <h2 className="title">{movie.title}</h2>
                          <p className="overView">{movie.overView}</p>
                          <div className="genre-container">
                            {movie.genreNameList.map((genre, genreIndex) => (
                              <span key={genreIndex} className="genre">{genre}</span>
                            ))}
                          </div>
                        </div>
                    </div>
                );
            })}
      </div>

          <div>
            <div className="recommendation-header">
              회원님과 취향이 비슷한 사람들이 시청한 영화
            </div>
          </div>
     
          <div className="suggestionContainer">
          {MovieListKnn.map((movie, index) => {
                const isScare = movie.genreNameList.includes('Horror');
                const isAdult = movie.isAdult;
                      return (
                        <div key={index} className={`screen ${isScare ? 'horror' : ''} ${isAdult ? 'adult' : ''}`}>
                          <img src={movie.imageUrl} alt="NO IMAGE" className="suggestionImg" />
                          <div className="text-container">
                            <h2 className="title">{movie.title}</h2>
                            <p className="overView">{movie.overView}</p>
                            <div className="genre-container">
                              {movie.genreNameList.map((genre, genreIndex) => (
                                <span key={genreIndex} className="genre">{genre}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
            })}
          </div>
         
                <div className = "center1">
                    <button className="center1" onClick={goToMain} >
                    메인화면으로 돌아가기
                    </button>
                </div>
          </div>
      </>
    );
  }
}

export default MovieSuggestion;
