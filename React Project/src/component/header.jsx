import React, { useState, useEffect, useCallback } from "react";
import "./header.css";

function Header() {
  const [scrollPos, setScrollPos] = useState(0);
  const [loginname, setLoginName] = useState('Dev-kkodong');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      setLoginName("loged in");
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

  const handleLogout = () => {
   localStorage.removeItem('accessToken');
   window.location.href = '/';
  };

  return (
    <div className={scrollPos < 100 ? "movielistheader" : "smallmovielistheader"}>
      <div className={scrollPos < 100 ? "headerlogo" : "headerlogosmall"}></div>
      <div className="headercontent">
        {accessToken && (
          <button className="logoutbutton" onClick={handleLogout}>
            로그아웃
          </button>
        )}
        <div className={scrollPos < 100 ? "loginname" : "loginnamesmall"}>{loginname}</div>
      </div>
    </div>
  );
}

export default Header;
