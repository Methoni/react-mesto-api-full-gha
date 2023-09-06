import React from 'react';
import AuthPage from './AuthPage.js';

function Register({ onSubmit }) {
  return (
    <AuthPage
      name="register"
      title="Регистрация"
      text="Зарегистрироваться"
      onSubmit={onSubmit}
    />
  );
}

export default Register;
