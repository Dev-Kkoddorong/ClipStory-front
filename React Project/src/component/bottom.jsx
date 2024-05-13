import { Link } from "react-router-dom";
import "./Bottom.css";

function Bottom() {
  return (
    <div className="bottomnav">
      <div className="movierecommendcontainer">
        <Link to="/select1">
          <button className="movierecommend"></button>
        </Link>
      </div>
    </div>
  );
}

export default Bottom;
