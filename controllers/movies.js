const Movie = require("../models/movie");
const NotFound = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const BadRequest = require("../errors/BadRequest");

// возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

// создаёт фильм
module.exports.postMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });
    res.send(movie);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequest("Переданы некорректные данные при создании."));
    } else {
      next(err);
    }
  }
};

// удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound("Фильм с указанным _id не найден");
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError("Ошибка доступа"));
      }
      return movie.remove().then(() => {
        res.send({ message: "Фильм удален" });
      });
    })
    .catch(next);
};
