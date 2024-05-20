import "./SignupPage.css";
import axios from "axios";
import React, { useState } from "react";

function SignupPage() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      const postData = {
        customId: formData.id,
        password: formData.password,
        name: formData.name,
      };

      const json = JSON.stringify(postData);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:9292/auth/signUp",
        json,
        config
      );
    } catch (error) {
      console.error("회원가입 실패:", error);
    } finally {
      alert("회원가입에 성공했습니다.");
      window.location.href = "/";
      localStorage.setItem("signup",true);
    }
  };
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
      </style>
      <div>
        <div className="signupright">
          <div className="signupimg"></div>
        </div>
        <div className="signupleft">
          <div className="signupid">ID/Email</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              className="signupidinput"
            />
          </form>
          <div className="signuppw">password</div>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="signupidinput"
            />
          </form>
          <div className="signupname">name</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="signupidinput"
            />
          </form>
          <div className="signupbutton" onClick={handleSubmit}>
            Sign up
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
