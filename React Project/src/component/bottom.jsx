import { Link } from "react-router-dom";
import './bottom.css'

function bottom() {
    return (
        <div className="bottomnav">
        <div className="movierecommendcontainer">
          <Link to="/select1"><button className="movierecommend"></button></Link>
        </div>
      </div>
    );
}

export default bottom;