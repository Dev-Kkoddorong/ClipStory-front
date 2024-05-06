import React, { useState, useEffect } from "react";
import './Signup.css';
import ReactPaginate from "react-paginate";
import { useLocation } from 'react-router-dom';


function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        password: '',
        confirm_password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', formData);
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
                value={formData.confirm_password}
                onChange={handleChange}
                required
            />

            <input type="submit" value="가입하기" />
        </form>
    </div>
    </div>
    
);
}

export default SignupForm;
