const router = require("express").Router();
const usersRouter = require("./users");
const moviesRouter = require("./movies");
const NotFound = require("../errors/NotFoundError");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);

router.use(auth);

router.use("/users", usersRouter);
router.use("/movies", moviesRouter);

router.use((req, res, next) => {
  next(new NotFound("Запрашиваемая страница не существует"));
});

module.exports = router;
