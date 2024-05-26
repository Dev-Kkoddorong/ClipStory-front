import React from 'react';
import { useHistory } from 'react-router-dom';

function LogoutButton() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  return (
    <button onClick={handleLogout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
