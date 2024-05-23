import React, { useState, useEffect, useCallback } from "react";
import "./header.css";
import "./LikeMovieSelectHeader.css"


function Header() {
    return (
      <div className="headercontainer">
        <div className={"movielistheader"}>
          <div>
            <div className={"headerlogo"}></div>
                  <div className = "headCenter">
                  <div className = "LikeMovieH5"></div>
                 <div className = "LikeMovieH2">좋아하는 영화를 3개 선택해주세요</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Header;