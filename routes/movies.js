const router = require("express").Router();
const { postMovie, getMovies, deleteMovie } = require("../controllers/movies");

router.get("/", getMovies); // возвращает все сохранённые текущим  пользователем фильмы
router.post("/", postMovie); // создаёт фильм
router.delete("/:movieId", deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
