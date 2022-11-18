const { JWT_SECRET = "VERY_SECRET_JWT" } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const NotFound = require("../errors/NotFoundError");
const BadRequest = require("../errors/BadRequest");
const ConflictError = require("../errors/ConflictError");

// создать
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(201).send({
        name: user.name,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Пользователь с таким email уже существует"));
      } else if (err.name === "ValidationError") {
        next(new BadRequest("Переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};

// логин
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};

// возвращает информацию о пользователе (email и имя)
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound("Пользователь не найден");
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};

// обновляет информацию о пользователе (email и имя)
// module.exports.updateUser = (req, res, next) => {
//   const { email, name } = req.body;

//   return User.findOne({ email })
//     .then((user) => {
//       if (user) {
//         throw new ConflictError('Пользователь с данным email уже существует');
//       } else {
//         return User.findByIdAndUpdate(
//           req.user._id,
//           { email, name },
//           { new: true, runValidators: true },
//         )
//           .then((x) => res.send(x));
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError' || err.name === 'CastError') {
//         next(new BadRequest('Переданы некорректные данные'));
//       } else {
//         next(err);
//       }
//     });
// };

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  )
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequest("Переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};
