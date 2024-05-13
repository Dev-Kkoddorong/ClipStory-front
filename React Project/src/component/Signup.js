import React, { useState, useEffect } from "react";
import './Signup.css';
import axios from "axios";

function SignupForm() {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        try {
            const postData = {
                "customId" : formData.id,
                "password" : formData.password,
                "name" : formData.name
            };

            const json = JSON.stringify(postData);
            const config = {
                headers: {
                  "Content-Type": 'application/json'
                }
              };

            const response = await axios.post('http://localhost:9292/auth/signUp', json, config );
            
        } catch (error) {
          console.error('회원가입 실패:', error);
        } finally {
            alert("회원가입에 성공했습니다.");
            window.location.href = '/login';
        }
    };

  return (
    <div className="login-body">
        <div className="container">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">이름:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label htmlFor="id">아이디:</label>
            <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
            />

            <label htmlFor="password">비밀번호:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <label htmlFor="confirm_password">비밀번호 확인:</label>
            <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                /*value={formData.confirm_password}
                onChange={handleChange}*/
                required
            />
            <button type="button" onClick={handleSubmit}>가입하기</button>
        </form>
    </div>
    </div>
    
    );
}



export default SignupForm;
