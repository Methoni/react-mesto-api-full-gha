import React from 'react';
import { Link } from 'react-router-dom';

function AuthPage({ name, title, text, onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(password, email);
  }

  return (
    <div className={`auth auth-${name}`}>
      <h2 className="popup__header auth__header">{title}</h2>
      <form
        name={`${name}-form`}
        className={`auth__form auth__form_${name}`}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`auth__input auth__input_${name}_email`}
          id="email-input"
          required
          minLength="4"
          maxLength="40"
          value={email}
          onChange={handleEmail}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className={`auth__input auth__input_${name}_password`}
          id="password-input"
          required
          minLength="4"
          maxLength="200"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit" className={`auth__button auth__button_${name}`}>
          {text}
        </button>
        {name === 'register' && (
          <p className="auth__caption">
            Уже зарегистрированы?{' '}
            <Link to={'/sign-in'} className="auth__caption_link">
              Войти
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default AuthPage;
