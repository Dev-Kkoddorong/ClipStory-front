import React, {useState} from 'react';
import { Link } from "react-router-dom";
import './Login.css';
import axios from "axios";


/*const instance = axios.create({
    baseURL: ''
});

instance.interceptors.request.use(
    (conifg) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            conifg.headers.Authorization = `Bearer ${accessToken}`;
        }
        return conifg;
    },
    (error) => {
        return Promise.reject(error);
    }
);*/




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
    try{
        const postData = {
            "customId" : formData.id,
            "password" : formData.password
        };

        const json = JSON.stringify(postData);
        const config = {
            headers: {
                "Content-Type": 'application/json'
              }
        }

        const response = await axios.post('http://localhost:9292/auth/login', json, config)
 
        const accessToken = response.data.data.accessToken;
        alert(accessToken);
        localStorage.setItem('accessToken', accessToken);
    
    
    } catch (error) {
        console.error('로그인 실패: ', error);
    } finally {
        alert("로그인 성공");
        window.location.href = '/';
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
