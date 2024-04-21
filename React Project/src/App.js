import './App.css';

function App() {
  return (
    <div>
      <title>영화 추천 사이트</title>
        <header>
            <h1>영화 추천 사이트</h1>
        </header>
        <div>
          <MyListComponent num='10'/>
        </div>
    </div>
  );
}

let MovieComponent = ()=>{
  return (
  <div className="movie">
      <div className="movie-info">
          <h3>영화 제목</h3>
          <p>영화 설명...</p>
      </div>
  </div>
  );
}

function MyListComponent(props) {
  const dataList = [];
  for(let i=0;i<props.num;i++) {
    dataList.push({
      id:i+1,
      content: `내용 ${i+1}`
    });
  }
  
  return (
    <div className="listContainer">
      {dataList.map(data => (
        <MovieComponent />
      ))}
    </div>
  );
}
export default App;
