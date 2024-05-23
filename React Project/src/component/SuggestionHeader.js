import React, { useState, useEffect, useCallback } from "react";
import "./header.css";
import "./SuggestionHeader.css"


function Header() {
    return (
        <div className="headercontainer">
          <div className={"movielistheader"}>
            <div>
              <div className={"headerlogo"}></div>
                    <div className = "headCenter">
                    <div className = "HateMovieH5"></div>
                   <div className = "SuggestionMovieH2">회원님이 좋아할 것 같은 영화는...</div>
              </div>
            </div>
          </div>
        </div>
      );
  }
  
  export default Header;