import "./App.css";
import MovieComponentList from "./component/MovieComponentList";
import SuggestionPage from "./component/SuggestionPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MovieComponentList />}></Route>
          <Route path="/Suggest" element={<SuggestionPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
