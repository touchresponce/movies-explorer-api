const router = require("express").Router();

router.get("/"); // возвращает все сохранённые текущим  пользователем фильмы
router.post("/"); // создаёт фильм
router.delete("/_id"); // удаляет сохранённый фильм по id

module.exports = router;
