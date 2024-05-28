import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieSelectPage.css"
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { Button } from "@mui/material";
import Header from "./HateMovieSelectHeader";

const postsPerPage = 16;

function MovieSelectingPage2() {
  // 상태 관리를 위한 useState 훅 사용

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState(""); // 검색어를 저장할 상태
  const [selectedItem, setSelectedItem] = useState([]); // 선택된 항목을 저장할 상태
  const [movieList, setMovieList] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

  const location = useLocation();

  const navigate = useNavigate();
  const [warning, setWarning] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  useEffect(() => {
    fetchMovieList(searchTerm);
  }, [searchTerm,currentPage]);

  // 검색창 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 목록 항목 선택 핸들러
  const handleItemClick = (item) => {
    let copy = [...selectedItem];
    if (copy.length < 3 && !copy.includes(item.title)) {
      copy = [...selectedItem,item.title];
      setSelectedItem(copy);
      setSelectedId([...selectedId, item.id]);
      setWarning("");
    }
  };

  const handleRemoveItem = (title) => {
    const updatedSelectedItem = selectedItem.filter(item => item !== title);
    setSelectedItem(updatedSelectedItem);

    const updatedSelectedId = selectedId.filter((id, index) => selectedItem[index] !== title);
    setSelectedId(updatedSelectedId);
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
  
  const goToNextPage = () => {
    if (selectedItem.length === 3) {
      navigate("/suggest", { state: {selectedIdFromSelect2:selectedId, selectedIdFromSelect1:location.state.selectedIdFromSelect1}});
    } else {
      setWarning("영화를 3개 선택해야 합니다!");
    }
  };

     
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
      
      };
    });
  };
  
  const loadImages = async (urls) => {
    try {
      const results = await Promise.all(urls.map(loadImage));
      return results;
    } catch (error) {
      console.error(error);
    }
  };

  const loadMovieImages = async (movies) => {
    const imageUrls = movies.map((movie) => movie.imageUrl);
    const loadedUrls = await loadImages(imageUrls);
    setLoadedImages(loadedUrls);
  };
  



  const fetchMovieList = async (searchTerm) => {
    axios
      .get(
        `http://localhost:9292/movie/title?partOfTitle=${searchTerm}&page=${currentPage}&size=${postsPerPage}`
      )
      .then((Response) => {
        setMovieList(Response.data.data.items);
        loadMovieImages(Response.data.data.items);
        setPageCount(Response.data.data.totalPages);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  return (
    <>
      <Header />
      <div className="center1">
        <input className = "center1"
        type="text"
        placeholder="영화 제목을 입력하세요"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className = "center1">
        <button
        className="center1"
        onClick={() => {
          fetchMovieList(searchTerm);
        }}
        
      >
        검색
      </button>
      </div>
 
      </div>
      {selectedItem && (
        <div className="center1 selected-movies">
          <h3>선택된 영화:</h3>
          {selectedItem.map((title, index) => (
            <span
            key={index}
            className="movie-title"
            onClick={() => handleRemoveItem(title)}
            style={{ cursor: 'pointer' }}
          >
            {title}
          </span>
          ))}
        </div>
      )}

      {warning && (
        <div className="center1 warning-message">
          <p>{warning}</p>
        </div>
      )}

      <div className = "center1">
        <button className="center1" onClick={goToNextPage} >
        다음 페이지
      </button>
      </div>
      
      <div className="boxcontainer">
        <div className="movielistbackground1">
          <div className="movielistbackground2">
            <div className="logo"></div>
            <div className="movielistbox">
              {movieList.map((movie) => (
                <MovieComponent key={movie.id} onClick={() => handleItemClick(movie)}
                movie={movie} />
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

    
    </>
  );
}


let MovieComponent = ({ movie, onClick }) => {
  const isScare = movie.genreNameList.includes('Horror');
  const isAdult = movie.isAdult;
  return (
    <div className={`moviebox ${isScare ? 'horror' : ''} ${isAdult ? 'adult' : ''}`} onClick = {onClick}>
      <div className="movie-info">
        <img src={movie.imageUrl} alt="NO IMAGE" class = "img"/>
        <div className = "detail">
            <h4>{movie.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default MovieSelectingPage2;
