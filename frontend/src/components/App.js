import React from 'react';
import { api } from '../utils/api.js';
import { auth } from '../utils/auth.js';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getAllNeededData(localStorage.jwt)
        .then(([cardsData, userData]) => {
          setCards(cardsData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked, localStorage.jwt)
      .then((newCard) => {
        console.log('Меняем лайк');
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id, localStorage.jwt)
      .then(() => {
        // колбек обновляет существующую коллекцию из стейта (коллекция без удаляемой карточки)
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(userInfo) {
    api
      .editUserInfo(userInfo, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userInfo) {
    api
      .editAvatar(userInfo, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addNewCard(cardData, localStorage.jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Блок авторизации и регистрации

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setIsInfoPopupOpen(true);
        setIsSuccessful(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        setIsInfoPopupOpen(true);
        setIsSuccessful(false);
        console.log(err);
      });
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem('jwt', res.token);
        navigate('/');
      })
      .catch((err) => {
        setIsInfoPopupOpen(true);
        setIsSuccessful(false);
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setLoggedIn(false);
  }

  React.useEffect(() => {
    if (localStorage.jwt) {
      auth
        .checkToken(localStorage.jwt)
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    // «Внедряем» данные из currentUser с помощью провайдера контекста
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  userEmail={userEmail}
                  direction="/sign-in"
                  text="Выйти"
                  onSignOut={signOut}
                />
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header direction="/sign-in" text="Войти" />
                <Register onSubmit={handleRegister} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header direction="/sign-up" text="Регистрация" />
                <Login onSubmit={handleLogin} />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          text="Да"
        ></PopupWithForm>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          name="reg"
          isOpen={isInfoPopupOpen}
          isSuccessful={isSuccessful}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
