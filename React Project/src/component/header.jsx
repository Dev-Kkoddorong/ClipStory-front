import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import './header.css'

function header() {
    return (
        <header className="movielistheader">
        <div>
            <div className="loginbuttoncontainer">
                <Link to="/login">
                    <Button className="loginbutton"></Button>
                </Link>
            </div>
        </div>
      </header>
    );
}

export default header;