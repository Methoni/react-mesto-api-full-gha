const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regUrl = require('../utils/constants');

const {
  getUsers,
  getUserById,
  editUserData,
  editUserAvatar,
  getMyUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMyUser);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().required(),
    }),
  }),
  getUserById,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  editUserData,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(regUrl),
    }),
  }),
  editUserAvatar,
);

module.exports = router;
