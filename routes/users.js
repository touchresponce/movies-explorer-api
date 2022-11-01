const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validationUpdateUser } = require("../middlewares/validations");

router.get("/me", getCurrentUser); // возвращает информацию о пользователе (email и имя)
router.patch("/me", validationUpdateUser, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = router;
