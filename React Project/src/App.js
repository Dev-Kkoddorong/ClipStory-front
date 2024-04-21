import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';

const postsPerPage = 10;
const allPosts = Array(100).fill().map((_, i) => `글 ${i + 1}`);

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentPosts = allPosts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  return (
    <div>
        <title>영화 추천 사이트</title>
        <header>
            <h1>영화 추천 사이트</h1>
        </header>
      <ul className='container'>
        {currentPosts.map((post, index) => (
          <MovieComponent />
        ))}
      </ul>
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        breakLabel={'...'}
        pageCount={Math.ceil(allPosts.length / postsPerPage)}
        marginPagesDisplayed={10}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

let MovieComponent = (props)=>{
  return (
  <div className="movie">
      <div className="movie-info">
          <h3>영화 제목</h3>
          <p>영화 설명...</p>
      </div>
  </div>
  );
}

export default App;
