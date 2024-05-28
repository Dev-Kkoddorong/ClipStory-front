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

    if (formData.password.length < 8) {
      alert("비밀번호는 최소 8자리 이상이어야 합니다.");
      return;
    }

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
      // 회원가입 성공 시
      alert("회원가입에 성공했습니다.");
      localStorage.setItem("signup", true);
      window.location.href = "/";

        } catch (error) {
          if (error.response) {
              if (error.response.status === 409) {
                alert("회원가입 실패: 이미 존재하는 아이디입니다!");
              } else {
                alert(`회원가입 실패: ${error.response.data.message}`);
              }
            } else {
              alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.');
            }
          console.error('회원가입 실패: ', error);
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
