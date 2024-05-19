import "./LoginPage.css";
import React, { useState, forwardRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = forwardRef((props,ref) => {
  const onMoveToForm = () => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    try {
      const postData = {
        customId: formData.id,
        password: formData.password,
      };

      const json = JSON.stringify(postData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:9292/auth/login",
        json,
        config
      );
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.error("로그인 실패: ", error);
    } finally {
      alert("로그인 성공");
      window.location.href = "/";
    }
  };
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
      </style>
      <div className="loginpage1container">
        Experience the<br></br>magic of cinema<br></br>anywhere.
      </div>
      <div>
        <div className="joinus">Join Us</div>
        <div className="joinuscomment">
          You’re just a click away from a world of cinematic magic.<br></br>
          Dive in! No need to worry about late fees, just pure, unadulterated
          film joy.
        </div>
        <div className="page2loginbuttoncontainer">
          <div className="page2loginbutton" onClick={onMoveToForm}>
            Login!
          </div>
        </div>
        <div className="notsigncontainer">
          <Link to="/signuppage">
            <div className="notsignyet">아직 회원이 아니신가요?</div>
          </Link>
        </div>
      </div>
      <div>
        <div className="login3left">
          <div className="login3box" ref={ref}></div>
          <div className="login3img"></div>
        </div>
        <div className="login3right">
          <div className="login3id">ID/Email</div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </form>
          </div>
          <div className="login3pw">password</div>
          <div>
            <form onSubmit={handleSubmit} className="login3pwsubmit">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </form>
            <div className="login3loginbutton" onClick={handleSubmit}>
              Login!
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default LoginPage;
