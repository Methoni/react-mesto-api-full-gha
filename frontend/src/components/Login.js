import React from 'react';
import AuthPage from './AuthPage.js';

function Login({ onSubmit }) {
  return (
    <AuthPage name="login" title="Вход" text="Войти" onSubmit={onSubmit} />
  );
}

export default Login;
