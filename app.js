const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const handleError = require("./middlewares/handleError");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/bitfilmsdb");

app.use(require("./routes"));

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
