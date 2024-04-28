import "./App.css";
import MovieComponentList from "./component/MovieComponentList";
import MovieSelectingPage1 from "./component/MovieSelectingPage1";
import MovieSelectingPage2 from "./component/MovieSelectingPage2";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieSuggestion from "./component/MovieSuggestion";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MovieComponentList />}></Route>
          <Route path="/select1" element={<MovieSelectingPage1 />}></Route>
          <Route path="/select2" element={<MovieSelectingPage2 />}></Route>
          <Route path="/suggest" element={<MovieSuggestion />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
