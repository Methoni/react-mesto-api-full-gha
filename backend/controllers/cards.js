const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          `Карточка с указанным _id: ${req.params.cardId} не найдена`,
        );
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('У вас нет прав для удаления данной карточки');
      } else {
        Card.deleteOne(card)
          .then((deletedCard) => {
            res.status(200).send(deletedCard);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(
                new BadRequestError(
                  `Передан некорректный _id: ${req.params.cardId}`,
                ),
              );
            } else {
              next(err);
            }
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(`Передан некорректный _id: ${req.params.cardId}`),
        );
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(
          new NotFoundError(
            `Карточка с указанным _id: ${req.params.cardId} не найдена`,
          ),
        );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(`Передан некорректный _id: ${req.params.cardId}`),
        );
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(
          new NotFoundError(
            `Карточка с указанным _id: ${req.params.cardId} не найдена`,
          ),
        );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(`Передан некорректный _id: ${req.params.cardId}`),
        );
      } else {
        next(err);
      }
    });
};
