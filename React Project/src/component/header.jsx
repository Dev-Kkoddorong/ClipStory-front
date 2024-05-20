import React, { useState, useEffect, useCallback } from "react";
import "./header.css";

function Header() {
  const [scrollPos, setScrollPos] = useState(0);
  const [loginname, setLoginName] = useState('Dev-kkodong');
  const accessToken = localStorage.getItem('accessToken');
  
  useEffect(() => {
    if (accessToken) {
      setLoginName("로그인됨");
    }
  }, [accessToken]);

  const handleScroll = useCallback(() => {
    setScrollPos(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="headercontainer">
      <div className={scrollPos < 100 ? "movielistheader" : "smallmovielistheader"}>
        <div>
          <div className={scrollPos < 100 ? "headerlogo" : "headerlogosmall"}></div>
          <div className={scrollPos < 100 ? "loginname" : "loginnamesmall"}>{loginname}</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
