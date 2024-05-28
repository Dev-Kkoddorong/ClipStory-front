import React, {useState} from 'react';
import { Link } from "react-router-dom";
import './Login.css';
import axios from "axios";


function Login() {
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const [formData, setFormData] = useState({
    id: '',
    password: ''
});

const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    try {
        const postData = {
            customId: formData.id,
            password: formData.password,
        };

        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        };

        const response = await axios.post('http://localhost:9292/auth/login', postData, config);        if (response.data.success) {
            const accessToken = response.data.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            alert("로그인 실패");
            window.location.href = '/';
        } else {
            alert(`로그인 실패: ${response.data.message}`);
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                alert("로그인 실패: 회원 인증이 되지 않았습니다.");
            } else {
                alert(`로그인 실패: ${error.response.data.message}`);
            }
        } else {
            alert('로그인 실패: 알 수 없는 오류가 발생했습니다.');
        }
        console.error('로그인 실패: ', error);
    }
};

    return (
        <div className="login-body">
            <div className="login-container">
            <h2>Clip story 로그인</h2>
            <form onSubmit = {handleSubmit}>
                <input 
                type="text" 
                name="id" 
                value = {formData.id} 
                onChange = {handleChange}
                placeholder="아이디" 
                required />
                
                <br />

                <input
                type="password" 
                name="password" 
                value = {formData.password}
                onChange = {handleChange}
                placeholder="비밀번호" 
                required />
                <br />

                <button type="button" onClick = {handleSubmit}>로그인</button>
            </form>
            <div className="signup-link">
                <p>아이디가 없으신가요?</p>
                <Link to="/signup">회원가입</Link>                
            </div>
        </div>
        </div>
        
    );
}

export default Login;
