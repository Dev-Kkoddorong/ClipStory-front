import React, { useState, useEffect, useCallback } from "react";
import "./Header.css";

function Header() {
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollPos(window.pageYOffset);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="headercontainer">
      <div
        className="movielistheader"
        style={{ height: `${210 - scrollPos * 0.5}px` }}
      >
        <div className="loginbuttoncontainer"></div>
      </div>
    </div>
  );
}

export default Header;
