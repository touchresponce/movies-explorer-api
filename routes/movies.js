const router = require("express").Router();
const { postMovie, getMovies, deleteMovie } = require("../controllers/movies");
const {
  validationCreateMovie,
  validationMovieId,
} = require("../middlewares/validations");

router.get("/", getMovies); // возвращает все сохранённые текущим  пользователем фильмы
router.post("/", validationCreateMovie, postMovie); // создаёт фильм
router.delete("/:movieId", validationMovieId, deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
