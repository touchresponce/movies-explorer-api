const Movie = require("../models/movie");

module.exports.getMovies = (req, res, next) => {}; // возвращает все сохранённые текущим  пользователем фильмы

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
module.exports.postMovie = (req, res, next) => {};

module.exports.deleteMovie = (req, res, next) => {}; // удаляет сохранённый фильм по id
