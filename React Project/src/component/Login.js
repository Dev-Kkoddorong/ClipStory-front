import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';


function Login() {
    return (
        <div className="login-container">
            <h2>Clip story 로그인</h2>
            <form action="/login" method="post">
                <input type="text" name="username" placeholder="아이디" required /><br />
                <input type="password" name="password" placeholder="비밀번호" required /><br />
                <input type="submit" value="로그인" />
            </form>
            <div className="signup-link">
                <p>아이디가 없으신가요?</p>
                <Link to="/signup">회원가입</Link>                
            </div>
        </div>
    );
}

export default Login;
