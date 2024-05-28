import React, { useState, useEffect, useCallback } from "react";
import "./header.css";
import "./HateMovieSelectHeader.css"


function Header() {
    return (
        <div className="headercontainer">
          <div className={"movielistheader"}>
            <div>
              <div className={"headerlogo"}></div>
                    <div className = "headCenter">
                    <div className = "HateMovieH5"></div>
                   <div className = "HateMovieH2">싫어하는 영화를 3개 선택해주세요</div>
              </div>
            </div>
          </div>
        </div>
      );
  }
  
  export default Header;